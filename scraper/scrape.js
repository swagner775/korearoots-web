import fetch from "node-fetch";
import { MAX_PRICE_MANWON } from "./regions.js";

const HEADERS_COMMON = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─────────────────────────────────────────────
// CARROT (당근마켓 / daangn.com)
// ─────────────────────────────────────────────

const CARROT_REGION_CODES = {
  Gangwon:  "gangwon",
  Gyeongbuk: "gyeongsangbuk_do",
  Gyeongnam: "gyeongsangnam_do",
  Jeonbuk:  "jeollabuk_do",
  Jeonnam:  "jeollanam_do",
  Chungbuk: "chungcheongbuk_do",
  Chungnam: "chungcheongnam_do",
  Jeju:     "jeju",
};

async function scrapeCarrotRegion(region) {
  const regionCode = CARROT_REGION_CODES[region.name];
  if (!regionCode) return [];

  // Carrot web API for real estate listings
  const url = `https://www.daangn.com/api/v1/realty/articles?region=${regionCode}&trade_type=sale&page=1&per=20`;

  try {
    const res = await fetch(url, {
      headers: {
        ...HEADERS_COMMON,
        "Referer": "https://www.daangn.com/",
      },
      timeout: 15000,
    });

    if (!res.ok) {
      // Fallback: try the search API
      return await scrapeCarrotSearch(region);
    }

    const json = await res.json();
    const articles = json.data?.articles || json.articles || json.realty_articles || [];

    return articles
      .map((a) => normalizeCarrot(a, region))
      .filter(Boolean)
      .filter((l) => l.priceManwon <= MAX_PRICE_MANWON);
  } catch (err) {
    console.warn(`[carrot] Error for ${region.name}:`, err.message);
    return await scrapeCarrotSearch(region);
  }
}

async function scrapeCarrotSearch(region) {
  // Fallback: use Carrot's search endpoint
  const query = encodeURIComponent(`${region.nameKo} 빈집 매매`);
  const url = `https://www.daangn.com/api/v1/search/articles?query=${query}&category=realty&page=1&per=20`;

  try {
    const res = await fetch(url, {
      headers: { ...HEADERS_COMMON, "Referer": "https://www.daangn.com/" },
      timeout: 15000,
    });

    if (!res.ok) {
      console.warn(`[carrot] Search also failed for ${region.name}: ${res.status}`);
      return [];
    }

    const json = await res.json();
    const articles = json.data?.articles || json.articles || [];

    return articles
      .map((a) => normalizeCarrot(a, region))
      .filter(Boolean)
      .filter((l) => l.priceManwon <= MAX_PRICE_MANWON);
  } catch (err) {
    console.warn(`[carrot] Search error for ${region.name}:`, err.message);
    return [];
  }
}

