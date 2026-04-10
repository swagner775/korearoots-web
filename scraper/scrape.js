import fetch from "node-fetch";
import { MAX_PRICE_MANWON } from "./regions.js";

// Naver Land requires a logged-in session cookie.
// Set NAVER_COOKIE in your environment:
//   export NAVER_COOKIE="NID_AUT=xxxx; NID_SES=xxxx"
// Get these from your browser's DevTools → Application → Cookies on new.land.naver.com
const NAVER_COOKIE = process.env.NAVER_COOKIE || "";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
  "Referer": "https://new.land.naver.com/",
  ...(NAVER_COOKIE ? { Cookie: NAVER_COOKIE } : {}),
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Fetch one page of Naver Land listings for a region.
 * tradeType A1 = 매매 (sale)
 */
async function fetchPage(cortarNo, pageNo) {
  const params = new URLSearchParams({
    cortarNo,
    tradeType: "A1",
    priceMin: "0",
    priceMax: String(MAX_PRICE_MANWON),
    pageNo: String(pageNo),
    rowNum: "20",
    type: "list",
  });

  const url = `https://new.land.naver.com/api/articles?${params}`;

  const res = await fetch(url, { headers: HEADERS, timeout: 15000 });

  if (res.status === 401 || res.status === 403) {
    throw new Error(
      `Naver Land auth required (${res.status}). Set NAVER_COOKIE env var.\n` +
      "  Get cookies from: DevTools → Application → Cookies on new.land.naver.com\n" +
      "  export NAVER_COOKIE=\"NID_AUT=xxxx; NID_SES=xxxx\""
    );
  }

  if (res.status === 429) {
    console.warn(`[naver] Rate limited on page ${pageNo} for ${cortarNo} — waiting 5s...`);
    await sleep(5000);
    return fetchPage(cortarNo, pageNo); // retry once
  }

  if (!res.ok) {
    throw new Error(`Naver Land HTTP ${res.status} for cortarNo=${cortarNo}`);
  }

  return res.json();
}

function normalizeListing(article, region) {
  try {
    const priceRaw = article.dealOrWarrantPrc || "";
    const priceManwon = parsePriceManwon(priceRaw);
    if (!priceManwon || priceManwon > MAX_PRICE_MANWON) return null;

    const id = String(article.articleNo || "");
    if (!id) return null;

    const photos = [];
    if (article.representativeImgUrl) photos.push(article.representativeImgUrl);
    if (article.representativeImgThumb) photos.push(article.representativeImgThumb);

    return {
      listingId: `naver-${id}`,
      title: article.articleName || article.aptName || "",
      region: region.name,
      address: article.cortarAddress || article.buildingName || region.nameKo,
      propertyType: article.realEstateTypeName || article.landCategoryCodeName || "단독주택",
      priceManwon,
      priceKrw: priceManwon * 10000,
      priceUsd: Math.round((priceManwon * 10000) / 1380),
      priceRaw: String(priceRaw),
      floorInfo: article.floorInfo || "",
      areaM2: parseFloat(article.area1 || article.area2 || "0") || 0,
      direction: article.direction || "",
      description: article.articleFeatureDesc || article.tagList?.join(", ") || "",
      agentName: article.realtorName || "",
      latitude: parseFloat(article.latitude || "0") || 0,
      longitude: parseFloat(article.longitude || "0") || 0,
      naverUrl: `https://new.land.naver.com/articles/${id}`,
      photos,
      scrapedAt: new Date().toISOString(),
      source: "Naver Land (네이버 부동산)",
    };
  } catch {
    return null;
  }
}

export async function scrapeRegion(region) {
  const listings = [];
  let pageNo = 1;
  let isMoreData = true;

  while (isMoreData) {
    try {
      const json = await fetchPage(region.cortarNo, pageNo);
      const articles = json.articleList || [];

      for (const article of articles) {
        const listing = normalizeListing(article, region);
        if (listing) listings.push(listing);
      }

      isMoreData = json.isMoreData === true && articles.length > 0;
      pageNo++;

      if (isMoreData) await sleep(1000 + Math.random() * 500);
    } catch (err) {
      // Auth errors should bubble up and stop the whole run
      if (err.message.includes("NAVER_COOKIE")) throw err;
      console.warn(`[naver] Error on page ${pageNo} for ${region.name}:`, err.message);
      break;
    }
  }

  return listings;
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function parsePriceManwon(raw) {
  if (!raw) return null;
  // Naver returns prices like "1억2,000", "8,500", "15,000"
  const str = String(raw).replace(/,/g, "").trim();

  // "1억2000" or "1억"
  const eokMatch = str.match(/^(\d+)억(\d+)?$/);
  if (eokMatch) {
    const eok = parseInt(eokMatch[1], 10) * 10000;
    const man = parseInt(eokMatch[2] || "0", 10);
    return eok + man;
  }

  const num = Number(str);
  if (!isNaN(num) && num > 0) {
    if (num >= 1000000) return Math.round(num / 10000); // raw KRW → 만원
    return num; // already in 만원
  }

  return null;
}
