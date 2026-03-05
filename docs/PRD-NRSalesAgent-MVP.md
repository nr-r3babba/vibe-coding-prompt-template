+-----------------------------------------------------------------------+
| **BRONTË**                                                            |
|                                                                       |
| *AI-Native Risk Platform*                                             |
|                                                                       |
| **Product Requirements Document**                                     |
|                                                                       |
| AI Sales Agent MVP                                                    |
|                                                                       |
| Version 1.0 \| March 2026 \| CONFIDENTIAL                             |
+-----------------------------------------------------------------------+

  ---------------- ------------------------------------------------------
  **Product**      AI Sales Agent --- End-to-End GTM Automation

  **Version**      MVP (v1.0)

  **Status**       Draft --- Awaiting Approval

  **Owner**        Brontë Founding Team

  **Target         Tier 1 Financial Institutions --- AU, NZ, SG
  Market**         

  **Launch         31 March 2026
  Target**         

  **ARR Goal**     \$10M ARR within 9 months (9 new logos)
  ---------------- ------------------------------------------------------

**1. Executive Summary**

Brontë is an AI-native risk platform serving Tier 1 financial
institutions across Australia, New Zealand and Singapore. With one
enterprise client at \$1M ARR, Brontë is targeting \$10M ARR within 9
months --- requiring 9 new logos. The primary growth constraint is not
product quality, but sales execution capacity.

+-----------------------------------------------------------------------+
| **Strategic Context**                                                 |
|                                                                       |
| Brontë has declared an AI-native mandate across all functions. This   |
| PRD defines the MVP for the AI Sales Agent --- a suite of intelligent |
| agents that automate top, middle, and bottom-of-funnel activities,    |
| dramatically reducing dependency on the founding team while           |
| increasing pipeline velocity and deal quality.                        |
+-----------------------------------------------------------------------+

The AI Sales Agent MVP targets three core pain points:

-   Top of funnel: Insufficient warm leads and inconsistent
    qualification

-   Middle of funnel: Deal history loss, slow PoC/ROI generation,
    fragmented ownership

-   Bottom of funnel: Prospect ghosting and failed procurement
    negotiations

**2. Problem Statement**

**2.1 Business Context**

Brontë operates in the complex B2B enterprise sales space, targeting
Tier 1 banks and financial institutions. These deals are characterised
by long cycles (12--18 months), multiple stakeholders, strict compliance
requirements, and high-value contracts. The current sales motion is
heavily founder-dependent, creating a dangerous bottleneck.

**2.2 Current Pain Points by Funnel Stage**

**Top of Funnel**

  -----------------------------------------------------------------------
  **Pain Point**        **Business Impact**
  --------------------- -------------------------------------------------
  Not enough warm leads Pipeline is too thin to hit 9-logo target in 9
  being generated       months

  No systematic         Time wasted on low-probability prospects
  MEDDPICC              
  qualification         

  Demo/teaser pitch not Inconsistent quality; only founders can deliver
  codified              effectively
  -----------------------------------------------------------------------

**Middle of Funnel**

  -----------------------------------------------------------------------
  **Pain Point**        **Business Impact**
  --------------------- -------------------------------------------------
  Deal history lost --- Context lost between meetings; relationships
  no structured         stall
  note-taking in calls  

  PoC generation takes  Prospects lose momentum; deals go cold
  months (data          
  sensitivity blocks)   

  ROI/benefits          Decision-makers can\'t build internal business
  calculations delayed  case
  months                

  Manual deck updates   Founders spend hours on admin instead of selling
  per client            

  No centralised        Version conflicts; pricing inconsistency across
  quote/pricing         deals
  tracking              

  Fragmented deal       Accountability gaps; prospects fall through
  ownership across      cracks
  founders, partners,   
  GTM                   
  -----------------------------------------------------------------------

