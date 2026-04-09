import fetch from "node-fetch";
import { MAX_PRICE_MANWON } from "./regions.js";

// Naver Land (NaverPay Real Estate) APIs
const ARTICLE_LIST_API = "https://new.land.naver.com/api/articles";
const ARTICLE_DETAIL_API = "https://new.land.naver.com/api/articles"; // /{articleNo}

// Thumbnail CDN pattern used by Naver Land
const THUMB_CDN = "https://landthumb-phinf.pstatic.net";

// Headers to mimic a real browser session
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
  "Referer": "https://new.land.naver.com/",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Fetch one page of listings for a region with retry on rate limit.
 */
async function fetchPage(cortarNo, page, retries = 3) {
  const params = new URLSearchParams({
    cortarNo,
    realEstateType: "SG:SMS:ABYG:JGC",
    tradeType: "A1",
    priceMin: "0",
    priceMax: String(MAX_PRICE_MANWON),
    page: String(page),
    pageSize: "20",
  });

  const url = `${ARTICLE_LIST_API}?${params}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS, timeout: 20000 });

      if (res.status === 429) {
        const wait = attempt * 8000;
        console.warn(`[scrape] Rate limited (cortarNo ${cortarNo} page ${page}), waiting ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }

      if (!res.ok) {
        console.warn(`[scrape] HTTP ${res.status} for cortarNo ${cortarNo} page ${page}`);
        return null;
      }

      return await res.json();
    } catch (err) {
      if (attempt < retries) {
        console.warn(`[scrape] Attempt ${attempt} failed:`, err.message);
        await sleep(3000 * attempt);
      } else {
        console.warn(`[scrape] All ${retries} attempts failed for cortarNo ${cortarNo}:`, err.message);
        return null;
      }
    }
  }
  return null;
}

/**
 * Fetch article detail to get all photo URLs.
 * Returns array of photo URL strings.
 */
async function fetchArticlePhotos(articleNo) {
  const url = `${ARTICLE_DETAIL_API}/${articleNo}`;
  try {
    const res = await fetch(url, { headers: HEADERS, timeout: 15000 });
    if (!res.ok) return [];
    const json = await res.json();

    // Photos can be in several places depending on the API response
    const body = json.body || json.articleDetail || json;

    // Try to extract photo URLs from known fields
    const photoUrls = [];

    // articlePhotoList is the most common field
    const photoList =
      body.articlePhotoList ||
      body.photoList ||
      body.images ||
      body.photos ||
      [];

    for (const photo of photoList) {
      const url =
        photo.photoUrl ||
        photo.url ||
        photo.imageUrl ||
        photo.src ||
        (typeof photo === "string" ? photo : null);
      if (url && url.startsWith("http")) photoUrls.push(url);
    }

    // Fallback: check for representativePhotoUrl
    const repPhoto =
      body.representativePhotoUrl ||
      body.thumbnailUrl ||
      body.representativeImgUrl;
    if (repPhoto && repPhoto.startsWith("http") && !photoUrls.includes(repPhoto)) {
      photoUrls.unshift(repPhoto);
    }

    return photoUrls.slice(0, 10); // cap at 10 photos per listing
  } catch (err) {
    console.warn(`[scrape] fetchArticlePhotos failed for ${articleNo}:`, err.message);
    return [];
  }
}

/**
 * Extract thumbnail URL from the article list item.
 */
function extractThumbnail(article) {
  const raw =
    article.representativePh ||
    article.articlePhotoCount > 0 && null ||  // will use detail fetch instead
    article.thumbnailUrl ||
    article.representativeImgUrl ||
    article.articleImageUrl ||
    article.photoUrl ||
    article.imgUrl ||
    article.thumbnail ||
    null;

  if (!raw) return null;
  if (raw.startsWith("http")) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return `${THUMB_CDN}${raw}`;
  return null;
}

/**
 * Scrape all pages for a region and fetch photos for each listing.
 * Returns array of normalized listing objects.
 */
