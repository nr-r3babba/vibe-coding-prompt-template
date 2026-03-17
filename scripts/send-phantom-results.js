/**
 * Send Phantom Buster results to the ICP Scraper webhook.
 *
 * Usage:
 *   node scripts/send-phantom-results.js <path-to-json-or-csv>
 *
 * Accepts either:
 *   - JSON file (array of prospect objects)
 *   - CSV file (auto-parsed)
 */

import { readFileSync } from "node:fs";
import { resolve, extname } from "node:path";
import "./load-env.js";

const N8N_BASE = process.env.N8N_BASE_URL || "http://localhost:5678";
const WEBHOOK_PATH = "/webhook/phantom-buster-webhook";

function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    // Handle quoted CSV fields
    const values = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || "";
    });
    return obj;
  });
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log("Usage: node scripts/send-phantom-results.js <path-to-json-or-csv>");
    console.log("  e.g. node scripts/send-phantom-results.js phantom-buster-results.json");
    process.exit(1);
  }

  const absPath = resolve(filePath);
  const ext = extname(absPath).toLowerCase();
  const raw = readFileSync(absPath, "utf-8");

  let prospects;
  if (ext === ".json") {
    const parsed = JSON.parse(raw);
    prospects = Array.isArray(parsed) ? parsed : [parsed];
  } else if (ext === ".csv") {
    prospects = parseCSV(raw);
  } else {
    console.log("Unsupported file type. Use .json or .csv");
    process.exit(1);
  }

  console.log(`Loaded ${prospects.length} prospects from ${absPath}`);
  console.log(`Sending to ${N8N_BASE}${WEBHOOK_PATH}...\n`);

  // Send prospects in batches of 5 to avoid overwhelming Claude API
  const batchSize = 5;
  for (let i = 0; i < prospects.length; i += batchSize) {
    const batch = prospects.slice(i, i + batchSize);
    console.log(`Batch ${Math.floor(i / batchSize) + 1}: Sending ${batch.length} prospects...`);

    try {
      const response = await fetch(`${N8N_BASE}${WEBHOOK_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospects: batch }),
      });

      if (!response.ok) {
        const body = await response.text();
        console.log(`  ERROR: ${response.status} — ${body}`);
      } else {
        const result = await response.json();
        console.log(`  Response:`, JSON.stringify(result));
      }
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }

    // Wait between batches to avoid rate limits
    if (i + batchSize < prospects.length) {
      console.log("  Waiting 5s before next batch...");
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  console.log("\nDone. Check HubSpot for new contacts and deals.");
}

main();