**Bottom of Funnel**

  -----------------------------------------------------------------------
  **Pain Point**        **Business Impact**
  --------------------- -------------------------------------------------
  Prospects ghost after Lost deals at final stage --- highest cost
  receiving service     failure point
  agreements            

  Procurement           Contracts stall; revenue delayed or lost
  negotiations failing  
  -----------------------------------------------------------------------

**2.3 Root Cause Analysis**

+-----------------------------------------------------------------------+
| **Core Dependency Risk**                                              |
|                                                                       |
| Brontë\'s growth is critically dependent on one founder to lead and   |
| advance sales conversations. With a total internal team of 4 people   |
| (2 founders in Sydney, GTM team in Colombo, independent sales         |
| partners in SG/NZ/AU), there is insufficient human capacity to run 9  |
| parallel enterprise deals without AI augmentation.                    |
+-----------------------------------------------------------------------+

**3. Target State & Product Vision**

The AI Sales Agent MVP will transform Brontë\'s GTM operation into an
AI-orchestrated system where agents handle 80% of execution tasks,
freeing humans to focus exclusively on relationship-building and
strategic decision-making.

+-----------------------------------------------------------------------+
| **Vision Statement**                                                  |
|                                                                       |
| By 31 March 2026, every sales activity at Brontë --- from prospect    |
| discovery to contract negotiation --- will be supported by AI agents  |
| that capture context, surface intelligence, update systems, and       |
| prompt humans at precisely the right moments.                         |
+-----------------------------------------------------------------------+

**3.1 Target State by Funnel Stage**

**Top of Funnel --- Intelligent Prospect Discovery**

-   AI agents scrape LinkedIn to map ICPs and trace network paths to
    founders/sales partners

-   Automated MEDDPICC scoring calculated in real-time for each prospect

-   Highest-probability prospects auto-created as deals in HubSpot with
    recommended champions

**Middle of Funnel --- Intelligent Deal Management**

-   Hidden note-taking agents listen to all sales meetings and
    auto-update HubSpot (deals, tasks, notes, meetings)

-   Pre-call briefing agents surface agenda, deal history, and
    priorities before each meeting

-   Agents automatically extract ROI data, business case inputs, and
    pricing signals from call notes

-   Pitch decks, ROI models, and business cases auto-updated based on
    deal history

**Bottom of Funnel --- Intelligent Deal Progression**

-   Automated follow-up reminders with customised strategy and cadence
    per deal stage

-   Negotiation briefings prepared before each procurement call based on
    full deal history

-   Contract re-engagement sequences triggered when prospects go quiet

**4. Target Users**

**4.1 Internal Users (Agent Consumers)**

  -----------------------------------------------------------------------
  **Persona**        **Role**           **Primary Need**
  ------------------ ------------------ ---------------------------------
  The Founder /      Based in Sydney.   Pre-call briefs, post-call
  Sales Lead         Leads all          automation, deal intelligence ---
                     enterprise         so they can focus 100% on
                     conversations.     relationships
                     Primary            
                     bottleneck.        

  GTM Team Member    Based in Colombo.  Automated collateral updates,
                     Manages            deck generation, meeting
                     collateral,        logistics --- reduce manual admin
                     logistics, project 
                     management.        

  Sales Partner      Independent. Based Lead qualification scores, deal
                     in SG, NZ, AU.     context on-demand, negotiation
                     Sourcing leads and prep materials
                     supporting deals.  
  -----------------------------------------------------------------------

**4.2 External Beneficiaries (Indirect)**

  -----------------------------------------------------------------------
  **Stakeholder**       **Value Received**
  --------------------- -------------------------------------------------
  Tier 1 Bank /         More personalised, informed conversations; faster
  Prospect              PoC and ROI delivery

  Procurement Teams     Well-prepared counterparts; faster negotiation
                        resolution
  -----------------------------------------------------------------------

**5. MVP Feature Requirements**

