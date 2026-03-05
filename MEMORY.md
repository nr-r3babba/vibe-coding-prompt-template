# System Memory & Context
<!--
AGENTS: Update this file after every major milestone, structural change, or resolved bug.
DO NOT delete historical context if it is still relevant. Compress older completed items.
-->

## Active Phase & Goal
**Current Phase:** Phase 0 COMPLETE — Ready for Phase 1
**Current Task:** Begin Phase 1 — Top of Funnel agents
**Completed:**
- Project scaffold (package.json, .env.example, .gitignore)
- HubSpot Private App connected — API token verified (auth, CRUD, contacts, owners all passing)
- 9 MEDDPICC custom deal properties created in HubSpot (deal_qualification group)
- Pipeline verified — "2026 Sales Pipeline" with 12 stages already configured
- Scripts: `setup-hubspot-properties.js`, `test-hubspot-connection.js`, `setup-hubspot-pipeline.js`, `load-env.js`
- Prompt template: `prompts/meeting-analysis.md` (Claude API prompt for F-04)
- Infrastructure: `deploy-n8n-aws.sh`, `docker-compose.yml`, `setup-google-calendar.txt`
- n8n workflow: `n8n-workflows/00-hubspot-connection-test.json` (ready to import)
- Node.js v24.14.0 installed via winget

- Docker Desktop installed, n8n container running (localhost:5678, health 200 OK)
- Google Calendar connected to HubSpot
- n8n ↔ HubSpot connection verified via test workflow

**Next Steps (Phase 1 — Top of Funnel):**
1. Build LinkedIn ICP Scraper workflow (Phantom Buster + n8n) — F-02
2. Build MEDDPICC Auto-Scoring Agent (Claude API + n8n) — F-03
3. Auto-create scored deals in HubSpot
4. Gate: First 10 prospects scored and added to CRM

## Architectural Decisions
- 2026-03-05 - Architecture: Event-Driven Agent Mesh. Each agent is triggered by an event, performs a focused task, writes results to HubSpot. Small, testable, replaceable agents.
- 2026-03-05 - Orchestration: n8n (self-hosted on AWS EC2) chosen for workflow orchestration. All CRM writes go through n8n, never directly from Claude API.
- 2026-03-05 - AI Reasoning: Claude API (claude-sonnet-4-20250514) for all AI tasks. Estimated ~$50-$150/month.
- 2026-03-05 - CRM: HubSpot Free CRM with outbound-only API calls. No native workflows/webhooks needed.
- 2026-03-05 - Meeting Intelligence: Hidden audio capture (system audio) + AWS Transcribe + Lambda. No visible meeting bots.
- 2026-03-05 - Document Generation: Microsoft Graph API for auto-updating .pptx, .xlsx, .docx stored in SharePoint/OneDrive.
- 2026-03-05 - LinkedIn Data: Phantom Buster for LinkedIn data extraction. Rate limited to <50 profiles/day.
- 2026-03-05 - Data Residency: All AU client data must stay in AWS ap-southeast-2 (Sydney).
- 2026-03-05 - Security: Deal IDs used in Claude API calls (never prospect names). S3 buckets private + SSE-S3 encryption. Audio files deleted within 24hrs of transcription.

## Known Issues & Quirks
- HubSpot Free plan does NOT support native Workflows, Webhooks, or Custom Code Actions — all automation must be agent-orchestrated externally via n8n
- LinkedIn data provider not yet selected (Proxycurl, Apollo, Lusha shortlisted) — blocks F-02 and F-03
- Slack workspace/channel targets TBD — interim delivery via email
- Legal review for meeting transcription (Privacy Act 1988 AU + PDPA SG) running in parallel — note-taking agent cannot go to production until sign-off
- Document templates (ROI model, business case, pitch deck) handover required by 14 Mar

## Completed Phases
- [x] Workspace setup — AGENTS.md, MEMORY.md, agent_docs/ created
- [x] Phase 0: Foundations (9-14 Mar) — VERIFIED 5 Mar: HubSpot API, MEDDPICC props, n8n running, Calendar connected
- [ ] Phase 1: Top of Funnel (14-21 Mar)
- [ ] Phase 2: Middle of Funnel (21-28 Mar)
- [ ] Phase 3: Bottom of Funnel (28-31 Mar)
- [ ] Phase 4: Go Live (1 Apr)
