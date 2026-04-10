import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_CONSULTATIONS_BASE_ID ?? process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_CONSULTATIONS_TABLE_ID;

  if (!token || !baseId || !tableId) {
    return NextResponse.json({ error: "Airtable not configured" }, { status: 500 });
  }

  const fields: Record<string, string> = {
    "First Name": body.firstName ?? "",
    "Last Name": body.lastName ?? "",
    "Email": body.email ?? "",
    "Country": body.country ?? "",
    "Heard From": body.heardFrom ?? "",
    "Budget": body.budget ?? "",
    "Timeline": body.timeline ?? "",
    "Prior Real Estate": body.priorRealEstate ?? "",
    "Lived Abroad": body.livedAbroad ?? "",
    "Regions": (body.regions ?? []).join(", "),
    "Property Use": (body.propertyUse ?? []).join(", "),
    "Property Size": body.propertySize ?? "",
    "Visa Goals": (body.visaGoals ?? []).join(", "),
    "Prior Visa Issues": body.priorVisaIssues ?? "",
    "Has Korean Advisor": body.hasKoreanAdvisor ?? "",
    "Biggest Concerns": (body.biggestConcerns ?? []).join(", "),
    "Call Notes": body.callNotes ?? "",
    "Timezone": body.timezone ?? "",
    "Submitted At": new Date().toISOString(),
  };

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable error:", res.status, err);
    return NextResponse.json({ error: "Failed to save to Airtable", detail: err, status: res.status }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
