/**
 * Bronte AI Sales Agent — HubSpot MEDDPICC Properties Setup
 *
 * Creates 8 MEDDPICC custom deal properties + deal_health_score in HubSpot.
 * Uses HubSpot v3 Properties API.
 *
 * Usage:
 *   1. Copy .env.example to .env and set HUBSPOT_API_TOKEN
 *   2. Run: node scripts/setup-hubspot-properties.js
 *
 * Safe to re-run — skips properties that already exist.
 */

import "./load-env.js";

const HUBSPOT_API_TOKEN = process.env.HUBSPOT_API_TOKEN;

if (!HUBSPOT_API_TOKEN) {
  console.error("ERROR: HUBSPOT_API_TOKEN is not set.");
  console.error("Copy .env.example to .env and add your HubSpot Private App token.");
  process.exit(1);
}

const BASE_URL = "https://api.hubapi.com";

const MEDDPICC_PROPERTIES = [
  {
    name: "meddpicc_metrics",
    label: "MEDDPICC — Metrics",
    description:
      "Quantified business impact / ROI the prospect seeks. Score 1-5 or detailed text from agent analysis.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_economic_buyer",
    label: "MEDDPICC — Economic Buyer",
    description:
      "Who controls the budget for risk technology investments. Identified person and confidence level.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_decision_criteria",
    label: "MEDDPICC — Decision Criteria",
    description:
      "How the prospect will evaluate vendors — technical and commercial requirements.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_decision_process",
    label: "MEDDPICC — Decision Process",
    description:
      "Steps and timeline to close — internal procurement workflow and approval chain.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_paper_process",
    label: "MEDDPICC — Paper Process",
    description:
      "Legal, compliance, and contractual requirements for the deal.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_pain",
    label: "MEDDPICC — Identify Pain",
    description:
      "Root business problem and consequence of not addressing risk management gaps.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_champion",
    label: "MEDDPICC — Champion",
    description:
      "Internal sponsor driving the deal — person with access and influence.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "meddpicc_competition",
    label: "MEDDPICC — Competition",
    description: "Other vendors in play and competitive positioning.",
    type: "string",
    fieldType: "textarea",
    groupName: "deal_qualification",
  },
  {
    name: "deal_health_score",
    label: "Deal Health Score",
    description:
      "Agent-calculated deal health score (1-10) based on MEDDPICC analysis and recent activity.",
    type: "number",
    fieldType: "number",
    groupName: "deal_qualification",
  },
];

const PROPERTY_GROUP = {
  name: "deal_qualification",
  label: "Deal Qualification (MEDDPICC)",
};

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

async function ensurePropertyGroup() {
  console.log(`\nChecking property group: "${PROPERTY_GROUP.name}"...`);

  const result = await hubspotRequest(
    `/crm/v3/properties/deals/groups/${PROPERTY_GROUP.name}`
  );

  if (result.ok) {
    console.log(`  Group "${PROPERTY_GROUP.name}" already exists.`);
    return;
  }

  console.log(`  Creating group "${PROPERTY_GROUP.name}"...`);
  const createResult = await hubspotRequest("/crm/v3/properties/deals/groups", {
    method: "POST",
    body: JSON.stringify(PROPERTY_GROUP),
  });

  if (createResult.ok) {
    console.log(`  Group created successfully.`);
  } else {
    console.error(`  Failed to create group: ${createResult.body}`);
    process.exit(1);
  }
}

async function createProperty(prop) {
  console.log(`\nChecking property: "${prop.name}"...`);

  const checkResult = await hubspotRequest(
    `/crm/v3/properties/deals/${prop.name}`
  );

  if (checkResult.ok) {
    console.log(`  Property "${prop.name}" already exists — skipping.`);
    return { name: prop.name, status: "exists" };
  }

  console.log(`  Creating property "${prop.name}"...`);
  const createResult = await hubspotRequest("/crm/v3/properties/deals", {
    method: "POST",
    body: JSON.stringify({
      name: prop.name,
      label: prop.label,
      description: prop.description,
      type: prop.type,
      fieldType: prop.fieldType,
      groupName: prop.groupName,
    }),
  });

  if (createResult.ok) {
    console.log(`  Property "${prop.name}" created successfully.`);
    return { name: prop.name, status: "created" };
  } else {
    console.error(`  Failed to create "${prop.name}": ${createResult.body}`);
    return { name: prop.name, status: "error", error: createResult.body };
  }
}

async function main() {
  console.log("===========================================");
  console.log("Bronte AI Sales Agent — HubSpot Setup");
  console.log("Creating MEDDPICC deal properties");
  console.log("===========================================");

  await ensurePropertyGroup();

  const results = [];
  for (const prop of MEDDPICC_PROPERTIES) {
    const result = await createProperty(prop);
    results.push(result);
  }

  console.log("\n===========================================");
  console.log("Summary:");
  console.log("===========================================");

  const created = results.filter((r) => r.status === "created");
  const existing = results.filter((r) => r.status === "exists");
  const errors = results.filter((r) => r.status === "error");

  console.log(`  Created: ${created.length}`);
  console.log(`  Already existed: ${existing.length}`);
  console.log(`  Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log("\nErrors:");
    for (const e of errors) {
      console.log(`  - ${e.name}: ${e.error}`);
    }
    process.exit(1);
  }

  console.log("\nAll MEDDPICC properties are ready in HubSpot!");
}

main();
