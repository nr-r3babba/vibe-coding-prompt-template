# Product Requirements

## Product Summary
**Product:** Bronte AI Sales Agent — End-to-End GTM Automation
**Version:** MVP (v1.0)
**Launch Target:** 31 March 2026
**ARR Goal:** $10M ARR within 9 months (9 new enterprise logos)
**Target Market:** Tier 1 Financial Institutions — AU, NZ, SG

## Primary User Story
As a sales team member at Bronte, I want AI agents to handle 80% of sales execution tasks — from prospect discovery to CRM updates to follow-up strategies — so I can focus 100% on building relationships with Tier 1 bank executives and closing enterprise deals.

## Must-Have Features (P0)

### F-01: HubSpot Full Agent Integration
- **Description:** Bi-directional agent access to HubSpot CRM — read and write deals, contacts, meetings, tasks, notes, pipelines
- **User Story:** As a sales team member, I want all deal activity auto-synced to HubSpot so I never lose context between meetings
- **Acceptance Criteria:** Agents can create/update deals, contacts, tasks, meetings and notes via HubSpot API; all data changes are auditable; latency <30 seconds from trigger event
- **Dependencies:** HubSpot API access; OAuth authentication; defined field mapping schema
- **Priority:** P0 — foundational for all other features

### F-02: LinkedIn ICP Scraper & Network Mapper
- **Description:** Web crawler agent maps target ICPs (Tier 1 bank roles in AU/NZ/SG) on LinkedIn and traces network paths to Bronte founders and sales partners
- **User Story:** As a founder, I want to know who our ICPs are and how we are connected to them so I can leverage warm introductions
- **Acceptance Criteria:** Agent identifies contacts matching ICP criteria; maps shortest network path to Bronte team; outputs structured list with connection degree; respects LinkedIn ToS and rate limits
- **Dependencies:** LinkedIn data access (Phantom Buster / third-party API); network graph data structure
- **Priority:** P0 — critical for top-of-funnel lead generation

### F-03: Automated MEDDPICC Scoring
- **Description:** For each prospect, agent calculates a real-time MEDDPICC score across 8 dimensions based on available data
- **Dimensions:** Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition
- **User Story:** As a sales lead, I want each prospect to have a MEDDPICC score so I can prioritise which deals to pursue
- **Acceptance Criteria:** Score calculated automatically on deal creation; score updates as deal progresses; score breakdown visible per dimension; top-scored deals surfaced as priority actions in HubSpot
- **Dependencies:** HubSpot integration (F-01); deal data from meeting notes; LinkedIn data (F-02)
- **Priority:** P0 — core to qualification discipline

### F-04: Hidden Meeting Note-Taking Agent
- **Description:** An audio-based listener agent (non-visible, no meeting login required) captures and transcribes sales calls, extracts key entities, and auto-updates HubSpot
- **User Story:** As a founder, I want call notes automatically captured and synced to HubSpot so I can focus on the conversation
- **Acceptance Criteria:** Agent listens without joining meeting visibly; transcript within 5 min post-call; entities extracted and mapped to HubSpot fields; accuracy >90%; GDPR/Privacy Act compliant
- **Dependencies:** Audio access (system audio capture); AWS Transcribe; Claude API; HubSpot integration (F-01)
- **Priority:** P0 — solves the most critical middle-funnel pain point

### F-05: Pre-Call Briefing Agent
- **Description:** Before each scheduled sales meeting, agent compiles and delivers a briefing: deal history, open actions, prospect priorities, suggested agenda, MEDDPICC gaps
- **User Story:** As a sales partner, I want a pre-call brief delivered automatically before each meeting so I walk in fully prepared
- **Acceptance Criteria:** Brief delivered 30 minutes before meeting start; includes deal summary, last meeting outcomes, open actions, MEDDPICC status, 3 suggested talking points; delivered via email and/or Slack
- **Dependencies:** HubSpot integration (F-01); MEDDPICC scores (F-03); calendar integration
- **Priority:** P0 — directly reduces founder prep burden

