**BRONTË**

AI-Native Risk Platform

**Technical Design Document**

AI-Native Sales System --- MVP Build

Version 1.0 \| March 2025 \| Phase 1 Target: 31 March 2025

**1. Executive Summary**

This Technical Design Document defines how Brontë will build its
AI-Native Sales System --- an end-to-end agentic pipeline that automates
lead generation, deal tracking, meeting intelligence, and sales
collateral for a 4-person team targeting 10 new enterprise logos in 9
months.

+-----------------------------------------------------------------------+
| **🎯 Mission**                                                        |
|                                                                       |
| Enable a small team to punch above its weight in enterprise B2B sales |
| --- by having AI agents handle 80% of execution: prospecting,         |
| note-taking, CRM updates, ROI modelling, and deal strategy. Humans    |
| focus on conversations and decisions only.                            |
+-----------------------------------------------------------------------+

  -----------------------------------------------------------------------
  **Parameter**              **Detail**
  -------------------------- --------------------------------------------
  Product                    Brontë AI-Native Sales System

  Version                    MVP 1.0

  Phase 1 Target             31 March 2025

  Full Decommission          30 June 2025

  Core Stack                 n8n + HubSpot + Claude API + AWS

  Team Building This         Vibe-coder approach with AI assistance

  Monthly Budget             Flexible --- prioritise what works

  Primary AI Builder         Claude (architecture + code), Cursor
                             (implementation)
  -----------------------------------------------------------------------

**2. Architecture Overview**

The system is built as a collection of AI agents orchestrated by n8n,
all connected to HubSpot as the single source of truth. AWS provides
compute and storage. The Claude API powers all AI reasoning tasks.

**2.1 High-Level System Design**

+-----------------------------------------------------------------------+
| **Architecture Pattern: Event-Driven Agent Mesh**                     |
|                                                                       |
| Each agent is triggered by an event (new LinkedIn profile, calendar   |
| invite, CRM update), performs a focused task, and writes results back |
| to HubSpot. No agent does everything --- each is small, testable, and |
| replaceable.                                                          |
+-----------------------------------------------------------------------+

  -----------------------------------------------------------------------------
  **Layer**          **Technology**               **Purpose**
  ------------------ ---------------------------- -----------------------------
  Orchestration      n8n (self-hosted on AWS)     Trigger, route, and sequence
                                                  all agent workflows

  AI Reasoning       Claude API                   MEDDPICC scoring, note
                     (claude-sonnet-4-20250514)   analysis, deck updates,
                                                  strategy generation

  CRM / Data Store   HubSpot (Sales Hub Pro)      All deals, contacts, tasks,
                                                  notes, meetings, timelines

  Meeting            AWS Transcribe + Lambda      Real-time audio transcription
  Intelligence                                    from meeting audio stream

  Document           Microsoft Graph API          Auto-update .pptx pitch
  Generation         (PowerPoint, Excel, Word)    decks, .xlsx pricing models,
                                                  .docx business cases ---
                                                  stored in OneDrive/SharePoint

  Prospecting Data   LinkedIn Sales Navigator +   ICP mapping and network graph
                     Phantom Buster               data

  Knowledge Base     SharePoint / OneDrive        ROI models, pricing sheets,
                     (Microsoft 365)              business case templates ---
                                                  all stored as Office files in
                                                  SharePoint

  Communication      Gmail API + Slack            Agent notifications,
                                                  follow-up reminders, deal
                                                  alerts
  -----------------------------------------------------------------------------

**3. Phased Build Roadmap**

The build is structured in three phases aligned to Brontë's AI-native
transition timeline. Phase 1 is critical --- it must be live by 31 March
2025.

**Phase 1: Core Pipeline --- Build by 31 March 2025**

  --------------------------------------------------------------------------------------
  **\#**   **Feature**            **Tool / Agent**     **HubSpot Output** **Priority**
  -------- ---------------------- -------------------- ------------------ --------------
  1        Full HubSpot agent     n8n HubSpot node +   Deals, Contacts,   Critical
           access                 API key              Tasks, Notes       

  2        Hidden meeting         AWS Transcribe +     Meeting notes,     Critical
           note-taker             Claude API + n8n     action items, deal 
                                                       updates            

  3        Pre-call briefing      n8n + Claude API +   Slack/email brief  Critical
           agent                  HubSpot              30 min before each 
                                                       call               

  4        MEDDPICC auto-scorer   Claude API + HubSpot MEDDPICC score per High
                                  custom properties    deal, updated      
                                                       post-call          

  5        LinkedIn ICP web       Phantom Buster +     New contacts and   High
           crawler                n8n + Claude         deals in HubSpot   
  --------------------------------------------------------------------------------------

