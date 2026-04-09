/**
 * KoreaRoots — Naver Land Daily Scraper
 *
 * Scrapes rural property listings under ₩150M across 8 Korean regions
 * and pushes new listings to the Airtable review queue region-by-region.
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
    try {
      existingIds = await fetchExistingIds();
      console.log(`[main] Found ${existingIds.size} existing listings in Airtable\n`);
    } catch (err) {
      console.error("[main] Failed to fetch existing IDs:", err.message);
      console.error("[main] Aborting to avoid duplicates. Check AIRTABLE_TOKEN env var.");
      process.exit(1);
    }
  }

  // Step 2: Scrape each region and push to Airtable immediately after each one
  let totalCreated = 0;

  for (const region of REGIONS) {
    try {
      const listings = await scrapeRegion(region);
      console.log(`[main] ${region.name}: scraped ${listings.length} listings under ₩150M`);

      if (!DRY_RUN && listings.length > 0) {
        const newListings = listings.filter((l) => !existingIds.has(l.listingId));
        console.log(`[main] ${region.name}: ${newListings.length} new (${listings.length - newListings.length} already in Airtable)`);

        if (newListings.length > 0) {
          const created = await pushListings(newListings);
          totalCreated += created;
          // Add newly pushed IDs so later regions don't duplicate
          newListings.forEach((l) => existingIds.add(l.listingId));
          console.log(`[main] ${region.name}: pushed ${created} records to Airtable`);
        }
      } else if (DRY_RUN && listings.length > 0) {
        console.log(`[dry-run] Sample from ${region.name}:`);
        listings.slice(0, 2).forEach((l, i) => {
          console.log(`  ${i + 1}. ${l.title} — ₩${l.priceManwon.toLocaleString()}만원`);
          console.log(`     ${l.naverUrl}`);
        });
      }

      console.log("");
    } catch (err) {
      console.error(`[main] Error on ${region.name}:`, err.message);
    }

    // Polite delay between regions
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000));
  }

  console.log("========================================");
  if (!DRY_RUN) {
    console.log(`Total new records created in Airtable: ${totalCreated}`);
  }
  console.log(`Finished: ${new Date().toISOString()}`);
  console.log("========================================");
}

main().catch((err) => {
  console.error("[main] Unhandled error:", err);
  process.exit(1);
});