### F-06: ROI / Business Case Auto-Updater
- **Description:** Agent monitors meeting notes and HubSpot for ROI signals, then updates ROI model, business case template, and pricing sheet
- **User Story:** As a GTM team member, I want ROI models and business cases to update automatically from call notes
- **Acceptance Criteria:** Data points extracted within 10 min of sync; documents updated with versioning; changes flagged for human review; supports Excel and Google Sheets formats
- **Dependencies:** Meeting note agent (F-04); HubSpot integration (F-01); document templates
- **Priority:** P0 — critical to accelerating PoC and ROI delivery

### F-07: Follow-Up Cadence & Strategy Agent
- **Description:** Agent monitors deal stage and time since last activity, generates customised follow-up strategies and reminders
- **User Story:** As a sales partner, I want to be prompted when deals go quiet with a suggested re-engagement strategy
- **Acceptance Criteria:** Detects deals with no activity for X days (configurable); generates context-aware follow-up draft; delivers via HubSpot task + Slack/email; different cadence per funnel stage
- **Dependencies:** HubSpot integration (F-01); deal stage definitions; Slack/email delivery
- **Priority:** P0 — addresses bottom-of-funnel ghosting

## Should-Have Features (v1.1)
- **Pitch Deck Auto-Personaliser** — Auto-tailors pitch deck per prospect using deal history
- **Pricing / Quote Tracker** — Version-controlled quote tracking with margin alerts
- **Negotiation Strategy Briefer** — Pre-call negotiation tactics based on full deal history

## NOT in MVP
- Automated PoC Generator (requires client data sharing agreements)
- Autonomous outreach / email sending (requires legal review)
- Public-facing agent capabilities (internal use only for MVP)
- neo4j network spider map (Phase 3 / v1.1)

## Success Metrics

### North Star
9 new enterprise logos closed within 9 months, contributing to $10M ARR target.

### Leading Indicators (30-day post-launch)
| Metric | Baseline | Target |
|--------|----------|--------|
| Qualified leads added to HubSpot per week | ~2 (manual) | 10+ |
| MEDDPICC score coverage (% deals scored) | 0% | 100% |
| Post-call note sync rate | ~0% | 95%+ |
| Pre-call briefing delivery rate | 0% | 100% of scheduled calls |
| ROI model update turnaround | Weeks | <24 hours from call |

### Lagging Indicators (90-day)
| Metric | Baseline | Target |
|--------|----------|--------|
| Deals advanced per month | ~2 | 8+ |
| Average PoC/ROI delivery time | 3-4 months | <4 weeks |
| Founder time on admin (hrs/week) | ~15 hrs | <3 hrs |
| Deal ghosting rate (post-proposal) | High | <20% |
| New logos closed (9-month) | 0 | 9 |

## Target Users
| Persona | Location | Primary Need |
|---------|----------|-------------|
| Founder / Sales Lead | Sydney | Pre-call briefs, post-call automation, deal intelligence |
| GTM Team Member | Colombo | Automated collateral updates, deck generation, meeting logistics |
| Sales Partner | SG, NZ, AU | Lead qualification scores, deal context, negotiation prep |

## Non-Functional Requirements
- **Security:** AES-256 encryption at rest; TLS 1.3 in transit
- **Privacy:** Privacy Act 1988 (AU) + PDPA (SG) compliant for meeting transcription
- **Data Residency:** AU client data in AWS ap-southeast-2
- **Availability:** 99.5% uptime during AEST business hours
- **Latency:** HubSpot sync <30s; Pre-call brief <2 min; Transcript <5 min post-call
- **Scalability:** Up to 50 concurrent active deals
- **Auditability:** All agent actions logged with timestamps, inputs, outputs
- **Access Control:** RBAC — founders, GTM team, sales partners with appropriate permissions

## Escalation Rules
Agents operate autonomously for all internal data capture, synthesis, and update tasks. Agents MUST escalate to a human before:
1. Any direct communication with an external prospect or contact
2. Any deletion of records or data