**Phase 2: Intelligence Layer --- April 2025**

  -----------------------------------------------------------------------------
  **\#**   **Feature**             **Tool / Agent**        **Output**
  -------- ----------------------- ----------------------- --------------------
  6        ROI / Business case     Claude API + Microsoft  Live-updated .pptx
           auto-updater            Graph API (PowerPoint + deck + .docx
                                   Word) + HubSpot         business case per
                                                           deal

  7        Pricing sheet updater   n8n + Claude API +      Auto-updated .xlsx
                                   Microsoft Graph API     pricing model per
                                   (Excel)                 prospect

  8        PoC generator           Claude API + Microsoft  Draft .docx PoC
                                   Graph API (Word) +      document per
                                   HubSpot deal data       prospect

  9        Follow-up rhythm agent  n8n + Claude + HubSpot  Customised follow-up
                                                           task per deal stage
  -----------------------------------------------------------------------------

**Phase 3: Full Agent Mesh --- May--June 2025**

  -----------------------------------------------------------------------------
  **\#**   **Feature**           **Description**
  -------- --------------------- ----------------------------------------------
  10       Negotiation strategy  Pre-call briefing with negotiation tactics
           agent                 based on full deal history

  11       Network spider map    Map ICP networks in neo4j graph DB to find
                                 shortest path to founder connection

  12       Ghost-follow recovery Detects prospect silence and generates
           agent                 personalised re-engagement strategy

  13       Sales collateral      Automatically tailors pitch deck to each
           personaliser          prospect using deal history
  -----------------------------------------------------------------------------

**4. Agent Technical Designs**

**4.1 Meeting Intelligence Agent (Phase 1 --- Critical)**

+-----------------------------------------------------------------------+
| **⚠️ Sensitivity Constraint**                                         |
|                                                                       |
| Brontë cannot use visible note-takers (e.g. Otter.ai, Fireflies) that |
| appear in the meeting participant list. The solution uses a hidden    |
| audio capture approach via the device's system audio --- no bot joins |
| the call.                                                             |
+-----------------------------------------------------------------------+

**How it works:**

-   Sales owner runs a small desktop app (Electron or Python script)
    that captures system audio during the call

-   Audio is streamed in 30-second chunks to AWS S3

-   Lambda function triggers AWS Transcribe on each chunk

-   Transcript chunks are assembled and sent to Claude API with a
    structured prompt

-   Claude extracts: action items, MEDDPICC signals, ROI data points,
    pricing discussed, next steps

-   n8n workflow writes all extracted data back to HubSpot as notes,
    tasks, and deal property updates

**Claude Prompt Template (Meeting Analysis):**

+-----------------------------------------------------------------------+
| System: You are a B2B enterprise sales intelligence agent for Brontë, |
| an AI risk platform selling to Tier 1 banks in ANZ and Singapore.     |
|                                                                       |
| User: Analyse this sales call transcript. Extract and return JSON     |
| with:                                                                 |
|                                                                       |
| 1.  meddpicc_signals: object with M, E, D, D, P, I, C, C keys         |
|                                                                       |
| 2.  action_items: array of {owner, task, due_date}                    |
|                                                                       |
| 3.  roi_data_points: array of quantified business outcomes mentioned  |
|                                                                       |
| 4.  pricing_discussed: any pricing figures or ranges mentioned        |
|                                                                       |
| 5.  next_steps: agreed next steps with dates if mentioned             |
|                                                                       |
| 6.  deal_health_score: 1--10 with one-line rationale                  |
|                                                                       |
| Transcript: \[TRANSCRIPT\]                                            |
+-----------------------------------------------------------------------+

**4.2 Pre-Call Briefing Agent (Phase 1 --- Critical)**

Triggered 30 minutes before any HubSpot meeting with a deal attached.
Sends a Slack message to the deal owner with:

-   Deal stage and last 3 interactions summary

-   MEDDPICC gaps to probe in this call

-   Open action items from last meeting

-   Suggested agenda and questions

