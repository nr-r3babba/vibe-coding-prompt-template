# System Memory & Context
<!--
AGENTS: Update this file after every major milestone, structural change, or resolved bug.
DO NOT delete historical context if it is still relevant. Compress older completed items.
-->

## Active Phase & Goal
**Current Phase:** Phase 0 — Foundations
**Current Task:** Run setup scripts against live HubSpot, then deploy n8n on AWS
**Completed This Session:**
- Created project scaffold (package.json, .env.example, .gitignore)
- Built `scripts/setup-hubspot-properties.js` — creates 9 MEDDPICC properties (safe to re-run)
- Built `scripts/test-hubspot-connection.js` — verifies API token + CRUD operations
- Built `scripts/setup-hubspot-pipeline.js` — shows current pipeline + recommends Bronte stages
- Created `prompts/meeting-analysis.md` — first Claude prompt template for F-04

**Next Steps:**
1. USER ACTION: Create HubSpot Private App (Settings > Integrations > Private Apps) with CRM scopes
2. USER ACTION: Copy .env.example to .env, paste your HubSpot token
3. Run `npm run test:connection` to verify API access
4. Run `npm run setup:properties` to create MEDDPICC properties
5. Run `npm run setup:pipeline` and manually configure pipeline stages in HubSpot UI
6. Deploy n8n on AWS EC2 t3.small in ap-southeast-2 (Sydney)
7. Connect Google Calendar to HubSpot for meeting triggers

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
- [ ] Phase 0: Foundations (9-14 Mar)
- [ ] Phase 1: Top of Funnel (14-21 Mar)
- [ ] Phase 2: Middle of Funnel (21-28 Mar)
- [ ] Phase 3: Bottom of Funnel (28-31 Mar)
- [ ] Phase 4: Go Live (1 Apr)
