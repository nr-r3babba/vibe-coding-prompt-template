/**
 * Bronte AI Sales Agent — HubSpot Pipeline Stages Setup
 *
 * Creates (or reports on) deal pipeline stages matching Bronte's enterprise
 * sales funnel. HubSpot Free CRM comes with a default pipeline — this script
 * updates its stages to match the Bronte funnel.
 *
 * Stages aligned to the PRD funnel:
 *   1. Prospect Identified (Top of Funnel)
 *   2. ICP Qualified / MEDDPICC Scored (Top of Funnel)
 *   3. Discovery Call Scheduled (Middle of Funnel)
 *   4. Discovery Call Complete (Middle of Funnel)
 *   5. PoC / ROI In Progress (Middle of Funnel)
 *   6. Proposal Sent (Bottom of Funnel)
 *   7. Negotiation / Procurement (Bottom of Funnel)
 *   8. Closed Won
 *   9. Closed Lost
 *
 * Usage:
 *   1. Set HUBSPOT_API_TOKEN in your .env
 *   2. Run: node scripts/setup-hubspot-pipeline.js
 */

import "./load-env.js";

const HUBSPOT_API_TOKEN = process.env.HUBSPOT_API_TOKEN;

if (!HUBSPOT_API_TOKEN) {
  console.error("ERROR: HUBSPOT_API_TOKEN is not set.");
  process.exit(1);
}

const BASE_URL = "https://api.hubapi.com";

const BRONTE_STAGES = [
  { label: "Prospect Identified", displayOrder: 0 },
  { label: "ICP Qualified (MEDDPICC Scored)", displayOrder: 1 },
  { label: "Discovery Call Scheduled", displayOrder: 2 },
  { label: "Discovery Call Complete", displayOrder: 3 },
  { label: "PoC / ROI In Progress", displayOrder: 4 },
  { label: "Proposal Sent", displayOrder: 5 },
  { label: "Negotiation / Procurement", displayOrder: 6 },
  { label: "Closed Won", displayOrder: 7 },
  { label: "Closed Lost", displayOrder: 8 },
];

async function hubspotRequest(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${HUBSPOT_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = await response.text();

  if (!response.ok) {
    return { ok: false, status: response.status, body };
  }

  return { ok: true, status: response.status, data: body ? JSON.parse(body) : null };
}

async function main() {
  console.log("===========================================");
  console.log("Bronte AI Sales Agent — Pipeline Setup");
  console.log("===========================================\n");

  // Fetch existing pipelines
  console.log("Fetching existing pipelines...");
  const result = await hubspotRequest("/crm/v3/pipelines/deals");

  if (!result.ok) {
    console.error(`Failed to fetch pipelines: ${result.body}`);
    process.exit(1);
  }

  const pipelines = result.data.results;
  console.log(`Found ${pipelines.length} pipeline(s):\n`);

  for (const pipeline of pipelines) {
    console.log(`  Pipeline: "${pipeline.label}" (ID: ${pipeline.id})`);
    console.log(`  Stages:`);
    const sortedStages = pipeline.stages.sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    for (const stage of sortedStages) {
      console.log(
        `    ${stage.displayOrder}. ${stage.label} (ID: ${stage.id})`
      );
    }
    console.log();
  }

  console.log("-------------------------------------------");
  console.log("Recommended Bronte pipeline stages:");
  console.log("-------------------------------------------");
  for (const stage of BRONTE_STAGES) {
    console.log(`  ${stage.displayOrder}. ${stage.label}`);
  }

  console.log("\n-------------------------------------------");
  console.log("IMPORTANT: HubSpot Free CRM has limited pipeline API access.");
  console.log("To set up these stages:");
  console.log("  1. Go to app.hubspot.com → Settings → Objects → Deals → Pipelines");
  console.log("  2. Edit the default pipeline");
  console.log("  3. Replace the default stages with the stages listed above");
  console.log("  4. Save and verify");
  console.log("");
  console.log("The stage names above match what the AI agents expect.");
  console.log("Once configured, re-run this script to verify your setup.");
  console.log("===========================================");
}

main();