-   Negotiation watch-outs (if late stage)

  -----------------------------------------------------------------------
  **Trigger**            **Source**                **Output Channel**
  ---------------------- ------------------------- ----------------------
  Meeting starts in 30   HubSpot Calendar / Google Slack DM to deal owner
  mins                   Calendar webhook          

  Deal stage changes     HubSpot workflow webhook  Slack DM + HubSpot
                                                   task

  No activity for 7 days n8n scheduled check       Slack alert with
  (late stage)                                     follow-up strategy
  -----------------------------------------------------------------------

**4.3 MEDDPICC Scoring Agent (Phase 1 --- High)**

MEDDPICC is a B2B sales qualification framework. Each letter represents
a deal dimension that must be understood to forecast a win. This agent
maintains a live score across all 8 dimensions in HubSpot.

  --------------------------------------------------------------------------
  **Dimension**    **What it tracks**           **HubSpot Property**
  ---------------- ---------------------------- ----------------------------
  M --- Metrics    Quantified business impact / meddpicc_metrics
                   ROI                          

  E --- Economic   Who controls the budget      meddpicc_economic_buyer
  Buyer                                         

  D --- Decision   How they'll evaluate vendors meddpicc_decision_criteria
  Criteria                                      

  D --- Decision   Steps and timeline to close  meddpicc_decision_process
  Process                                       

  P --- Paper      Legal / procurement steps    meddpicc_paper_process
  Process                                       

  I --- Identify   Root business problem        meddpicc_pain
  Pain                                          

  C --- Champion   Internal sponsor driving the meddpicc_champion
                   deal                         

  C ---            Other vendors in play        meddpicc_competition
  Competition                                   
  --------------------------------------------------------------------------

**5. HubSpot Configuration**

HubSpot is the single source of truth for all deal data. The following
setup must be completed before agents can write to it.

**5.1 Required HubSpot Setup Checklist**

  ------------------------------------------------------------------------
  **Task**                   **How**                 **Required For**
  -------------------------- ----------------------- ---------------------
  Create Private App (API    Settings → Integrations All agents
  key)                       → Private Apps          

  Enable scopes:             Private App creation    All agents
  crm.objects.all, timeline, wizard                  
  forms                                              

  Create 8 MEDDPICC custom   Settings → Properties → MEDDPICC agent
  deal properties            Deal → Create           

  Create deal_health_score   Settings → Properties → Meeting agent
  property (number)          Deal                    

  Create HubSpot workflows   Automation → Workflows  Pre-call agent
  for webhooks                                       

  Connect Google Calendar to Settings → Integrations Pre-call agent
  HubSpot                    → Google Calendar       

  Set up deal stages         Settings → Pipelines    All agents
  matching Brontë's funnel                           
  ------------------------------------------------------------------------

**5.2 n8n ↔ HubSpot Integration**

n8n connects to HubSpot via the official HubSpot node. All CRM writes go
through n8n workflows, never directly from Claude API responses.

-   n8n is self-hosted on AWS EC2 (t3.small, \~\$15/month)

-   HubSpot Private App token stored as n8n credential (never in
    workflow JSON)

-   All workflow errors trigger a Slack alert to the ops channel

-   Workflow execution logs retained for 30 days in n8n

**6. Claude API --- AI Reasoning Strategy**

  -------------------------------------------------------------------------------------
  **Task**              **Claude Role**        **Model**                  **Approx.
                                                                          Cost**
  --------------------- ---------------------- -------------------------- -------------
  Meeting transcript    Extract structured     claude-sonnet-4-20250514   \~\$0.05 per
  analysis              JSON from raw                                     call
                        transcript                                        

  MEDDPICC gap analysis Score 8 dimensions     claude-sonnet-4-20250514   \~\$0.02 per
                        from deal history                                 update

  Pre-call briefing     Summarise deal         claude-sonnet-4-20250514   \~\$0.01 per
  generation            context + suggest                                 brief
                        agenda                                            

  ROI model updates     Extract data points    claude-sonnet-4-20250514   \~\$0.03 per
                        and update template                               update

  Follow-up strategy    Generate personalised  claude-sonnet-4-20250514   \~\$0.01 per
                        outreach based on deal                            message
                        stage                                             

  LinkedIn ICP scoring  Score prospect fit     claude-sonnet-4-20250514   \~\$0.005 per
                        against ICP criteria                              prospect
  -------------------------------------------------------------------------------------