**5.1 Feature Overview --- MoSCoW Prioritisation**

  ---------------------------------------------------------------------------
  **Feature**           **Priority**   **Funnel        **Agent Type**
                                       Stage**         
  --------------------- -------------- --------------- ----------------------
  HubSpot Full Agent    Must Have      All Stages      Automation
  Integration                                          

  LinkedIn ICP Scraper  Must Have      Top of Funnel   Web Crawler
  & Network Mapper                                     

  Automated MEDDPICC    Must Have      Top of Funnel   Scoring Agent
  Scoring                                              

  Hidden Meeting        Must Have      Middle of       Listener Agent
  Note-Taking Agent                    Funnel          

  Pre-Call Briefing     Must Have      Middle of       Intelligence Agent
  Agent                                Funnel          

  ROI / Business Case   Must Have      Middle of       Document Agent
  Auto-Updater                         Funnel          

  Pitch Deck            Should Have    Middle of       Document Agent
  Auto-Personaliser                    Funnel          

  Pricing / Quote       Should Have    Middle of       Tracking Agent
  Tracker                              Funnel          

  Follow-Up Cadence &   Must Have      Bottom of       Outreach Agent
  Strategy Agent                       Funnel          

  Negotiation Strategy  Should Have    Bottom of       Intelligence Agent
  Briefer                              Funnel          

  Automated PoC         Could Have     Middle of       Generation Agent
  Generator                            Funnel          
  ---------------------------------------------------------------------------

**5.2 Feature Specifications --- Must Have**

**F-01: HubSpot Full Agent Integration**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           Bi-directional agent access to HubSpot CRM ---
                        read and write deals, contacts, meetings, tasks,
                        notes, pipelines

  User Story            As a sales team member, I want all deal activity
                        auto-synced to HubSpot so I never lose context
                        between meetings

  Acceptance Criteria   Agents can create/update deals, contacts, tasks,
                        meetings and notes via HubSpot API; all data
                        changes are auditable; latency \<30 seconds from
                        trigger event

  Dependencies          HubSpot API access; OAuth authentication; defined
                        field mapping schema

  Priority              P0 --- foundational for all other features
  -----------------------------------------------------------------------

**F-02: LinkedIn ICP Scraper & Network Mapper**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           Web crawler agent maps target ICPs (Tier 1 bank
                        roles in AU/NZ/SG) on LinkedIn and traces network
                        paths to Brontë founders and sales partners

  User Story            As a founder, I want to know who our ICPs are and
                        how we are connected to them so I can leverage
                        warm introductions

  Acceptance Criteria   Agent identifies contacts matching ICP criteria;
                        maps shortest network path to Brontë team;
                        outputs structured list with connection degree;
                        respects LinkedIn ToS and rate limits

  Dependencies          LinkedIn data access (Sales Navigator API or
                        compliant scraping); network graph data structure

  Priority              P0 --- critical for top-of-funnel lead generation
  -----------------------------------------------------------------------

**F-03: Automated MEDDPICC Scoring**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           For each prospect, agent calculates a real-time
                        MEDDPICC score (Metrics, Economic Buyer, Decision
                        Criteria, Decision Process, Identify Pain,
                        Champion, Competition) based on available data

  User Story            As a sales lead, I want each prospect to have a
                        MEDDPICC score so I can prioritise which deals to
                        pursue and where to focus effort

  Acceptance Criteria   Score calculated automatically on deal creation;
                        score updates as deal progresses; score breakdown
                        visible per dimension; top-scored deals surfaced
                        as priority actions in HubSpot

  Dependencies          HubSpot integration (F-01); deal data from
                        meeting notes; LinkedIn data (F-02)

  Priority              P0 --- core to qualification discipline
  -----------------------------------------------------------------------

