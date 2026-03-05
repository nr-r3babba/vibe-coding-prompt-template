# CLAUDE.md — Claude Code Configuration for Bronte AI Sales Agent

## Project Context
**App:** Bronte AI Sales Agent
**Stack:** n8n + HubSpot CRM + Claude API + AWS (Transcribe/S3/Lambda) + Microsoft Graph API + Phantom Buster + Gmail + Slack
**Stage:** MVP Development
**User Level:** Vibe-coder (AI does everything, user guides and tests)

## Directives
1. **Master Plan:** Always read `AGENTS.md` first. It contains the current phase, roadmap, and task list.
2. **Documentation:** Refer to `agent_docs/` for tech stack details, code patterns, testing guides, and full product requirements.
3. **Plan-First:** Propose a brief plan and wait for approval before coding. Use plan mode for complex tasks.
4. **Incremental Build:** Build one agent feature at a time. Test the n8n workflow with sample data before moving on.
5. **Pre-Commit:** If hooks exist, run them before commits; fix failures.
6. **No Linting:** Do not act as a linter. Use `npm run lint` if needed.
7. **Communication:** Be concise. Explain concepts simply — user is a vibe-coder, not a developer. Focus on "what to do next".
8. **Security:** Never include prospect names in Claude API prompts. Use deal IDs. Never log PII. All S3 buckets private + encrypted.

## Commands
- `npx n8n start` — Start n8n locally
- `docker run -it --rm -p 5678:5678 n8nio/n8n` — Start n8n via Docker
- `node scripts/setup-hubspot-properties.js` — Set up HubSpot MEDDPICC properties
- `npm test` — Run tests
- `npm run lint` — Check code style

## What NOT To Do
- Do NOT delete files without explicit confirmation
- Do NOT modify HubSpot CRM schemas without backup plan
- Do NOT add features not in the current phase
- Do NOT skip tests for "simple" changes
- Do NOT store API keys in code or workflow JSON — use n8n credential vault
- Do NOT send external communications without human approval
- Do NOT use deprecated libraries or patterns
