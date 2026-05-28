import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const vaultRoot = path.resolve(scriptDir, "..");
const indexPath = path.join(vaultRoot, "docs", "assets", "search-index.js");

function fail(message) {
  console.error(`search-index check failed: ${message}`);
  process.exitCode = 1;
}

function loadIndex() {
  if (!fs.existsSync(indexPath)) {
    fail(`missing ${indexPath}`);
    return [];
  }
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(indexPath, "utf8"), context, { filename: indexPath });
  return context.window.VAULT_SEARCH_INDEX || [];
}

function haystack(item) {
  return [item.title, item.section, item.summary, item.rel, item.headings, item.searchText]
    .join(" ")
    .toLowerCase();
}

const index = loadIndex();
const rels = new Set(index.map((item) => item.rel));

const requiredRels = [
  "00_Index/Start_Hier.md",
  "15_Promotion/Digital_Rooms_Mapping_Matrix.md",
  "15_Promotion/Denkachsen_Register.md",
  "15_Promotion/Hybrid_Workflows_als_Digital_Rooms.md",
  "review/Offene_Fragen_Research_2026-05-19.md",
  "review/Methodik_Luecken_Research_2026-05-20.md",
  "wiki/sources/offene-fragen-digital-rooms-research-2026-05-19.md",
];

const forbiddenRels = [
  "15_Promotion/Forschungsfragen 2.md",
  "15_Promotion/Hypothesen 2.md",
  "15_Promotion/Mögliche_Gliederung 2.md",
  "15_Promotion/Theorieachsen 2.md",
  "00_System/topic_lifecycle.md",
  "00_System/Vault_Operating_System.md",
  "07_Notion_Sync/Notion_Sync.md",
];

const requiredQueries = [
  "Digital Rooms",
  "Denkachsen Register",
  "Mapping Matrix",
  "claim-ready",
  "Public / Built Room",
  "Gaussian Splatting",
  "Hybrid Workflows",
  "Nuke 17",
  "USD",
  "ACES 2.0",
  "Raumverantwortung",
  "Denkraum",
  "Belegarchiv",
  "Karpathy",
  "Methodik-Lücken",
];

for (const rel of requiredRels) {
  if (!rels.has(rel)) fail(`required rel is not indexed: ${rel}`);
}

for (const rel of forbiddenRels) {
  if (rels.has(rel)) fail(`internal or duplicate rel is indexed: ${rel}`);
}

for (const query of requiredQueries) {
  const normalized = query.toLowerCase();
  const matches = index.filter((item) => haystack(item).includes(normalized));
  if (!matches.length) fail(`query has no matches: ${query}`);
}

if (!process.exitCode) {
  console.log(`search-index ok: ${index.length} entries checked`);
}