**F-04: Hidden Meeting Note-Taking Agent**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           An audio-based listener agent (non-visible, no
                        meeting login required) captures and transcribes
                        sales calls, extracts key entities (decisions,
                        actions, blockers, ROI signals), and auto-updates
                        HubSpot

  User Story            As a founder, I want call notes automatically
                        captured and synced to HubSpot so I can focus on
                        the conversation without worrying about
                        documentation

  Acceptance Criteria   Agent listens without joining meeting visibly;
                        transcript generated within 5 minutes post-call;
                        entities extracted and mapped to HubSpot fields;
                        accuracy \>90% on key extractions; GDPR/Privacy
                        Act compliant

  Dependencies          Audio access (system audio capture or dial-in);
                        transcription service (e.g. Whisper); NLP entity
                        extraction; HubSpot integration (F-01)

  Priority              P0 --- solves the most critical middle-funnel
                        pain point
  -----------------------------------------------------------------------

**F-05: Pre-Call Briefing Agent**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           Before each scheduled sales meeting, agent
                        compiles and delivers a briefing to the relevant
                        sales owner: deal history, open actions, prospect
                        priorities, suggested agenda, and MEDDPICC gaps
                        to address

  User Story            As a sales partner, I want a pre-call brief
                        delivered automatically before each meeting so I
                        walk in fully prepared without spending time on
                        research

  Acceptance Criteria   Brief delivered 30 minutes before meeting start;
                        includes deal summary, last meeting outcomes,
                        open actions, MEDDPICC status, and 3 suggested
                        talking points; delivered via email and/or Slack

  Dependencies          HubSpot integration (F-01); MEDDPICC scores
                        (F-03); calendar integration (Google Calendar or
                        Outlook)

  Priority              P0 --- directly reduces founder prep burden
  -----------------------------------------------------------------------

**F-06: ROI / Business Case Auto-Updater**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           Agent monitors meeting notes and HubSpot for ROI
                        signals, business case inputs, and pricing
                        discussions, then automatically updates the ROI
                        model, business case template, and pricing sheet
                        for that deal

  User Story            As a GTM team member, I want ROI models and
                        business cases to update automatically from call
                        notes so I do not spend hours manually
                        reformatting after each meeting

  Acceptance Criteria   Relevant data points extracted from notes within
                        10 minutes of sync; ROI model and business case
                        document updated with versioning; changes flagged
                        for human review before client sharing; supports
                        Excel and Google Sheets formats

  Dependencies          Meeting note agent (F-04); HubSpot integration
                        (F-01); document templates in defined structure

  Priority              P0 --- critical to accelerating PoC and ROI
                        delivery timeline
  -----------------------------------------------------------------------

**F-07: Follow-Up Cadence & Strategy Agent**

  -----------------------------------------------------------------------
  **Attribute**         **Detail**
  --------------------- -------------------------------------------------
  Description           Agent monitors deal stage and time since last
                        activity, then generates and delivers customised
                        follow-up strategies and reminders to the
                        relevant sales owner, including suggested
                        messaging and timing

  User Story            As a sales partner, I want to be prompted when
                        deals go quiet with a suggested re-engagement
                        strategy so no prospect slips through the cracks

  Acceptance Criteria   Agent detects deals with no activity for X days
                        (configurable by stage); generates context-aware
                        follow-up message draft; delivers via HubSpot
                        task + Slack/email; different cadence logic per
                        funnel stage

  Dependencies          HubSpot integration (F-01); deal stage
                        definitions; Slack and/or email delivery

  Priority              P0 --- directly addresses bottom-of-funnel
                        ghosting problem
  -----------------------------------------------------------------------

**6. Out of Scope --- MVP**

  -----------------------------------------------------------------------
  **Feature**           **Rationale / Planned For**
  --------------------- -------------------------------------------------
  Automated PoC         Requires client data sharing agreements first;
  Generator (F-08)      planned for v1.1 post-MVP

  Pitch Deck            Dependent on stable ROI/BC updater (F-06); v1.1
  Auto-Personaliser     

  Pricing / Quote       Complexity high; manual tracking acceptable for
  Tracker               MVP; v1.1

  Negotiation Strategy  Builds on pre-call agent (F-05); v1.1 once
  Briefer               pattern validated

  Autonomous Outreach / Requires stricter controls and legal review; post
  Email Sending         v1.0

  Public-facing agent   Internal use only for MVP
  capabilities          
  -----------------------------------------------------------------------