export async function scrapeRegion(region) {
  const listings = [];
  let page = 1;
  let totalPages = 1;

  console.log(`[scrape] Starting region: ${region.name} (${region.cortarNo})`);

  while (page <= totalPages) {
    const data = await fetchPage(region.cortarNo, page);

    if (!data) {
      console.warn(`[scrape] No data for ${region.name} page ${page}`);
      break;
    }

    const body = data.body || data;
    const articles = body.articleList || body.list || body.articles || [];
    const pageInfo = body.pageInfo || {};

    if (page === 1) {
      const total = pageInfo.totalCount || body.totalCount || 0;
      totalPages = pageInfo.totalPageCount || body.totalPages || Math.ceil(total / 20) || 1;
      console.log(`[scrape] ${region.name}: ~${total} total, ${totalPages} pages`);
    }

    if (articles.length === 0) break;

    for (const article of articles) {
      const normalized = await normalizeArticle(article, region);
      if (normalized) listings.push(normalized);
      // Small delay per article to avoid hammering photo endpoint
      await sleep(300 + Math.random() * 200);
    }

    console.log(`[scrape] ${region.name} page ${page}/${totalPages} — ${articles.length} items, ${listings.length} kept`);
    page++;

    if (page <= totalPages) await sleep(2000 + Math.random() * 1000);
  }

  return listings;
}

/**
 * Map a raw Naver Land article to our clean schema.
 * Fetches photos from the detail endpoint.
 */
async function normalizeArticle(article, region) {
  try {
    const priceRaw =
      article.dealOrWarrantPrc ||
      article.prc ||
      article.price ||
      article.dealPrice ||
      "";

    const priceManwon = parsePriceManwon(priceRaw);
    if (priceManwon === null || priceManwon > MAX_PRICE_MANWON) return null;

    const articleNo = String(
      article.articleNo ||
      article.atclNo ||
      article.articleId ||
      article.id ||
      ""
    );
    if (!articleNo) return null;

    // Try to get a thumbnail from the list response first (fast)
    let photos = [];
    const thumb = extractThumbnail(article);
    if (thumb) photos = [thumb];

    // If the listing has photos, fetch the full list from the detail endpoint
    const photoCount = parseInt(article.articlePhotoCount || article.photoCount || "0", 10);
    if (photoCount > 0 || !thumb) {
      const detailPhotos = await fetchArticlePhotos(articleNo);
      if (detailPhotos.length > 0) photos = detailPhotos;
    }

    return {
      listingId: articleNo,
      title: article.articleName || article.atclNm || article.name || article.title || "",
      region: region.name,
      address: buildAddress(article),
      propertyType:
        article.realEstateTypeName ||
        article.rletTpNm ||
        article.propertyType ||
        "",
      priceManwon,
      priceKrw: priceManwon * 10000,
      priceUsd: Math.round((priceManwon * 10000) / 1380),
      priceRaw: String(priceRaw),
      floorInfo: article.floorInfo || article.flrInfo || "",
      areaM2: parseFloat(article.area1 || article.spc1 || "0") || 0,
      direction: article.direction || "",
      description:
        article.articleFeatureDesc ||
        article.atclFetrDesc ||
        article.description ||
        "",
      agentName: article.realtorName || article.rltrNm || "",
      latitude: parseFloat(article.latitude || article.lat || article.mapY || "0") || 0,
      longitude: parseFloat(article.longitude || article.lon || article.mapX || "0") || 0,
      naverUrl: `https://new.land.naver.com/article/${articleNo}`,
      photos,         // array of photo URLs (up to 10)
      scrapedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("[scrape] normalizeArticle error:", err.message);
    return null;
  }
}

function buildAddress(article) {
  const parts = [
    article.cortarAddress || article.address || article.jibunAddress || "",
    article.buildingName || article.bldNm || "",
  ].filter(Boolean);
  return parts.join(" ").trim();
}

function parsePriceManwon(raw) {
  if (!raw) return null;
  const str = String(raw).replace(/,/g, "").trim();

  const num = Number(str);
  if (!isNaN(num) && num > 0) {
    if (num >= 1000000) return Math.round(num / 10000); // KRW → 만원
    return num; // already 만원
  }

  const eokMatch = str.match(/^(\d+)억(\d+)?$/);
  if (eokMatch) {
    const eok = parseInt(eokMatch[1], 10) * 10000;
    const man = parseInt(eokMatch[2] || "0", 10);
    return eok + man;
  }

  return null;
}
