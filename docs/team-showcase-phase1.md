# Bronte AI Sales Agent — Team Showcase
### Phase 1 Complete | 16 March 2026

---

## What Is This?

An AI-powered sales automation system that **handles 80% of our sales execution** — from finding prospects to scoring deals — so we can focus on conversations and closing.

---

## Progress Tracker

```
Phase 0: Foundations        ✅ Complete (9-14 Mar)
Phase 1: Top of Funnel      ✅ Complete (14-21 Mar)  ← WE ARE HERE
Phase 2: Middle of Funnel   🟡 Starting next (21-28 Mar)
Phase 3: Bottom of Funnel   ⏳ Planned (28-31 Mar)
Phase 4: Go Live            ⏳ Target: 1 April 2026
```

---

## What's Working Right Now

### 1. HubSpot CRM — Fully Configured
- Private App connected with full API access
- **"2026 Sales Pipeline"** with 12 deal stages
- **9 custom MEDDPICC properties** on every deal (metrics, economic buyer, decision criteria, decision process, paper process, pain, champion, competition, deal health score)
- All contacts, deals, tasks, and notes accessible via API

### 2. LinkedIn ICP Scraper (Auto-Prospecting)
Prospects from Phantom Buster are **automatically scored and filtered** by AI before entering our CRM.

```
Phantom Buster (LinkedIn)
        │
        ▼
   n8n Webhook receives prospect data
        │
        ▼
   Claude AI scores ICP fit (1-10)
   • Role relevance (C-suite, VP in Risk/Compliance/Tech/Finance)
   • Company fit (Tier 1 banks, AU/NZ/SG)
   • Decision authority
        │
        ├── Score 6+ → Auto-create HubSpot Contact + Deal
        │                with fit rationale & recommended approach
        │
        └── Score < 6 → Filtered out (not added to CRM)
```

**Result:** Only high-quality leads enter our pipeline. No manual screening needed.

### 3. MEDDPICC Auto-Scorer (Deal Intelligence)
Every deal gets an **automated MEDDPICC assessment** — scored across 8 dimensions with evidence and action recommendations.

```
   Trigger: Webhook call with Deal ID
        │
        ▼
   Fetch deal + contact data from HubSpot
        │
        ▼
   Claude AI scores 8 MEDDPICC dimensions (1-5 each)
   • Metrics       • Decision Process
   • Economic Buyer • Paper Process
   • Decision Criteria • Pain
   • Champion      • Competition
        │
        ▼
   HubSpot updated with:
   • Per-dimension scores + evidence
   • Overall score (out of 40)
   • Deal health rating (1-10)
   • Top gaps identified
   • Recommended next actions
```

**Result:** Instant deal qualification without manual MEDDPICC spreadsheets.

---

## How It All Connects

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│ Phantom Buster   │────▶│  n8n (Engine) │────▶│   HubSpot CRM   │
│ (LinkedIn data)  │     │              │     │  (Single source  │
└─────────────────┘     │  Orchestrates │     │   of truth)      │
                        │  all workflows│     └─────────────────┘
┌─────────────────┐     │              │
│  Claude Sonnet 4 │◀───│  Calls AI for │
│  (AI Reasoning)  │───▶│  scoring      │
└─────────────────┘     └──────────────┘
```

**Tech stack:** n8n (workflow engine) + Claude Sonnet 4 (AI) + HubSpot (CRM) + Phantom Buster (LinkedIn) + AWS (hosting)

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Monthly cost | ~$480 AUD |
| ICP scoring time | < 30 seconds per prospect |
| MEDDPICC scoring time | < 30 seconds per deal |
| MEDDPICC dimensions | 8 (industry standard) |
| ICP filter threshold | Score 6+ out of 10 |
| Max MEDDPICC score | 40 (5 per dimension) |
| E2E tests | Passing (ICP + MEDDPICC + HubSpot writes) |

---

## Cost Breakdown (~$480 AUD/month)

| Service | Cost | What It Does |
|---------|------|-------------|
| HubSpot Sales Hub Pro | $250 | CRM backbone — stores all contacts, deals, MEDDPICC scores. Free plan has no workflows, so we drive everything via API through n8n |
| Claude API (Sonnet 4) | $75 | AI reasoning for ICP scoring + MEDDPICC scoring. ~$0.003/call, scales with prospect volume |
| Phantom Buster | $70 | Scrapes LinkedIn profiles for prospect data. Rate-limited to <50 profiles/day |
| AWS Transcribe | $30 | Meeting transcription (Phase 2). Pay-per-minute pricing |
| n8n on AWS EC2 | $25 | t3.small instance in Sydney (ap-southeast-2). Runs all workflow orchestration |
| AWS S3 + Lambda | $10 | Audio storage (24hr TTL) + serverless processing for transcripts |
| Misc (domain, etc.) | $20 | Domain, DNS, minor infra |

**Why this works:**
- **No per-seat licensing** — the system works for the whole team at flat cost
- **Scales cheaply** — Claude API and AWS Transcribe are pay-per-use, so costs only grow with actual deal volume
- **Sydney region (ap-southeast-2)** for AU data residency compliance at no premium
- **Biggest line item is HubSpot** ($250) — but it's our single source of truth for the entire pipeline
- **Cost per deal: ~$53/month** across 9 target enterprise deals — trivial against a $10M ARR target

---

## What's Coming Next (Phase 2: 21-28 Mar)

| Feature | What It Does |
|---------|-------------|
| **Meeting Note-Taker (F-04)** | Records sales calls via AWS Transcribe, Claude extracts MEDDPICC signals, action items, and deal insights — automatically updates HubSpot |
| **Pre-Call Briefing (F-05)** | Before every call, auto-generates a brief: deal history, MEDDPICC gaps, suggested agenda, key questions to ask |
| **ROI Auto-Updater (F-06)** | After each call, auto-updates the ROI model and business case documents via Microsoft Graph API |

**Phase 2 Gate:** First live call processed, brief delivered, HubSpot updated.

---

## Timeline to Go-Live

```
Week of 14 Mar  ✅  Phase 1 — ICP scoring + MEDDPICC scoring live
Week of 21 Mar  🟡  Phase 2 — Meeting intelligence + pre-call briefs + ROI docs
Week of 28 Mar  ⏳  Phase 3 — Follow-up cadence agent + end-to-end testing
1 April 2026    ⏳  Phase 4 — Go live, team onboarded, legacy tracking retired
```

---

## Try It Yourself

**See the ICP Scraper in action** (sends a test prospect through the full pipeline):
```bash
node scripts/test-phase1-flow.js icp
```

**See the MEDDPICC Scorer in action** (scores an existing deal):
```bash
node scripts/test-phase1-flow.js meddpicc <deal-id>
```

**Send real Phantom Buster results through the pipeline:**
```bash
node scripts/send-phantom-results.js <path-to-prospects.json>
```

> Requires n8n running locally (`npx n8n start`) and `.env` configured with HubSpot + Anthropic API keys.

---

## Key Files

| File | Purpose |
|------|---------|
| `n8n-workflows/01-linkedin-icp-scraper.json` | ICP scoring workflow |
| `n8n-workflows/02-meddpicc-auto-scorer.json` | MEDDPICC scoring workflow |
| `prompts/icp-scoring.md` | Claude prompt for ICP evaluation |
| `prompts/meddpicc-scoring.md` | Claude prompt for MEDDPICC scoring |
| `scripts/test-phase1-flow.js` | End-to-end test script |
| `scripts/send-phantom-results.js` | Batch prospect ingestion tool |
| `AGENTS.md` | Full roadmap and phase details |