**7. Success Metrics**

**7.1 North Star Metric**

+-----------------------------------------------------------------------+
| **Primary Goal**                                                      |
|                                                                       |
| 9 new enterprise logos closed within 9 months of MVP launch,          |
| contributing to \$10M ARR target.                                     |
+-----------------------------------------------------------------------+

**7.2 Leading Indicators (30-day post-launch)**

  ------------------------------------------------------------------------
  **Metric**          **Baseline**   **Target**    **Measurement**
  ------------------- -------------- ------------- -----------------------
  Qualified leads     \~2 (manual)   10+           HubSpot pipeline
  added to HubSpot                                 
  per week                                         

  MEDDPICC score      0%             100%          HubSpot custom field
  coverage (% of                                   
  deals scored)                                    

  Post-call note sync \~0%           95%+          HubSpot meeting records
  rate                (informal)                   

  Pre-call briefing   0%             100% of       Agent delivery logs
  delivery rate                      scheduled     
                                     calls         

  ROI model update    Weeks          \< 24 hours   Document version
  turnaround                         from call     timestamps
  ------------------------------------------------------------------------

**7.3 Lagging Indicators (90-day)**

  ------------------------------------------------------------------------
  **Metric**          **Baseline**   **Target**    **Measurement**
  ------------------- -------------- ------------- -----------------------
  Deals advanced per  \~2            8+            HubSpot stage tracking
  month (stage                                     
  progression)                                     

  Average PoC/ROI     3-4 months     \< 4 weeks    Deal timeline
  delivery time                                    

  Founder time on     \~15 hrs       \< 3 hrs      Time tracking
  admin tasks                                      
  (hrs/week)                                       

  Deal ghosting rate  High (unknown) \< 20%        HubSpot deal outcomes
  (post-proposal)                                  

  New logos closed    0 (new)        9             Closed-won deals
  (9-month)                                        
  ------------------------------------------------------------------------

**8. Non-Functional Requirements**

  ------------------------------------------------------------------------
  **Category**    **Requirement**                   **Standard**
  --------------- --------------------------------- ----------------------
  Security        All client and prospect data      AES-256; TLS 1.3
                  encrypted at rest and in transit  

  Privacy         Meeting recording/transcription   Consent framework
                  compliant with Australian Privacy required
                  Act 1988 and Singapore PDPA       

  Data Residency  Australian client data must       AWS ap-southeast-2
                  remain in AU-hosted               preferred
                  infrastructure                    

  Availability    Core agent workflows available    99.5% uptime SLA
                  during AEST business hours        
                  minimum                           

  Latency         HubSpot sync \<30s; Pre-call      P95 targets
                  brief \<2 min generation;         
                  Transcript available \<5 min      
                  post-call                         

  Scalability     Support up to 50 concurrent       Auto-scaling infra
                  active deals without degradation  

  Auditability    All agent actions logged with     Full audit trail in
                  timestamps, inputs, and outputs   structured log store

  Access Control  Role-based access: founders, GTM  RBAC enforced
                  team, sales partners have         
                  appropriate permission levels     

  Integration     HubSpot, Google Calendar /        API-first architecture
                  Outlook, Slack / Email, LinkedIn  
  ------------------------------------------------------------------------

**9. Assumptions & Dependencies**

**9.1 Key Assumptions**

-   LinkedIn data access will be via a third-party data provider or API
    (e.g. Proxycurl, Apollo, or similar) --- NOT LinkedIn Sales
    Navigator or direct scraping

-   HubSpot Free CRM plan is sufficient for the MVP architecture. All
    agent interactions will use outbound API calls (agents push/pull
    data to/from HubSpot via external code). HubSpot-native automation
    features (Workflows, native Webhooks, Custom Code Actions) will NOT
    be used --- these require Professional/Enterprise plans and are not
    needed for this approach.

