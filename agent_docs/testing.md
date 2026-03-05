# Testing Strategy

## Frameworks
- **Workflow Testing:** Manual testing via n8n workflow executions with test data
- **Script Unit Tests:** Node.js test runner (`node --test`) or Jest for utility scripts
- **API Integration Tests:** Postman collections or n8n test workflows for each integration
- **End-to-End Tests:** Simulated deal lifecycle through the full agent mesh

## Rules & Requirements
- **Before Commit:** Always test the n8n workflow with sample data before marking complete
- **Failures:** NEVER skip tests or disable error handling to make a workflow pass. If an Agent breaks a workflow, the Agent must fix it.
- **Accuracy Targets:**
  - Transcript extraction accuracy: >90% on key entities
  - MEDDPICC scoring: validated against manually scored baseline
  - Pre-call brief delivery: >95% of scheduled calls
  - HubSpot sync latency: <30 seconds from trigger event

## Verification Procedures by Agent

### F-01: HubSpot Integration
- [ ] Create a test deal via API — verify it appears in HubSpot
- [ ] Update deal properties via API — verify changes reflected
- [ ] Create contact, task, note, meeting via API — verify all
- [ ] Verify latency <30 seconds from trigger to HubSpot update

### F-02: LinkedIn ICP Scraper
- [ ] Run Phantom Buster on 5 known ICP contacts — verify data extracted
- [ ] Verify contacts created in HubSpot with correct field mappings
- [ ] Confirm rate limiting (<50 profiles/day)

### F-03: MEDDPICC Scoring
- [ ] Feed test deal data to Claude API — verify JSON response structure
- [ ] Verify all 8 MEDDPICC dimensions scored (1-5 or text)
- [ ] Verify scores written to HubSpot custom properties
- [ ] Compare agent scores against 3 manually scored deals

### F-04: Meeting Note-Taking
- [ ] Record a test call (system audio capture)
- [ ] Verify audio uploaded to S3 in 30-second chunks
- [ ] Verify AWS Transcribe generates transcript within 5 minutes
- [ ] Verify Claude extracts: action items, MEDDPICC signals, ROI data, pricing, next steps
- [ ] Verify extracted data written to HubSpot as notes + deal property updates

### F-05: Pre-Call Briefing
- [ ] Create test meeting in HubSpot with deal association
- [ ] Verify briefing generated 30 minutes before meeting
- [ ] Verify brief includes: deal summary, MEDDPICC gaps, open actions, suggested agenda
- [ ] Verify delivery via Slack DM (or email as interim)

### F-06: ROI / Business Case Updater
- [ ] Feed test meeting notes with ROI data points
- [ ] Verify Microsoft Graph API updates the correct template
- [ ] Verify versioned document saved to SharePoint
- [ ] Verify SharePoint link posted to HubSpot deal as note

### F-07: Follow-Up Cadence Agent
- [ ] Create deal with no activity for X days
- [ ] Verify agent detects and generates follow-up strategy
- [ ] Verify HubSpot task created + Slack/email notification sent
- [ ] Verify different cadence logic per funnel stage

## Manual Checks (Pre-Launch)
- [ ] Transcription accuracy validated on minimum 5 test calls (>90%)
- [ ] MEDDPICC scoring validated against manually scored baseline
- [ ] All HubSpot field mappings verified by sales team
- [ ] Privacy consent framework reviewed by legal
- [ ] Security review of audio pipeline (S3 encryption, access controls)

## Execution
- n8n workflow test: Open workflow in n8n editor > click "Execute Workflow" with test input
- Script tests: `npm test` or `node --test scripts/`
- Full integration test: Run the complete deal lifecycle simulation workflow
