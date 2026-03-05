# Project Brief

- **Product vision:** Enable a 4-person team to close 9 enterprise deals in 9 months by having AI agents handle 80% of sales execution — from prospect discovery to contract negotiation — while humans focus on relationships and decisions.
- **Target Audience:**
  - **Primary:** Bronte founding team (2 founders in Sydney), GTM team (Colombo), independent sales partners (SG, NZ, AU)
  - **Indirect:** Tier 1 financial institutions (prospects) and their procurement teams

## Conventions
- **n8n Workflows:** One workflow per agent feature. Name as `[Agent]-[Function]`
- **Claude Prompts:** Store in `prompts/` as versioned .md files. Always include system role context for Bronte.
- **Scripts:** Node.js ES modules. camelCase filenames.
- **HubSpot Properties:** snake_case (e.g., `meddpicc_metrics`)
- **Security:** Never log PII. Use deal IDs in Claude API calls. Encrypt all S3 objects. Rotate HubSpot API key quarterly.

## Key Principles
- **Agent-first execution:** Every repeatable GTM task defaults to agent execution with human oversight
- **One agent, one job:** Each agent is small, focused, testable, and replaceable
- **HubSpot is the single source of truth:** All deal intelligence flows through HubSpot, updated in real time by agents
- **Founder leverage maximisation:** Founder time reserved exclusively for executive conversations and strategic decisions
- **Compliance by design:** No sensitive data exposure without contractual safeguards. AU data stays in AU.
- **Build simple, iterate fast:** Ship the simplest working agent first. Add sophistication based on real usage.
- **Human-in-the-loop for external comms:** Agents MUST escalate before any direct communication with prospects or any data deletion

## Quality Gates
- All n8n workflows must have error trigger nodes with Slack alerts
- Test each agent workflow with sample data before marking complete
- Verify HubSpot data accuracy after every workflow change
- Review `REVIEW-CHECKLIST.md` before completing any feature

## Key Commands
- **n8n (local):** `npx n8n start`
- **n8n (docker):** `docker run -it --rm -p 5678:5678 n8nio/n8n`
- **HubSpot setup:** `node scripts/setup-hubspot-properties.js`
- **Tests:** `npm test`
- **Lint:** `npm run lint`

## Update Cadence
- Update `MEMORY.md` after every major milestone or architectural decision
- Update `AGENTS.md` roadmap checkboxes as phases complete
- Refresh this brief when conventions or principles change
