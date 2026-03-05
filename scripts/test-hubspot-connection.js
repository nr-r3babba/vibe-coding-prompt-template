/**
 * Bronte AI Sales Agent — HubSpot Connection Test
 *
 * Verifies your HubSpot Private App token works and has the right scopes.
 * Creates a test deal, reads it back, then deletes it.
 *
 * Usage:
 *   1. Set HUBSPOT_API_TOKEN in your .env
 *   2. Run: node scripts/test-hubspot-connection.js
 */

import "./load-env.js";

const HUBSPOT_API_TOKEN = process.env.HUBSPOT_API_TOKEN;

if (!HUBSPOT_API_TOKEN) {
  console.error("ERROR: HUBSPOT_API_TOKEN is not set.");
  console.error("Copy .env.example to .env and add your HubSpot Private App token.");
  process.exit(1);
}

const BASE_URL = "https://api.hubapi.com";

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

async function testAuth() {
  console.log("1. Testing authentication...");
  const result = await hubspotRequest("/crm/v3/objects/deals?limit=1");

  if (result.ok) {
    console.log("   AUTH OK — Token is valid.");
    return true;
  }

  console.error(`   AUTH FAILED (${result.status}): ${result.body}`);
  if (result.status === 401) {
    console.error("   Your token is invalid or expired. Check your HubSpot Private App.");
  }
  return false;
}

async function testCreateDeal() {
  console.log("\n2. Testing deal creation...");
  const result = await hubspotRequest("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        dealname: "__BRONTE_TEST_DEAL__ (safe to delete)",
        pipeline: "default",
        dealstage: "appointmentscheduled",
        amount: "0",
      },
    }),
  });

  if (result.ok) {
    console.log(`   CREATE OK — Test deal created (ID: ${result.data.id}).`);
    return result.data.id;
  }

  console.error(`   CREATE FAILED (${result.status}): ${result.body}`);
  return null;
}

async function testReadDeal(dealId) {
  console.log("\n3. Testing deal read...");
  const result = await hubspotRequest(`/crm/v3/objects/deals/${dealId}`);

  if (result.ok) {
    console.log(`   READ OK — Deal name: "${result.data.properties.dealname}"`);
    return true;
  }

  console.error(`   READ FAILED (${result.status}): ${result.body}`);
  return false;
}

async function testDeleteDeal(dealId) {
  console.log("\n4. Cleaning up test deal...");
  const result = await hubspotRequest(`/crm/v3/objects/deals/${dealId}`, {
    method: "DELETE",
  });

  if (result.ok || result.status === 204) {
    console.log("   CLEANUP OK — Test deal deleted.");
    return true;
  }

  console.error(`   CLEANUP FAILED (${result.status}): ${result.body}`);
  console.error("   You may need to manually delete '__BRONTE_TEST_DEAL__' from HubSpot.");
  return false;
}

async function testContactsAccess() {
  console.log("\n5. Testing contacts access...");
  const result = await hubspotRequest("/crm/v3/objects/contacts?limit=1");

  if (result.ok) {
    console.log("   CONTACTS OK — Can read contacts.");
    return true;
  }

  console.error(`   CONTACTS FAILED (${result.status}): ${result.body}`);
  console.error("   Ensure your Private App has crm.objects.contacts.read scope.");
  return false;
}

async function testOwnersAccess() {
  console.log("\n6. Testing owners access...");
  const result = await hubspotRequest("/crm/v3/owners?limit=1");

  if (result.ok) {
    console.log("   OWNERS OK — Can read owners.");
    return true;
  }

  console.error(`   OWNERS FAILED (${result.status}): ${result.body}`);
  return false;
}

async function main() {
  console.log("===========================================");
  console.log("Bronte AI Sales Agent — HubSpot Connection Test");
  console.log("===========================================\n");

  const authOk = await testAuth();
  if (!authOk) {
    console.log("\nConnection test FAILED. Fix authentication first.");
    process.exit(1);
  }

  const dealId = await testCreateDeal();
  if (dealId) {
    await testReadDeal(dealId);
    await testDeleteDeal(dealId);
  }

  await testContactsAccess();
  await testOwnersAccess();

  console.log("\n===========================================");
  console.log("Connection test complete!");
  console.log("If all checks passed, your HubSpot integration is ready.");
  console.log("===========================================");
}

main();
