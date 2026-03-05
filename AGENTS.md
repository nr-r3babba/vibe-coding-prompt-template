# AGENTS.md — Master Plan for Bronte AI Sales Agent

## Project Overview & Stack
**App:** Bronte AI Sales Agent
**Overview:** An AI-native sales system that automates end-to-end GTM operations for a 4-person team targeting Tier 1 financial institutions across AU, NZ, and SG. AI agents handle 80% of execution — prospecting, note-taking, CRM updates, ROI modelling, and deal strategy — while humans focus on conversations and decisions only. The target is $10M ARR (9 new enterprise logos) within 9 months.
**Stack:** n8n (self-hosted on AWS EC2) + HubSpot CRM + Claude API (claude-sonnet-4-20250514) + AWS (Transcribe, S3, Lambda) + Microsoft Graph API (Office 365) + Phantom Buster (LinkedIn) + Gmail API + Slack
**Critical Constraints:**
- All client/prospect data must remain in AU-hosted infrastructure (AWS ap-southeast-2)
- No visible meeting bots — hidden audio capture only
- Agents MUST escalate to human before any external communication or data deletion
- HubSpot Free CRM with outbound-only API calls — no native workflows/webhooks
- Privacy Act 1988 (AU) and PDPA (SG) compliance required for meeting transcription
- Monthly infrastructure budget target: ~$480 AUD

## How I Should Think
1. **Understand Intent First**: Before answering, identify what the user actually needs
2. **Ask If Unsure**: If critical information is missing, ask before proceeding
3. **Plan Before Coding**: Propose a plan, ask for approval, then implement
4. **Verify After Changes**: Run tests or manual checks after each change
5. **Explain Trade-offs**: When recommending something, mention alternatives

## Setup & Commands
Execute these commands for standard development workflows. Do not invent new package manager commands.
- **n8n Start (local):** `npx n8n start`
- **n8n Start (Docker):** `docker run -it --rm -p 5678:5678 n8nio/n8n`
- **HubSpot Properties Setup:** `node scripts/setup-hubspot-properties.js`
- **Run Tests:** `npm test`
- **Lint:** `npm run lint`

## Protected Areas
Do NOT modify these areas without explicit human approval:
- **Infrastructure:** AWS CloudFormation/Terraform configs, EC2 instance settings
- **Credentials:** HubSpot API tokens, Claude API keys, AWS credentials, Microsoft Graph secrets, Phantom Buster configs
- **Database:** HubSpot CRM schema changes (custom properties, pipeline stages)
- **Third-Party Integrations:** OAuth configurations, webhook endpoints, Slack bot settings
- **Meeting Audio Pipeline:** AWS Transcribe + S3 encryption settings

## Coding Conventions
- **n8n Workflows:** One workflow per agent feature. Name workflows clearly: `[Agent]-[Function]` (e.g., `MeetingAgent-TranscriptAnalysis`)
- **Claude API Prompts:** Store all prompt templates in a dedicated `prompts/` folder as versioned files
- **Scripts:** Node.js for utility scripts (HubSpot setup, data migration). Use ES modules.
- **Error Handling:** All n8n workflows must have error trigger nodes that alert via Slack
- **Naming:** snake_case for HubSpot properties, camelCase for JavaScript, descriptive names for n8n nodes
- **Security:** Never log sensitive data. Use deal IDs instead of prospect names in Claude API calls. Encrypt all S3 objects.

## Agent Behaviors
These rules apply across all AI coding assistants:
1. **Plan Before Execution:** ALWAYS propose a brief step-by-step plan before changing more than one file.
2. **Refactor Over Rewrite:** Prefer refactoring existing n8n workflows incrementally rather than rebuilding from scratch.
3. **Context Compaction:** Write states to `MEMORY.md` instead of filling context history during long sessions.
4. **Iterative Verification:** Test each n8n workflow after changes. Fix errors before proceeding (See `REVIEW-CHECKLIST.md`).
5. **One Feature at a Time:** Build one agent feature, test it end-to-end, then move to the next.

## What NOT To Do
- Do NOT delete files without explicit confirmation
- Do NOT modify HubSpot CRM schemas without backup plan
- Do NOT add features not in the current phase
- Do NOT skip tests for "simple" changes
- Do NOT bypass failing tests or pre-commit hooks
- Do NOT use deprecated libraries or patterns
- Do NOT store API keys in workflow JSON — use n8n credential vault only
- Do NOT send any external communication without human approval

## Phased Roadmap

### Phase 0: Foundations (Week 1: 9-14 Mar)
- [ ] HubSpot Private App setup + API integration (F-01)
- [ ] Create 8 MEDDPICC custom deal properties + deal_health_score
- [ ] Deploy n8n on AWS EC2 (t3.small, ap-southeast-2)
- [ ] Connect n8n to HubSpot via official node
- [ ] Set up deal pipeline stages matching Bronte's funnel
- [ ] Configure Google Calendar integration

### Phase 1: Top of Funnel (Week 2: 14-21 Mar)
- [ ] LinkedIn ICP Scraper via Phantom Buster + n8n (F-02)
- [ ] MEDDPICC Auto-Scoring Agent via Claude API (F-03)
- [ ] Auto-create scored deals in HubSpot
- **Gate:** First 10 prospects scored and added to CRM

### Phase 2: Middle of Funnel (Week 3: 21-28 Mar)
- [ ] Hidden Meeting Note-Taking Agent: audio capture + AWS Transcribe + Claude API (F-04)
- [ ] Pre-Call Briefing Agent: n8n + Claude API + HubSpot/Calendar (F-05)
- [ ] ROI / Business Case Auto-Updater via Microsoft Graph API (F-06)
- **Gate:** First live call processed; brief delivered; HubSpot updated

### Phase 3: Bottom of Funnel (Week 4: 28-31 Mar)
- [ ] Follow-Up Cadence & Strategy Agent (F-07)
- [ ] End-to-end workflow testing
- [ ] Team onboarding
- **Gate:** Full pipeline workflow validated with real deals

### Phase 4: Go Live (1 Apr)
- [ ] All team members onboarded
- [ ] Legacy manual tracking decommissioned
- [ ] Monitoring dashboards live

## Documentation References
- `agent_docs/tech_stack.md` — Full tech stack details, setup commands, and patterns
- `agent_docs/product_requirements.md` — Complete feature specs and user stories
- `agent_docs/project_brief.md` — Vision, conventions, and key principles
- `agent_docs/testing.md` — Testing strategy and verification procedures
- `agent_docs/resources.md` — Reference repositories and documentation links
- `MEMORY.md` — Current session state and architectural decisions
- `REVIEW-CHECKLIST.md` — Quality gates before marking tasks complete
