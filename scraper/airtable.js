// Airtable integration — pushes new listings to the review queue
// Skips listings that already exist (by Listing ID) to avoid duplicates

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "apptPRioSztwR26gK";
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || "tblpuiT5DyQmBYDpq";
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

function headers() {
  return {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
  };
}

/**
 * Fetch all existing Listing IDs from Airtable to avoid duplicate inserts.
 */
export async function fetchExistingIds() {
  const ids = new Set();
  let offset = null;

  do {
    const url = new URL(API_URL);
    url.searchParams.set("fields[]", "Listing ID");
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), { headers: headers() });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Airtable fetchExistingIds failed: ${res.status} ${text}`);
    }

    const json = await res.json();
    for (const record of json.records || []) {
      const id = record.fields?.["Listing ID"];
      if (id) ids.add(String(id));
    }
    offset = json.offset || null;
  } while (offset);

  return ids;
}

/**
 * Build the Airtable fields object for a listing.
 * Photos are passed as Airtable Attachment objects (requires "Photos" Attachments field).
 */
function buildFields(l) {
  const fields = {
    "Listing ID": l.listingId,
    "Title": l.title,
    "Region": l.region,
    "Address": l.address,
    "Property Type": l.propertyType,
    "Price (만원)": l.priceManwon,
    "Price (KRW)": l.priceKrw,
    "Price (USD ~)": l.priceUsd,
    "Price Raw": l.priceRaw,
    "Floor Info": l.floorInfo,
    "Area (m²)": l.areaM2,
    "Direction": l.direction,
    "Description": l.description,
    "Agent Name": l.agentName,
    "Latitude": l.latitude,
    "Longitude": l.longitude,
    "Naver URL": l.naverUrl,
    "Status": "New",
    "Scraped At": l.scrapedAt,
  };

  // Attach photos if the listing has any.
  // Requires an "Attachments" type field named "Photos" in Airtable.
  if (l.photos && l.photos.length > 0) {
    fields["Photos"] = l.photos.map((url) => ({ url }));
  }

  return fields;
}

/**
 * Push a batch of listings to Airtable (max 10 per request per API limit).
 * Returns number of records created.
 */
export async function pushListings(listings) {
  if (!AIRTABLE_TOKEN) throw new Error("AIRTABLE_TOKEN env var is not set");
  if (listings.length === 0) return 0;

  let created = 0;
  const BATCH_SIZE = 10;

  for (let i = 0; i < listings.length; i += BATCH_SIZE) {
    const batch = listings.slice(i, i + BATCH_SIZE);

    const records = batch.map((l) => ({ fields: buildFields(l) }));

    const res = await fetch(API_URL, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ records }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[airtable] Batch ${Math.floor(i / BATCH_SIZE) + 1} failed: ${res.status} ${text}`);
    } else {
      const json = await res.json();
      created += json.records?.length || 0;
      console.log(`[airtable] Batch ${Math.floor(i / BATCH_SIZE) + 1}: created ${json.records?.length} records`);
    }

    // Airtable rate limit: 5 requests/sec
    if (i + BATCH_SIZE < listings.length) {
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  return created;
}