-   All event-driven triggers (e.g. post-call note sync, pre-call brief
    dispatch) will be orchestrated by the external agent layer, not by
    HubSpot-native workflows

-   Legal review of meeting transcription under the Privacy Act 1988
    (AU) and Singapore PDPA will be conducted in parallel with the Phase
    2 build --- not as a prerequisite. The note-taking agent will not be
    deployed to production until legal sign-off is obtained, but build
    proceeds now.

-   Interim consent approach: AI-assisted note-taking will be disclosed
    in meeting invites from day one of testing

-   Sales team will commit to using HubSpot as the single source of
    truth for deals from day one of agent deployment

-   Document templates (ROI model, business case, pitch deck) are
    confirmed available in machine-readable format and will be handed
    over to the build team before Phase 2

-   neo4j is confirmed as the graph database for LinkedIn network
    mapping; partnership is in place

-   Escalation rules: agents will ALWAYS alert a human before (a) any
    action that involves communicating directly with an external
    prospect or contact, and (b) any deletion of data. All other
    autonomous actions are permitted within defined workflows

-   Slack workspace and channel targets for agent notifications are TBD
    --- interim delivery via email until confirmed

**9.2 External Dependencies**

  -----------------------------------------------------------------------
  **Dependency**        **Status / Risk**
  --------------------- -------------------------------------------------
  HubSpot Free CRM ---  CONFIRMED available on Free plan. Sufficient for
  Outbound API          MVP agent architecture: agents push/pull data
  (read/write via       programmatically. No HubSpot-native workflow
  external code)        triggers required.

  Third-party LinkedIn  CONFIRMED approach --- vendor selection required.
  data provider (e.g.   Medium risk: data freshness and coverage for
  Proxycurl, Apollo,    AU/NZ/SG financial sector contacts needs
  Lusha)                validation

  neo4j graph database  CONFIRMED --- partnership in place. Low risk
  for network mapping   

  Audio transcription   Not yet selected --- Low risk; multiple mature
  service (e.g. OpenAI  vendors available
  Whisper, AssemblyAI)  

  Calendar integration  Not yet configured --- Low risk
  (Google Calendar or   
  Outlook)              

  AWS infrastructure    Standard setup --- Low risk
  (ap-southeast-2 for   
  AU data residency)    

  Legal review: Privacy Decision: proceed with build in parallel with
  Act 1988 (AU) + PDPA  legal review. Legal sign-off required before
  (SG) for meeting      production deployment of note-taking agent.
  transcription         

  Slack workspace and   TBD --- interim: email delivery
  channel configuration 
  for agent             
  notifications         

  Document templates in CONFIRMED available --- handover to build team
  machine-readable      required by 14 Mar
  format                

  NDA / Data sharing    Ongoing --- blocks PoC generation until in place
  agreements with       
  prospects             
  -----------------------------------------------------------------------

**9.3 Escalation Rules**

+-----------------------------------------------------------------------+
| **Agent Autonomy Policy**                                             |
|                                                                       |
| Agents operate autonomously for all internal data capture, synthesis, |
| and update tasks. Agents MUST escalate to a human owner before: (1)   |
| any direct communication with an external prospect or contact, and    |
| (2) any deletion of records or data. This policy applies across all   |
| agent types in the MVP.                                               |
+-----------------------------------------------------------------------+

