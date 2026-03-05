# Tech Stack & Tools

## Core Infrastructure
- **Orchestration:** n8n (self-hosted on AWS EC2 t3.small, ~$25/month)
  - Self-hosted for cost savings and data control
  - All agent workflows run here — n8n is the central nervous system
  - HubSpot Private App token stored as n8n credential (never in workflow JSON)
  - All workflow errors trigger Slack alert to ops channel
  - Execution logs retained 30 days
- **AI Reasoning:** Claude API (`claude-sonnet-4-20250514`, ~$75/month for ~200 calls/month)
  - Powers: MEDDPICC scoring, transcript analysis, briefing generation, ROI extraction, follow-up strategy, ICP scoring
  - Never include prospect names in prompts — use deal IDs
- **CRM:** HubSpot (Free CRM plan with outbound API access)
  - Single source of truth for all deal data
  - Private App with scopes: `crm.objects.all`, `timeline`, `forms`
  - 8 MEDDPICC custom deal properties + `deal_health_score`
- **Cloud:** AWS (ap-southeast-2 Sydney region for AU data residency)
  - EC2 t3.small for n8n (~$25/month)
  - S3 for audio storage (encrypted, SSE-S3, private buckets)
  - Lambda for audio processing triggers
  - Transcribe for meeting transcription (~$30/month for ~10hrs)

## Integration Layer
- **Meeting Intelligence:** AWS Transcribe + Lambda
  - System audio capture via desktop app (Electron or Python script)
  - Audio streamed in 30-second chunks to S3
  - Lambda triggers Transcribe on each chunk
  - Transcripts assembled and sent to Claude API for analysis
- **Document Generation:** Microsoft Graph API (Office 365)
  - Auto-update .pptx pitch decks, .xlsx pricing models, .docx business cases
  - Templates stored in SharePoint/OneDrive
  - Azure AD app registration required (Files.ReadWrite.All + Sites.ReadWrite.All scopes)
- **LinkedIn Prospecting:** Phantom Buster (~$70/month Starter plan)
  - LinkedIn Sales Navigator integration
  - Rate limited to <50 profiles/day
  - Outputs fed into n8n for HubSpot enrichment
- **Communication:** Gmail API + Slack
  - Agent notifications and follow-up reminders
  - Pre-call briefs delivered via Slack DM and/or email
  - Slack Pro (existing) — $0 additional
- **Calendar:** Google Calendar (connected to HubSpot)
  - Triggers pre-call briefing agent 30 minutes before meetings

## Monthly Cost Summary
| Service | Monthly Cost (AUD) |
|---------|-------------------|
| HubSpot Sales Hub Pro (2 seats) | ~$250 |
| n8n (AWS EC2 t3.small) | ~$25 |
| AWS Transcribe (~10 hrs/mo) | ~$30 |
| AWS S3 + Lambda | ~$10 |
| Claude API (~200 calls/mo) | ~$75 |
| Phantom Buster (Starter) | ~$70 |
| Microsoft 365 (existing) | $0 |
| Slack Pro (existing) | $0 |
| Domain / misc | ~$20 |
| **TOTAL** | **~$480/month** |

## Setup Commands

### n8n Deployment
```bash
# Local development
npx n8n start

# Docker (recommended for testing)
docker run -it --rm -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

# AWS EC2 production setup
# 1. Launch t3.small in ap-southeast-2
# 2. Install Node.js 18+ and n8n
# 3. Configure as systemd service
# 4. Set up nginx reverse proxy with SSL
```

### HubSpot Setup
```bash
# Create MEDDPICC properties via script
node scripts/setup-hubspot-properties.js

# Required: Set HUBSPOT_API_TOKEN environment variable first
export HUBSPOT_API_TOKEN=your-private-app-token
```

### AWS Transcribe Pipeline
```bash
# S3 bucket for audio (private, encrypted)
aws s3 mb s3://bronte-meeting-audio --region ap-southeast-2

# Lambda function for transcription trigger
# Deploy via AWS SAM or CloudFormation
```

## Error Handling Pattern
```javascript
// n8n HTTP Request Node — standard error handling
// All API calls should follow this pattern:

// 1. Use n8n's built-in retry on failure (3 retries, exponential backoff)
// 2. Add Error Trigger node to every workflow
// 3. Error Trigger sends Slack notification with:
//    - Workflow name
//    - Error message
//    - Timestamp
//    - Input data (redacted of PII)

// For Claude API calls in n8n:
// - Set timeout to 60 seconds
// - Validate JSON response structure before passing downstream
// - If Claude returns malformed JSON, retry once, then alert human
```

## Naming Conventions
- **n8n Workflows:** `[Agent]-[Function]` (e.g., `MeetingAgent-TranscriptAnalysis`, `PreCallAgent-BriefGeneration`)
- **n8n Nodes:** Descriptive names (e.g., `Fetch Deal History`, `Claude: Analyse Transcript`, `Update HubSpot MEDDPICC`)
- **HubSpot Properties:** snake_case (e.g., `meddpicc_metrics`, `deal_health_score`)
- **Scripts:** camelCase filenames (e.g., `setupHubspotProperties.js`)
- **Prompt Templates:** `prompts/[agent]-[function].md` (e.g., `prompts/meeting-analysis.md`)