+-----------------------------------------------------------------------+
| **💰 Estimated Total Claude API Cost**                                |
|                                                                       |
| For a team of 4 running \~3 sales calls/week with 20 active           |
| prospects: approximately \$50--\$150/month. Well within budget at any |
| tier.                                                                 |
+-----------------------------------------------------------------------+

**7. Cost Breakdown**

  ---------------------------------------------------------------------------
  **Service**             **Plan**        **Monthly Cost   **Purpose**
                                          (AUD est.)**     
  ----------------------- --------------- ---------------- ------------------
  HubSpot Sales Hub       Pro (2 seats)   \~\$250          CRM + deal
                                                           tracking

  n8n (self-hosted)       AWS EC2         \~\$25           Agent
                          t3.small                         orchestration

  AWS Transcribe          Pay-per-use     \~\$30           Meeting
                          (\~10 hrs/mo)                    transcription

  AWS S3 + Lambda         Free tier +     \~\$10           Audio storage +
                          small usage                      processing

  Claude API              API usage       \~\$75           AI reasoning for
                          (\~200                           all agents
                          calls/mo)                        

  Phantom Buster          Starter plan    \~\$70           LinkedIn data
                                                           extraction

  Microsoft 365 Business  Standard        \~\$0 (existing) PowerPoint, Excel,
                          (existing)                       Word +
                                                           SharePoint + Graph
                                                           API

  Microsoft 365           Existing plan   \~\$0 (existing) Knowledge base,
  (SharePoint/OneDrive)                                    templates, and all
                                                           Office file
                                                           storage

  Slack                   Pro (already    \$0              Agent
                          using)                           notifications

  Domain / misc           DNS, certs,     \~\$20           Infrastructure
                          monitoring                       basics

  TOTAL                                   \~\$480/month    Full stack running
                                          AUD              
  ---------------------------------------------------------------------------

+-----------------------------------------------------------------------+
| **💡 Scaling Note**                                                   |
|                                                                       |
| At 10 enterprise clients and 50 active deals, costs will scale to     |
| approximately \$800--\$1,200/month AUD --- a tiny fraction of the ARR |
| being targeted.                                                       |
+-----------------------------------------------------------------------+

**8. Vibe-Coder Build Guide**

This section is your practical step-by-step playbook for building the
Phase 1 system using AI assistance. You don't need to write code from
scratch --- use Claude and Cursor to generate everything.

**8.1 Account Setup (Day 1)**

  ----------------------------------------------------------------------------
  **Account**        **URL**                    **Notes**
  ------------------ -------------------------- ------------------------------
  AWS (if not yet)   aws.amazon.com             Use ap-southeast-2 (Sydney)
                                                region

  n8n Cloud or       n8n.io                     Self-host on EC2 for cost
  self-host                                     savings

  Anthropic (Claude  console.anthropic.com      Generate API key, add to n8n
  API)                                          credentials

  Phantom Buster     phantombuster.com          Connect LinkedIn Sales
                                                Navigator

  HubSpot Private    app.hubspot.com/settings   Create with all CRM scopes
  App                                           enabled

  Microsoft Azure    portal.azure.com           Register app to get Graph API
  App Registration                              credentials for Office 365
                                                (PowerPoint, Excel, Word,
                                                SharePoint)
  ----------------------------------------------------------------------------

**8.2 AI-Assisted Build Prompts**

**Prompt 1: n8n Meeting Intelligence Workflow**

+-----------------------------------------------------------------------+
| **Use this prompt in Claude or Cursor:**                              |
|                                                                       |
| \"I need an n8n workflow that: (1) receives a webhook with a          |
| transcript text payload, (2) calls the Anthropic Claude API           |
| (claude-sonnet-4-20250514) with a system prompt to extract MEDDPICC   |
| signals, action items, ROI data points, pricing mentioned, and next   |
| steps as JSON, (3) parses the JSON response, (4) creates a HubSpot    |
| note with the formatted content, (5) updates HubSpot deal properties  |
| for each MEDDPICC dimension, and (6) posts a Slack message            |
| summarising the key outcomes. Show me the n8n workflow JSON I can     |
| import directly.\"                                                    |
+-----------------------------------------------------------------------+

**Prompt 2: Pre-Call Briefing Workflow**

