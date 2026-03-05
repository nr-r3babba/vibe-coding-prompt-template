# Essential Resources

## Curated Repositories
| Repository | Purpose |
|------------|---------|
| **n8n-io/n8n** | Core orchestration platform — workflow examples and docs |
| **PatrickJS/awesome-cursorrules** | Anti-vibe rule templates for Cursor users |
| **OneRedOak/claude-code-workflows** | Review workflow packs for Claude Code |
| **modelcontextprotocol/servers** | MCP server implementations |

## Key Documentation
- **n8n Docs:** docs.n8n.io — Workflow building, nodes, credentials, self-hosting
- **HubSpot API v3:** developers.hubspot.com/docs/api — CRM objects, properties, associations
- **Claude API:** docs.anthropic.com — Messages API, prompt engineering, structured outputs
- **AWS Transcribe:** docs.aws.amazon.com/transcribe — Real-time and batch transcription
- **Microsoft Graph API:** learn.microsoft.com/graph — Office 365 file manipulation (PowerPoint, Excel, Word)
- **Phantom Buster:** phantombuster.com/docs — LinkedIn automation and data extraction
- **Gmail API:** developers.google.com/gmail/api — Email sending and reading
- **Slack API:** api.slack.com — Bot messaging, webhooks, Slack app setup

## n8n Workflow Patterns
- **Webhook Trigger → Claude API → HubSpot Update:** Core pattern for all agents
- **Schedule Trigger → HubSpot Query → Claude Analysis → Slack Notification:** Pre-call briefing pattern
- **S3 Event → Lambda → Transcribe → Claude → HubSpot:** Meeting intelligence pipeline

## Claude API Prompt Patterns
- Always include a system message establishing Bronte's context (AI risk platform, Tier 1 banks, ANZ/SG)
- Request structured JSON output for all extraction tasks
- Use deal IDs, never prospect names, in prompts
- Keep prompts focused — one task per Claude call

## Security References
- **AWS S3 Encryption:** docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html
- **Privacy Act 1988 (AU):** legislation.gov.au — Relevant for meeting recording consent
- **PDPA (SG):** pdpc.gov.sg — Singapore data protection requirements