function normalizeCarrot(article, region) {
  try {
    const priceRaw = article.price || article.sale_price || article.trading_price || "";
    const priceManwon = parsePriceManwon(priceRaw);
    if (!priceManwon || priceManwon > MAX_PRICE_MANWON) return null;

    const id = String(article.id || article.article_id || "");
    if (!id) return null;

    const thumb =
      article.thumbnail_image?.url ||
      article.first_image?.url ||
      article.images?.[0]?.url ||
      article.thumbnail ||
      null;

    return {
      listingId: `carrot-${id}`,
      title: article.title || article.name || "",
      region: region.name,
      address: article.region_name || article.address || region.nameKo,
      propertyType: article.realty_type || article.category || "단독주택",
      priceManwon,
      priceKrw: priceManwon * 10000,
      priceUsd: Math.round((priceManwon * 10000) / 1380),
      priceRaw: String(priceRaw),
      floorInfo: "",
      areaM2: parseFloat(article.area || "0") || 0,
      direction: "",
      description: article.body || article.content || article.description || "",
      agentName: article.user?.nickname || article.writer?.nickname || "",
      latitude: parseFloat(article.location?.lat || "0") || 0,
      longitude: parseFloat(article.location?.lng || "0") || 0,
      naverUrl: `https://www.daangn.com/articles/${id}`,
      photos: thumb ? [thumb] : [],
      scrapedAt: new Date().toISOString(),
      source: "Carrot (당근마켓)",
    };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// PETER PAN (피터팬 / peterpanz.com)
// ─────────────────────────────────────────────

const PETERPAN_REGION_CODES = {
  Gangwon:   "42",
  Gyeongbuk: "47",
  Gyeongnam: "48",
  Jeonbuk:   "45",
  Jeonnam:   "46",
  Chungbuk:  "43",
  Chungnam:  "44",
  Jeju:      "50",
};

async function scrapePeterPanRegion(region) {
  const regionCode = PETERPAN_REGION_CODES[region.name];
  if (!regionCode) return [];

  const url = `https://peterpanz.com/api/houses?filter_type=sale&location_code=${regionCode}&price_max=${MAX_PRICE_MANWON}&page=1&limit=20`;

  try {
    const res = await fetch(url, {
      headers: {
        ...HEADERS_COMMON,
        "Referer": "https://peterpanz.com/",
      },
      timeout: 15000,
    });

    if (!res.ok) {
      console.warn(`[peterpan] HTTP ${res.status} for ${region.name}`);
      return [];
    }

    const json = await res.json();
    const items = json.data?.houses || json.houses || json.items || json.result || [];

    return items
      .map((h) => normalizePeterPan(h, region))
      .filter(Boolean)
      .filter((l) => l.priceManwon <= MAX_PRICE_MANWON);
  } catch (err) {
    console.warn(`[peterpan] Error for ${region.name}:`, err.message);
    return [];
  }
}

function normalizePeterPan(house, region) {
  try {
    const priceRaw = house.price || house.sale_price || house.deposit || "";
    const priceManwon = parsePriceManwon(priceRaw);
    if (!priceManwon || priceManwon > MAX_PRICE_MANWON) return null;

    const id = String(house.id || house.house_id || "");
    if (!id) return null;

    const thumb =
      house.thumbnail ||
      house.images?.[0] ||
      house.photo_url ||
      null;

    return {
      listingId: `peterpan-${id}`,
      title: house.title || house.name || house.building_name || "",
      region: region.name,
      address: house.address || house.road_address || house.location || region.nameKo,
      propertyType: house.house_type || house.building_type || "단독주택",
      priceManwon,
      priceKrw: priceManwon * 10000,
      priceUsd: Math.round((priceManwon * 10000) / 1380),
      priceRaw: String(priceRaw),
      floorInfo: house.floor ? `${house.floor}층` : "",
      areaM2: parseFloat(house.exclusive_area || house.area || "0") || 0,
      direction: house.direction || "",
      description: house.description || house.content || "",
      agentName: house.agent_name || "",
      latitude: parseFloat(house.lat || house.latitude || "0") || 0,
      longitude: parseFloat(house.lng || house.longitude || "0") || 0,
      naverUrl: `https://peterpanz.com/houses/${id}`,
      photos: thumb ? [thumb] : [],
      scrapedAt: new Date().toISOString(),
      source: "Peter Pan (피터팬)",
    };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export async function scrapeRegion(region) {
  console.log(`[scrape] ${region.name} — trying Carrot...`);
  const carrotListings = await scrapeCarrotRegion(region);
  console.log(`[scrape] ${region.name} — Carrot: ${carrotListings.length} listings`);

  await sleep(1500);

  console.log(`[scrape] ${region.name} — trying Peter Pan...`);
  const peterpanListings = await scrapePeterPanRegion(region);
  console.log(`[scrape] ${region.name} — Peter Pan: ${peterpanListings.length} listings`);

  await sleep(1000);

  return [...carrotListings, ...peterpanListings];
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function parsePriceManwon(raw) {
  if (!raw) return null;
  const str = String(raw).replace(/,/g, "").trim();

  const num = Number(str);
  if (!isNaN(num) && num > 0) {
    if (num >= 1000000) return Math.round(num / 10000); // KRW → 만원
    return num;
  }

  const eokMatch = str.match(/^(\d+)억(\d+)?$/);
  if (eokMatch) {
    const eok = parseInt(eokMatch[1], 10) * 10000;
    const man = parseInt(eokMatch[2] || "0", 10);
    return eok + man;
  }

  return null;
}
