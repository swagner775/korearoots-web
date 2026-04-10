# KoreaRoots — Grant Application Reference Document
> Full reference for the KoreaRoots platform — business model, website, tech stack, and content.
> Upload this file + your Gamma PDF + the grant questions into Claude to generate answers.
> Items marked **[DECIDE]** need a final number before submission.

---

## Company Overview

**Company name:** KoreaRoots  
**Website:** korearoots.com (deploying via Vercel)  
**Stage:** Pre-revenue, MVP live  
**Founded:** 2026  
**Founder:** Steve Wagner (bswagner90@gmail.com)

**Tagline:** Own a piece of rural Korea. Build your future here.

**One-liner:** KoreaRoots is an FDI advisory platform that connects Western investors with Korea's abandoned rural properties (빈집), turning forgotten homes into thriving short-term rental businesses and a pathway to Korean residency via the D-8 business investment visa.

**Target audience:** Western foreigners (primarily US, UK, Canada, Australia) with $75,000–$150,000 to invest who want to own property in Korea, generate passive income, and obtain legal long-term Korean residency.

---

## The Problem

- South Korea has **1.5 million+ abandoned rural properties** (빈집 / bin-jip)
- The Korean government actively wants them redeveloped — regional grants and subsidies exist
- Foreign buyers face insurmountable barriers: language, legal complexity, bureaucracy, and no trusted advisor
- The **D-8 business investment visa** is the clearest path to Korean residency for investors, but the process is opaque and underutilised
- No English-language platform exists to guide foreigners through this process end-to-end

---

## The Solution — What KoreaRoots Does

Three core pillars:

1. **Find the right property** — Curated 빈집 listings, title-verified, assessed for STR conversion potential
2. **Handle all the legal work** — FDI structuring, Korean business entity (법인) setup, investment registration via partner law firms, MOLIT filings
3. **Get you to your visa** — D-8 business investment visa application, renewal, and F-2 long-term residency pathway

KoreaRoots handles the entire process remotely. Clients can complete 90% of the process from their home country.

---

## The 6-Step Client Process

| Step | Title | Description | Who |
|------|-------|-------------|-----|
| 01 | Browse & Select | Client browses curated listings on the website, books a free consultation | Client + KoreaRoots |
| 02 | FDI Structuring | Investment structured to meet D-8 requirements; investment registration coordinated through partner law firms | KoreaRoots |
| 03 | Purchase & Entity Setup | Property purchase, Korean 법인 (business entity) established, MOLIT filings | KoreaRoots |
| 04 | D-8 Visa Application | Full D-8 application prepared and submitted | KoreaRoots |
| 05 | Renovation & Launch | Property renovated, STR permits filed, Airbnb/Wehome listings live | KoreaRoots manages |
| 06 | Ongoing Support | STR managed remotely, monthly income reports, visa renewal at 2 years | KoreaRoots |

---

## The STR Business Model

**How it works:**
Once renovated and live, KoreaRoots manages the property as a short-term rental on the client's behalf. The client stays in their home country and receives monthly income reports and revenue deposits.

**Why STR (not long-term rental):**
- Higher nightly returns vs. long-term lease yields
- Creates verifiable revenue records required for D-8 visa renewal within 2 years
- Flexibility for the owner to use the property personally

**Platforms:** Airbnb, Booking.com, Wehome (Korean government-certified STR platform)

**STR Roadmap Timeline:**

| Phase | Timeline | Lead |
|-------|----------|------|
| Purchase Complete | Month 1–3 | KoreaRoots + Client |
| Renovation | Month 3–6 | KoreaRoots |
| STR Setup & Photography | Month 6–7 | KoreaRoots |
| Live & Earning | Month 7+ | KoreaRoots |
| Visa Renewal | Month 24–30 | KoreaRoots + Client |

**Who does what:**

| Client | KoreaRoots |
|--------|------------|
| Owns the property & Korean 법인 | Manages all STR listings & bookings |
| Receives monthly rental income | Coordinates guests, check-in & cleaning |
| Approves major renovation decisions | Handles maintenance & contractors |
| Holds D-8 visa, lives abroad | Files taxes, renews visa, maintains records |

---

## Services & Pricing

> **[DECIDE]** Confirm final prices before grant submission.

### Packages

| Package | Price | Best For |
|---------|-------|----------|
| **Essentials** | $4,900 one-time | DIY investors who want legal/visa help only |
| **Full Service** | $7,900 + 12% of renovation cost | Hands-off investors wanting full setup |
| **Founding Member** | $7,900 + $299/month | Long-term investors wanting ongoing management |

**Essentials includes:**
- Property search & shortlist (up to 5 properties)
- Title & due diligence report
- FDI structuring & investment registration
- Korean 법인 entity setup
- D-8 visa application

**Full Service includes everything in Essentials, plus:**
- Renovation management
- Permit filing & grant application assistance
- STR setup — photography, listings & pricing strategy
- First 3 months STR management free

**Founding Member includes everything in Full Service, plus:**
- Ongoing STR management at 12% (vs. 18% standard)
- Annual tax filing included
- D-8 renewal included every 2 years
- Priority access to new listings
- Direct advisory team access

### Individual Services (à la carte)