+-----------------------------------------------------------------------+
| **Use this prompt in Claude or Cursor:**                              |
|                                                                       |
| \"Build an n8n workflow that: (1) runs every 30 minutes and queries   |
| HubSpot for meetings starting in 30 minutes, (2) for each meeting,    |
| fetches the associated deal's full history (last 3 notes, MEDDPICC    |
| scores, open tasks, deal stage), (3) sends all this context to Claude |
| API asking it to generate a pre-call briefing including: deal         |
| summary, MEDDPICC gaps, suggested questions, agenda, and any red      |
| flags, (4) posts the briefing as a formatted Slack message to the     |
| deal owner. Include error handling for missing deal associations.\"   |
+-----------------------------------------------------------------------+

**Prompt 3: HubSpot MEDDPICC Properties Setup Script**

+-----------------------------------------------------------------------+
| **Use this prompt in Claude or Cursor:**                              |
|                                                                       |
| \"Write a Node.js script that uses the HubSpot API to create 9 custom |
| deal properties: meddpicc_metrics, meddpicc_economic_buyer,           |
| meddpicc_decision_criteria, meddpicc_decision_process,                |
| meddpicc_paper_process, meddpicc_pain, meddpicc_champion,             |
| meddpicc_competition (all text type), and deal_health_score (number   |
| type, 1--10). Use the HubSpot v3 properties API. Include my API token |
| as a variable at the top.\"                                           |
+-----------------------------------------------------------------------+

**Prompt 4: Microsoft Graph API --- Office Document Auto-Updater**

+-----------------------------------------------------------------------+
| **Use this prompt in Claude or Cursor:**                              |
|                                                                       |
| \"Build an n8n workflow that: (1) receives a webhook payload          |
| containing deal_id and extracted_data (ROI figures, pricing, business |
| case points, next steps) from HubSpot, (2) uses the Microsoft Graph   |
| API to open a master PowerPoint template (.pptx) stored in            |
| SharePoint, (3) finds and replaces placeholder text tokens like       |
| {{CLIENT_NAME}}, {{ROI_FIGURE}}, {{PAIN_POINT}} with the              |
| deal-specific values, (4) saves the updated file as a new .pptx named |
| after the deal in a SharePoint folder, (5) repeats the same process   |
| for a Word (.docx) business case template and an Excel (.xlsx)        |
| pricing model, (6) posts the SharePoint file links back to the        |
| HubSpot deal as a note. Use app-only authentication with a registered |
| Azure AD app. Include all required Graph API scopes:                  |
| Files.ReadWrite.All, Sites.ReadWrite.All.\"                           |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **📋 Microsoft Graph API --- Key Setup Steps**                        |
|                                                                       |
| 1\. Register an app in Azure Portal (portal.azure.com) → Azure Active |
| Directory → App registrations. 2. Add API permissions: Microsoft      |
| Graph → Application permissions → Files.ReadWrite.All +               |
| Sites.ReadWrite.All. 3. Generate a client secret. 4. Store tenant_id, |
| client_id, and client_secret in n8n credentials. 5. Upload your       |
| master .pptx, .docx, and .xlsx templates to a SharePoint document     |
| library.                                                              |
+-----------------------------------------------------------------------+

**9. Security & Data Sensitivity**

+-----------------------------------------------------------------------+
| **🔐 Critical: Financial Institution Data**                           |
|                                                                       |
| Brontë's prospects are Tier 1 banks. Even pre-contract prospect data  |
| must be handled with care. No client business data should ever leave  |
| Brontë's controlled infrastructure.                                   |
+-----------------------------------------------------------------------+

  --------------------------------------------------------------------------------
  **Data Type**      **Sensitivity**   **Storage**       **Handling Rule**
  ------------------ ----------------- ----------------- -------------------------
  Prospect names /   Low               HubSpot + n8n     Standard access controls
  LinkedIn                                               

  Meeting            High              AWS S3            Delete after 90 days, no
  transcripts                          (encrypted)       3rd-party storage

  ROI / financials   Very High         HubSpot notes     Never pass to external AI
  discussed                            (private)         without redaction

  Client business    Critical          SharePoint        Encrypted at rest, no
  case data                            (private) + AWS   logging in Claude API
                                       S3                

  Pricing / contract High              HubSpot deals     Role-based access,
  terms                                (private)         founders only

  MEDDPICC scores    Medium            HubSpot           Internal only, not shared
                                       properties        with prospects
  --------------------------------------------------------------------------------