**9.4 Risk Register**

  ------------------------------------------------------------------------------------
  **Risk**           **Probability**   **Impact**   **Mitigation**
  ------------------ ----------------- ------------ ----------------------------------
  HubSpot Free plan  KNOWN ---         Low --- by   MVP architecture uses
  missing            confirmed         design       outbound-only API calls from
  inbound/native     constraint                     external agent layer.
  automation                                        HubSpot-native automation is
  (Workflows,                                       explicitly out of scope. No
  Webhooks, Custom                                  upgrade required for MVP.
  Code)                                             

  Legal review not   Medium            High         Build proceeds in parallel with
  completed before                                  legal review. Agent is NOT
  note-taking agent                                 deployed to production until
  goes to production                                sign-off received. Disclosed in
                                                    all test meeting invites from day
                                                    one.

  Third-party        Medium            High         Run data quality test against
  LinkedIn data                                     known ICP contacts before
  provider has poor                                 committing to a provider; maintain
  AU/NZ/SG financial                                a shortlist of backup providers
  sector coverage                                   

  Founder            Medium            High         Parallel-track build with ongoing
  unavailable for                                   sales; pre-call briefer (F-05)
  key deals during                                  prioritised first as fastest ROI
  build phase                                       for founder time

  HubSpot CRM data   High --- no prior Medium       Manual data entry sprint for all
  sparse ---         API history                    active deals before agent
  insufficient for                                  deployment; define minimum
  MEDDPICC scoring                                  required fields per deal
  on day one                                        

  Slack channel      High --- TBD      Low          Email delivery for all
  targets undefined                    (interim)    notifications until Slack
  --- agent                                         confirmed; no impact on core agent
  notifications have                                functionality
  no delivery path                                  

  neo4j integration  Low ---           Medium       Early schema design spike in Phase
  complexity delays  partnership                    0; fallback to simple adjacency
  LinkedIn network   confirmed                      list if graph query is delayed
  mapper beyond                                     
  Phase 1                                           
  ------------------------------------------------------------------------------------

**10. Proposed Roadmap**

**10.1 Phased Delivery --- Aligned to AI-Native Programme**

  ----------------------------------------------------------------------------
  **Phase**     **Timeline**   **Deliverables**            **Gate Criteria**
  ------------- -------------- --------------------------- -------------------
  Phase 0:      9--14 Mar      HubSpot API integration     HubSpot read/write
  Foundations                  (F-01); CRM schema design;  confirmed; deal
                               agent infrastructure setup  schema approved

  Phase 1: Top  14--21 Mar     LinkedIn ICP mapper (F-02); First 10 prospects
  of Funnel                    MEDDPICC scoring engine     scored and added to
                               (F-03); deals auto-created  CRM
                               in HubSpot                  

  Phase 2:      21--28 Mar     Hidden meeting note agent   First live call
  Middle of                    (F-04); pre-call briefer    processed; brief
  Funnel                       (F-05); ROI/BC updater      delivered; HubSpot
                               (F-06)                      updated

  Phase 3:      28--31 Mar     Follow-up cadence agent     Full pipeline
  Bottom of                    (F-07); end-to-end workflow workflow validated
  Funnel                       testing; team onboarding    with real deals

  Phase 4: Go   1 Apr          All new team members        All active deals
  Live                         onboarded into AI-native    managed via agents
                               model; legacy manual        
                               tracking decommissioned     

  Phase 5: v1.1 Apr--Jun       Pitch deck personaliser;    MVP metrics targets
  Features                     pricing tracker;            met; v1.0 stable
                               negotiation briefer;        
                               automated PoC generator     
  ----------------------------------------------------------------------------

**11. MVP Definition of Done**

**11.1 Feature Complete**

-   All P0 features (F-01 through F-07) implemented and tested

-   HubSpot reflects real deal activity within 30 seconds of trigger
    events

-   Every scheduled sales call receives a pre-call brief

-   Every completed call generates structured notes in HubSpot

-   MEDDPICC scores visible on all active deals

**11.2 Quality Assurance**

-   Transcription accuracy validated on minimum 5 test calls (\>90%
    accuracy target)

-   MEDDPICC scoring validated against manually scored baseline set

-   All HubSpot field mappings verified by sales team

-   Privacy and consent framework reviewed by legal

-   Security penetration test on note-taking agent audio pipeline

**11.3 Operational Readiness**

-   Full team (founders, GTM, partners) onboarded and trained on
    AI-native workflow

-   Monitoring and alerting configured for all agent workflows

-   Rollback procedures documented for each agent

-   Data residency verified for Australian client data

