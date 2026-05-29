import { spawnSync } from "node:child_process";

const globs = [
  "-g",
  "*.md",
  "-g",
  "!.git/**",
  "-g",
  "!.obsidian/**",
  "-g",
  "!docs/**",
  "-g",
  "!raw/**",
  "-g",
  "!outputs/**",
];
const requiredLines = [
  "## Karpathy-Status",
  "- Lifecycle:",
  "- Rolle:",
  "- Evidenzmodus:",
  "- Denkraum:",
  "- Nicht als Claim nutzen:",
  "- Nächster Prüfschritt:",
];

function runRg(args) {
  const result = spawnSync("rg", args, { encoding: "utf8" });
  if (![0, 1].includes(result.status)) {
    console.error(result.stderr || `rg failed: ${args.join(" ")}`);
    process.exit(result.status || 1);
  }
  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function markdownFileCount() {
  const result = spawnSync("rg", ["--files", ...globs], { encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr || "rg failed while listing markdown files");
    process.exit(result.status || 1);
  }
  return result.stdout
    .split("\n")
    .filter(Boolean).length;
}

const failures = [];
const files = new Set(runRg(["--files", ...globs]));

for (const line of requiredLines) {
  const matchingFiles = new Set(runRg(["-l", "-F", "-e", line, ...globs, "."]).map((file) => file.replace(/^\.\//, "")));
  for (const file of files) {
    if (!matchingFiles.has(file)) failures.push(`${file}: missing ${line}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`karpathy lint ok: ${markdownFileCount()} markdown files checked`);