**Key Security Rules:**

-   All AWS S3 buckets must be private with server-side encryption
    (SSE-S3)

-   Claude API calls must never include prospect names in prompts ---
    use deal IDs

-   n8n should be behind a VPC with no public IP; use AWS SSM for access

-   HubSpot API key must be rotated quarterly and stored only in n8n
    credential vault

-   Meeting audio files must be deleted from S3 within 24 hours of
    transcription

-   SharePoint document libraries containing client data must have
    restricted access --- founders only; Azure AD app credentials stored
    in n8n credential vault only

**10. Risks & Mitigations**

  ----------------------------------------------------------------------------------------
  **Risk**              **Likelihood**   **Impact**   **Mitigation**
  --------------------- ---------------- ------------ ------------------------------------
  Audio capture app     Medium           High         Use system audio capture (not mic
  detection by meeting                                injection); test on Teams, Zoom,
  platform                                            Google Meet

  HubSpot data quality  High             Medium       Weekly n8n job to flag incomplete
  degrades without                                    deals; human review required
  clean-up                                            

  Claude API            Medium           Medium       Always show source transcript
  hallucinations in                                   snippet with score; human override
  MEDDPICC scoring                                    in HubSpot

  LinkedIn blocks       Medium           Medium       Run at low rate (\<50 profiles/day);
  Phantom Buster                                      have manual fallback workflow
  scraping                                            

  Founder dependency    High             High         Phase 1 agents take over admin load;
  not reduced fast                                    measure founder time saved monthly
  enough                                              

  Data privacy breach   Low              Critical     See Section 9 security rules;
  (prospect or client                                 incident response plan in SharePoint
  data)                                               

  n8n self-hosted       Low              High         AWS EC2 auto-recovery; weekly backup
  server goes down                                    of n8n workflows to S3
  ----------------------------------------------------------------------------------------

**11. Definition of Success**

  -----------------------------------------------------------------------
  **Metric**                 **Target**        **Measured By**
  -------------------------- ----------------- --------------------------
  Founder time on admin /    Reduce by 80%     HubSpot activity log ---
  CRM updates                                  human vs agent

  Deal notes captured        100% of meetings  HubSpot notes count vs
  post-meeting                                 meetings count

  MEDDPICC score populated   \>90% of deals    HubSpot property
  per active deal                              completeness report

  Pre-call briefs delivered  \>95% of          Slack message delivery log
  on time                    scheduled calls   in n8n

  Average time to update ROI \<2 hours (from   Timestamp comparison in
  model post-call            days)             HubSpot

  New ICP contacts added per \>10 qualified    HubSpot contact source
  week via crawler                             tracking

  Deals progressed to next   Increase by 30%   HubSpot pipeline velocity
  stage within 2 weeks                         report
  -----------------------------------------------------------------------

**12. Immediate Next Steps**

  ------------------------------------------------------------------------
  **Week**   **Action**            **Owner**        **Done When**
  ---------- --------------------- ---------------- ----------------------
  Week 1     Set up HubSpot        Founder /        API token working,
  (now)      Private App + all     GPT-assisted     properties visible in
             MEDDPICC properties                    deal

  Week 1     Deploy n8n on AWS     Vibe-coder +     n8n can create a test
             EC2, connect to       Cursor           deal in HubSpot
             HubSpot                                

  Week 1     Configure Phantom     GTM team         10 ICP profiles
             Buster LinkedIn       (Colombo)        exported to HubSpot
             scraper                                

  Week 2     Build meeting         Vibe-coder +     Test call transcript
             transcript agent in   Claude prompts   creates HubSpot note
             n8n                   in this doc      

  Week 2     Build pre-call        Vibe-coder +     Brief arrives in Slack
             briefing agent        Claude           30 mins before test
                                                    meeting

  Week 3     Test all Phase 1      Founders         All outputs reviewed
             agents on a real                       and HubSpot updated
             sales call                             correctly

  Week 4     Fix issues, document  All team         Phase 1 sign-off
             agent behaviours in                    complete by 31 March
             SharePoint                             
  ------------------------------------------------------------------------

Brontë --- AI-Native Sales System TDD v1.0

Confidential --- Internal Use Only --- March 2025
