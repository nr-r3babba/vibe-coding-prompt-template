/**
 * Bronte AI Sales Agent — Phase 1 End-to-End Test
 *
 * Tests the full Phase 1 flow:
 * 1. Sends sample LinkedIn prospect data to the ICP Scraper webhook
 * 2. Sends a deal ID to the MEDDPICC Scorer webhook
 *
 * Prerequisites:
 *   - n8n running at localhost:5678
 *   - Both workflows imported and activated:
 *     - 01-linkedin-icp-scraper.json
 *     - 02-meddpicc-auto-scorer.json
 *   - HubSpot and Anthropic credentials configured in n8n
 *
 * Usage:
 *   node scripts/test-phase1-flow.js [icp|meddpicc|both]
 */

import "./load-env.js";

const N8N_BASE = process.env.N8N_BASE_URL || "http://localhost:5678";

// Sample Phantom Buster-style prospect data
const SAMPLE_PROSPECTS = {
  prospects: [
    {
      fullName: "Test Prospect Alpha",
      firstName: "Test",
      lastName: "Alpha",
      title: "Chief Risk Officer",
      company: "Test Bank Australia",
      location: "Sydney, Australia",
      linkedinUrl: "https://linkedin.com/in/test-alpha",
      connectionDegree: "2nd",
      summary: "Chief Risk Officer at Test Bank Australia. 20+ years in financial risk management. Leading digital transformation of risk operations. APRA regulatory compliance specialist.",
      industry: "Banking",
      companySize: "5000+",
      mutualConnections: 3
    },
    {
      fullName: "Test Prospect Beta",
      firstName: "Test",
      lastName: "Beta",
      title: "Marketing Coordinator",
      company: "Small Retail Shop",
      location: "Auckland, New Zealand",
      linkedinUrl: "https://linkedin.com/in/test-beta",
      connectionDegree: "3rd",
      summary: "Marketing coordinator at a small retail business. Social media and event planning.",
      industry: "Retail",
      companySize: "10",
      mutualConnections: 0
    }
  ]
};

async function testICPScraper() {
  console.log("===========================================");
  console.log("Test 1: ICP Scraper Webhook");
  console.log("===========================================\n");
  console.log(`Sending ${SAMPLE_PROSPECTS.prospects.length} sample prospects...`);
  console.log(`  - Prospect 1: CRO at Tier 1 Bank (should score HIGH)`);
  console.log(`  - Prospect 2: Marketing at Retail (should score LOW / be skipped)\n`);

  try {
    const response = await fetch(`${N8N_BASE}/webhook/phantom-buster-webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(SAMPLE_PROSPECTS),
    });

    if (!response.ok) {
      const body = await response.text();
      console.log(`  ERROR: ${response.status} — ${body}`);
      return null;
    }

    const result = await response.json();
    console.log(`  Response:`, JSON.stringify(result, null, 2));
    console.log(`\n  ICP Scraper test complete.`);
    return result;
  } catch (e) {
    console.log(`  ERROR: ${e.message}`);
    console.log(`  Is n8n running? Is the workflow activated?`);
    return null;
  }
}

async function testMEDDPICCScorer(dealId) {
  console.log("\n===========================================");
  console.log("Test 2: MEDDPICC Scorer Webhook");
  console.log("===========================================\n");

  if (!dealId) {
    // Create a test deal first
    console.log("No deal ID provided. Creating a test deal in HubSpot...");
    const hubspotToken = process.env.HUBSPOT_API_TOKEN;
    if (!hubspotToken) {
      console.log("  ERROR: HUBSPOT_API_TOKEN not set. Cannot create test deal.");
      return;
    }

    const createResp = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hubspotToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          dealname: "__MEDDPICC_TEST_DEAL__ (safe to delete)",
          pipeline: "default",
          dealstage: "appointmentscheduled",
          amount: "1000000",
          meddpicc_pain: "Regulatory compliance gaps causing audit findings",
          meddpicc_champion: "Head of Risk Technology is interested",
        },
      }),
    });

    if (!createResp.ok) {
      console.log(`  ERROR creating test deal: ${await createResp.text()}`);
      return;
    }

    const deal = await createResp.json();
    dealId = deal.id;
    console.log(`  Created test deal: ${dealId}\n`);
  }

  console.log(`Scoring deal ${dealId} with MEDDPICC...`);

  try {
    const response = await fetch(`${N8N_BASE}/webhook/score-meddpicc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.log(`  ERROR: ${response.status} — ${body}`);
      return;
    }

    const result = await response.json();
    console.log(`  Response:`, JSON.stringify(result, null, 2));
    console.log(`\n  MEDDPICC Scorer test complete.`);
    console.log(`  Check HubSpot deal ${dealId} — MEDDPICC properties should be populated.`);
  } catch (e) {
    console.log(`  ERROR: ${e.message}`);
    console.log(`  Is n8n running? Is the workflow activated?`);
  }
}

async function main() {
  const mode = process.argv[2] || "both";

  console.log("===========================================");
  console.log("Bronte AI — Phase 1 End-to-End Test");
  console.log(`Mode: ${mode}`);
  console.log(`n8n URL: ${N8N_BASE}`);
  console.log("===========================================\n");

  if (mode === "icp" || mode === "both") {
    await testICPScraper();
  }

  if (mode === "meddpicc" || mode === "both") {
    const dealId = process.argv[3] || null;
    await testMEDDPICCScorer(dealId);
  }

  console.log("\n===========================================");
  console.log("Phase 1 tests complete.");
  console.log("===========================================");
}

main();