**11.4 Launch Checklist**

  -----------------------------------------------------------------------
  **Item**              **Status**
  --------------------- -------------------------------------------------
  HubSpot CRM fully     To Do
  configured and agents 
  connected             

  LinkedIn ICP scraper  To Do
  live and rate-limited 

  First 10              To Do
  MEDDPICC-scored       
  prospects in pipeline 

  Note-taking agent     To Do
  tested on 3+ live     
  calls                 

  Pre-call brief        To Do
  template reviewed by  
  founder               

  ROI model template    To Do
  structured and        
  agent-ready           

  Privacy consent       To Do
  language added to     
  meeting invites       

  All team members      To Do
  using HubSpot as      
  single source of      
  truth                 

  Follow-up cadence     To Do
  rules defined per     
  deal stage            

  Monitoring dashboards To Do
  live in production    
  -----------------------------------------------------------------------

**12. Open Questions**

**12.1 Resolved**

  -----------------------------------------------------------------------------
  **Question**       **Answer**               **Impact**           **Status**
  ------------------ ------------------------ -------------------- ------------
  LinkedIn data      Third-party data         Vendor selection     RESOLVED
  access method?     provider/API (e.g.       required; no ToS     
                     Proxycurl, Apollo)       risk from direct     
                                              scraping             

  Are document       Yes --- confirmed        Handover to build    RESOLVED
  templates          available                team by 14 Mar       
  available in                                                     
  machine-readable                                                 
  format?                                                          

  Escalation rules   Escalate before: (1) any Built into all agent RESOLVED
  for agent          external human           workflow             
  autonomy?          interaction, (2) any     specifications       
                     data deletion                                 

  Will neo4j be used Yes --- partnership      Schema design begins RESOLVED
  for LinkedIn       confirmed                in Phase 0           
  network graph?                                                   

  Does HubSpot Free  Yes --- outbound API     No upgrade needed.   RESOLVED
  plan support agent (read/write via external All automation is    
  integration?       code) available on Free  agent-orchestrated   
                     plan. HubSpot-native     externally.          
                     Workflows, Webhooks and                       
                     Custom Code Actions are                       
                     NOT required and NOT                          
                     used in MVP                                   
                     architecture.                                 

  Legal review of AU No --- build proceeds in Phase 2 build        RESOLVED
  Privacy Act + PDPA parallel with legal      unblocked.           
  --- blocker for    review. Note-taking      Production           
  build?             agent will not go to     deployment gated on  
                     production until         legal clearance.     
                     sign-off received.                            
                     Consent disclosure added                      
                     to all test meeting                           
                     invites immediately.                          
  -----------------------------------------------------------------------------

**12.2 Outstanding --- Action Required**

  --------------------------------------------------------------------------
  **Question**             **Owner**    **Required   **Blocker For**
                                        By**         
  ------------------------ ------------ ------------ -----------------------
  Which third-party        GTM Team /   14 Mar 2026  LinkedIn ICP mapper
  LinkedIn data provider   Founder                   (F-02) and MEDDPICC
  to contract with? Run                              scorer (F-03)
  data quality test for                              
  AU/NZ/SG financial                                 
  sector coverage first.                             
  (Proxycurl, Apollo,                                
  Lusha shortlist)                                   

  Slack workspace and      GTM Team     Before Phase Pre-call briefer (F-05)
  channel targets for                   2 (21 Mar)   and follow-up agent
  agent notifications                                (F-07) --- interim
                                                     email delivery in
                                                     place, no hard blocker
  --------------------------------------------------------------------------

+-----------------------------------------------------------------------+
| **Next Step**                                                         |
|                                                                       |
| All critical blockers are resolved. Build can begin 9 March as        |
| planned. Approve this PRD to proceed to the Technical Design Document |
| --- covering agent framework selection, HubSpot outbound API          |
| integration patterns, neo4j schema design, and infrastructure         |
| architecture.                                                         |
+-----------------------------------------------------------------------+
