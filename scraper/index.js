/**
 * KoreaRoots — Naver Land Daily Scraper
 *
 * Scrapes rural property listings under ₩150M across 8 Korean regions
 * and pushes new listings to the Airtable review queue.
 *
 * Usage:
 *   node index.js           — full run
 *   node index.js --dry-run — scrape only, no Airtable writes
 */

import { REGIONS } from "./regions.js";
import { scrapeRegion } from "./scrape.js";
import { fetchExistingIds, pushListings } from "./airtable.js";

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  console.log("========================================");
  console.log("KoreaRoots Naver Land Scraper");
  console.log(`Started: ${new Date().toISOString()}`);
  console.log(`Mode: ${DRY_RUN ? "DRY RUN (no Airtable writes)" : "LIVE"}`);
  console.log("========================================\n");

  // Step 1: Fetch existing Airtable IDs to skip duplicates
  let existingIds = new Set();
  if (!DRY_RUN) {
    console.log("[main] Fetching existing Airtable listing IDs...");
  console.log(`[debug] AIRTABLE_TOKEN starts with: ${process.env.AIRTABLE_TOKEN?.slice(0, 8) ?? "UNDEFINED"}`);
    try {
      existingIds = await fetchExistingIds();
      console.log(`[main] Found ${existingIds.size} existing listings in Airtable\n`);
    } catch (err) {
      console.error("[main] Failed to fetch existing IDs:", err.message);
      console.error("[main] Aborting to avoid duplicates. Check AIRTABLE_TOKEN env var.");
      process.exit(1);
    }
  }

  // Step 2: Scrape each region
  const allListings = [];

  for (const region of REGIONS) {
    try {
      const listings = await scrapeRegion(region);
      console.log(`[main] ${region.name}: scraped ${listings.length} listings under ₩150M\n`);
      allListings.push(...listings);
    } catch (err) {
      console.error(`[main] Error scraping ${region.name}:`, err.message);
    }

    // Polite delay between regions
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000));
  }

  console.log(`[main] Total scraped: ${allListings.length} listings across all regions`);

  // Step 3: Filter out duplicates
  const newListings = allListings.filter((l) => !existingIds.has(l.listingId));
  console.log(`[main] New listings (not yet in Airtable): ${newListings.length}`);

  if (newListings.length === 0) {
    console.log("[main] Nothing new to push. Done.");
    return;
  }

  if (DRY_RUN) {
    console.log("\n[dry-run] Sample listings (first 3):");
    newListings.slice(0, 3).forEach((l, i) => {
      console.log(`  ${i + 1}. [${l.region}] ${l.title} — ₩${l.priceManwon.toLocaleString()}만원`);
      console.log(`     ${l.address}`);
      console.log(`     ${l.naverUrl}`);
    });
    console.log("\n[dry-run] No records written to Airtable.");
    return;
  }

  // Step 4: Push new listings to Airtable
  console.log(`\n[main] Pushing ${newListings.length} new listings to Airtable...`);
  try {
    const created = await pushListings(newListings);
    console.log(`\n[main] Done. Created ${created} new records in Airtable.`);
  } catch (err) {
    console.error("[main] Failed to push to Airtable:", err.message);
    process.exit(1);
  }

  console.log("\n========================================");
  console.log(`Finished: ${new Date().toISOString()}`);
  console.log("========================================");
}

main().catch((err) => {
  console.error("[main] Unhandled error:", err);
  process.exit(1);
});