| Service | Price |
|---------|-------|
| Property Search & Shortlist | $1,200 one-time |
| FDI Structuring & Entity Setup | $2,400 one-time |
| D-8 Visa Application | $1,800 one-time |
| Renovation Management | 12% of renovation cost |
| STR Property Management | 18% of rental revenue (12% for Founding Members) |
| Visa Renewal & Ongoing Advisory | $900/year |

---

## Investment Requirements

- **Minimum FDI threshold:** ₩100,000,000 (~$75,000 USD) to qualify for D-8 visa
- **Typical property price:** ₩50M–₩150M (~$36,000–$109,000 USD) for rural 빈집
- **Typical renovation budget:** ₩20M–₩50M (~$14,500–$36,000 USD)
- **Typical all-in budget:** $100,000–$150,000 (property + renovation + advisory fees)
- **Revenue requirement:** Business must generate income within 2 years for D-8 renewal
- **D-8 visa term:** 2 years, renewable indefinitely
- **F-2 eligibility:** Long-term residency visa, typically after 3–5 years on D-8

---

## Technology & Platform

**Stack:**
- Frontend: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Auth: Supabase (email + password)
- Hosting: Vercel
- Property review queue: Airtable
- Domain: korearoots.com (Namecheap → Vercel DNS)

**Website pages (all live):**

| Page | URL | Description |
|------|-----|-------------|
| Homepage | / | Hero, feature cards, How It Works CTA |
| Properties | /properties | Curated listings with D-8 badge, filter by region/status |
| Property Detail | /properties/[slug] | Full specs, Google Maps embed, price card, consultation CTA |
| How It Works | /how-it-works | 6-step process + full STR roadmap infographic |
| Services | /services | Packages, individual services, FAQ |
| About | /about | Full glossary of Korean real estate & visa terms |
| Blog | /blog | 8 educational articles on 빈집, FDI, D-8 visa, STR |
| Consultation | /consultation | 5-step client intake form |
| Sign In | /sign-in | Email + password authentication |
| Client Dashboard | /dashboard | Protected — 6-stage journey tracker for clients |

**Current property listings:**
- Boryeong Country House — Geumam-ri (Chungnam) — ₩1억 — 446㎡ land, 66.81㎡ building
- Log Cabin in Mountain Village — Dong-o-ri (Chungnam) — ₩1억1,000 — 200㎡ land, 68.75㎡ building
- Basalt Stone Villa — Seogwipo-si (Jeju) — ₩2억1,000 — under review

---

## Brand Identity

| Element | Value |
|---------|-------|
| Primary color | Navy `#0D1B2A` |
| Accent color | Teal `#1B998B` |
| Highlight color | Gold `#E9C46A` |
| Font | Inter (Google Fonts) |
| Logo | BinJib mark + "Korea Roots" wordmark, white on navy |

---

## Key Terms Glossary

| Term | Plain English |
|------|---------------|
| **빈집 (Bin-jip)** | Abandoned rural Korean property — "empty house" |
| **FDI** | Foreign Direct Investment — the legal framework for foreigners investing in Korea |
| **MOLIT** | Ministry of Land, Infrastructure and Transport — oversees property registration & permits |
| **Investment Registration** | Formal declaration of FDI through government-approved channels — required to obtain Foreign Investment Registration Certificate for D-8 visa |
| **D-8 Visa** | Business Investment Visa — 2-year renewable residency for qualifying investors |
| **F-2 Visa** | Long-Term Resident visa — next step after D-8, not tied to investment amount |
| **STR** | Short-Term Rental — Airbnb-style rental, primary income model for KoreaRoots investors |
| **법인** | Korean business entity (corporation) — required vehicle for FDI |
| **Wehome** | Korean government-certified STR platform, preferred for regulatory compliance |

---

## FAQ

**Do I need to travel to Korea to buy a property?**
Not necessarily. Most of the process can be handled remotely. We recommend one in-person visit for property viewing and signing, but a local power of attorney can be arranged if needed.

**What's the minimum budget?**
₩100,000,000 (~$75,000 USD) investment minimum for D-8 eligibility, plus property purchase price, renovation costs, and advisory fees. Typical all-in budget is $100,000–$150,000.

**How long does the whole process take?**
4–6 months from first consultation to D-8 visa approval. 7–9 months to first rental income.

**Can I own the property without a visa?**
Yes. Foreign nationals can own Korean real estate without a visa. Most clients pursue the D-8 because it grants the right to live in and operate their business in Korea.

**What happens if the STR doesn't generate enough revenue for visa renewal?**
KoreaRoots actively manages pricing and occupancy to hit the revenue targets required for renewal. We include a revenue guarantee discussion as part of the Founding Member package.

**Is this legal for foreigners?**
Yes. South Korea actively encourages FDI and foreign property ownership. Investment registration is coordinated through government-approved channels and partner law firms.

---

## Outstanding Decisions Before Grant Submission

- [ ] **Essentials price:** $4,900 (site) vs. $2,200–$3,700 (original plan) — pick one and align everywhere
- [ ] **Renovation fee:** 12% (site) vs. 15% (original) — confirm margin
- [ ] **STR commission:** 18%/12% (site) vs. 20% (original) — confirm margin works
- [ ] **Investment registration:** Confirm exact registration channel with a Korean immigration lawyer before going live
- [ ] Add real property photos to listings kr-001 and kr-002
- [ ] Wire consultation form submissions to Airtable
- [ ] Connect korearoots.com domain DNS in Namecheap → Vercel
