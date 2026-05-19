import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const vaultRoot = path.resolve(scriptDir, "..");
const docsRoot = path.join(vaultRoot, "docs");

const sectionLabels = new Map([
  ["00_Index", "Start"],
  ["00_System", "System"],
  ["01_Tools_und_Modelle", "Tools und Modelle"],
  ["02_Postproduktion_Workflows", "Postproduktion"],
  ["03_Rotoscoping_AI_VFX", "Rotoscoping / VFX"],
  ["04_Trends_und_Vorreiter", "Trends"],
  ["05_Ethik_Recht_Provenance", "Ethik, Recht, Provenance"],
  ["06_Quellen", "Quellen"],
  ["07_Notion_Sync", "Notion Sync"],
  ["08_Marktkarte", "Marktkarte"],
  ["09_Emerging_Technologies", "Emerging Technologies"],
  ["10_Use_Cases", "Use Cases"],
  ["11_Best_Practices", "Best Practices"],
  ["12_Skills_und_Rollen", "Skills und Rollen"],
  ["13_Forschung_Papers", "Forschung / Papers"],
  ["14_Positionierung_Studium", "Studium"],
  ["15_Promotion", "Promotion"],
  ["16_Digital_Image_Space", "Digital Image Space"],
  ["review", "Review Layer"],
  ["wiki", "Research Wiki"],
  ["raw", "Raw Sources"],
  ["outputs", "Outputs"],
]);

const featuredPaths = [
  "00_Index/Start_Hier.md",
  "15_Promotion/Promotion_Index.md",
  "15_Promotion/Promotionsformel_Digital_Rooms.md",
  "16_Digital_Image_Space/Digital_Image_Space_Index.md",
  "01_Tools_und_Modelle/Tool_Landschaft_2026.md",
  "13_Forschung_Papers/Forschung_und_Paper_Pipeline.md",
  "06_Quellen/Quellenbibliothek.md",
  "review/Claim_Evidence_Matrix.md",
];

const ignoreDirs = new Set([".obsidian", "docs", "scripts"]);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removeDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".github") {
      if (entry.name !== ".github") continue;
    }
    const full = path.join(dir, entry.name);
    const rel = toPosix(path.relative(vaultRoot, full));
    const firstSegment = rel.split("/")[0];
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name) || ignoreDirs.has(firstSegment)) continue;
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function normalizeKey(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\.md$/i, "")
    .replace(/[_\-\s]+/g, " ")
    .replace(/[^\p{L}\p{N}/ ]/gu, "")
    .trim();
}

function slugPart(value) {
  const slug = value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return slug || "index";
}

function slugForRel(rel) {
  return rel
    .replace(/\.md$/i, "")
    .split("/")
    .map(slugPart)
    .join("--");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, label) => label || target)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(markdown, rel) {
  const h1 = markdown.match(/^#\s+(.+)$/m);
  if (h1) return stripMarkdown(h1[1]);
  return path.basename(rel, ".md").replace(/[_-]+/g, " ");
}

function extractSummary(markdown) {
  const lines = markdown.split(/\r?\n/);
  const candidates = [];
  let buffer = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (buffer.length) {
        candidates.push(buffer.join(" "));
        buffer = [];
      }
      continue;
    }
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ") ||
      /^\d+\.\s/.test(trimmed) ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("Tags:") ||
      trimmed.startsWith("Status:") ||
      trimmed.startsWith("Quelle:")
    ) {
      continue;
    }
    buffer.push(trimmed);
    if (buffer.join(" ").length > 260) break;
  }
  if (buffer.length) candidates.push(buffer.join(" "));
  const text = stripMarkdown(candidates[0] || markdown.split(/\r?\n/).slice(0, 8).join(" "));
  return text.length > 240 ? `${text.slice(0, 237).trim()}...` : text;
}

function extractHeadings(markdown) {
  return [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: stripMarkdown(match[2]),
    id: slugPart(stripMarkdown(match[2])),
  }));
}

function extractUrls(markdown) {
  const urls = new Set();
  const matches = markdown.match(/https?:\/\/[^\s<>\])"]+/g) || [];
  for (const raw of matches) {
    urls.add(raw.replace(/[.,;:!?]+$/g, ""));
  }
  return [...urls];
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "extern";
  }
}

function sectionForRel(rel) {
  if (!rel.includes("/")) return "System Files";
  const segment = rel.split("/")[0];
  return sectionLabels.get(segment) || segment.replace(/[_-]+/g, " ");
}

function kindForRel(rel) {
  if (rel.startsWith("review/")) return "Review";
  if (rel.startsWith("wiki/")) return "Wiki";
  if (rel.startsWith("raw/")) return "Raw";
  if (rel.startsWith("outputs/")) return "Output";
  if (/^\d{2}_/.test(rel)) return "Compiled";
  return "System";
}

function pageHref(fromDoc, toDoc) {
  if (!fromDoc) return `pages/${toDoc.slug}.html`;
  return `${toDoc.slug}.html`;
}

function rootHref(fromDoc, target) {
  return fromDoc ? `../${target}` : target;
}

function resolveTarget(target, currentRel, docsByRel, docsByBase) {
  const cleanTarget = target.split("#")[0].trim().replace(/\.md$/i, "");
  const hash = target.includes("#") ? slugPart(target.split("#").slice(1).join("#")) : "";
  if (!cleanTarget) return null;

  const candidates = [];
  const currentDir = path.posix.dirname(currentRel);
  if (cleanTarget.includes("/") || cleanTarget.startsWith(".")) {
    candidates.push(path.posix.normalize(path.posix.join(currentDir, `${cleanTarget}.md`)));
    candidates.push(path.posix.normalize(`${cleanTarget}.md`));
    candidates.push(path.posix.normalize(path.posix.join(currentDir, cleanTarget, "README.md")));
    candidates.push(path.posix.normalize(path.posix.join(currentDir, cleanTarget, "index.md")));
  } else {
    candidates.push(path.posix.normalize(path.posix.join(currentDir, `${cleanTarget}.md`)));
  }

  for (const candidate of candidates) {
    if (docsByRel.has(candidate)) {
      return { doc: docsByRel.get(candidate), hash };
    }
  }

  const baseKey = normalizeKey(cleanTarget);
  const baseMatches = docsByBase.get(baseKey) || [];
  if (baseMatches.length === 1) return { doc: baseMatches[0], hash };
  if (baseMatches.length > 1) {
    const sameSection = baseMatches.find(
      (doc) => doc.rel.split("/")[0] === currentRel.split("/")[0],
    );
    return { doc: sameSection || baseMatches[0], hash };
  }
  return null;
}

function inlineMarkdown(text, currentDoc, docsByRel, docsByBase) {
  let source = text.replace(/!\[\[([^\]]+)\]\]/g, (_, inner) => {
    const [targetRaw, labelRaw] = inner.split("|");
    const label = labelRaw || path.posix.basename(targetRaw);
    return `[${label}](${targetRaw})`;
  });

  source = source.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
    const [targetRaw, labelRaw] = inner.split("|");
    const target = targetRaw.trim();
    const label = (labelRaw || path.posix.basename(target.replace(/\.md$/i, ""))).trim();
    const resolved = resolveTarget(target, currentDoc.rel, docsByRel, docsByBase);
    if (!resolved) return label;
    const hash = resolved.hash ? `#${resolved.hash}` : "";
    return `[${label}](${pageHref(currentDoc, resolved.doc)}${hash})`;
  });

  const placeholders = [];
  const hold = (html) => {
    const key = `@@INLINE_${placeholders.length}@@`;
    placeholders.push([key, html]);
    return key;
  };

  source = escapeHtml(source);
  source = source.replace(/`([^`]+)`/g, (_, code) => hold(`<code>${code}</code>`));
  source = source.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, href) =>
    hold(`<img src="${escapeHtml(href)}" alt="${alt}" loading="lazy">`),
  );
  source = source.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const isExternal = /^https?:\/\//.test(href);
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
    return hold(`<a href="${escapeHtml(href)}"${target}>${label}</a>`);
  });
  source = source.replace(/(^|[\s(])(https?:\/\/[^\s<]+)/g, (match, prefix, url) => {
    const clean = url.replace(/[.,;:!?]+$/g, "");
    const trailing = url.slice(clean.length);
    return `${prefix}${hold(`<a href="${escapeHtml(clean)}" target="_blank" rel="noopener noreferrer">${escapeHtml(clean)}</a>`)}${trailing}`;
  });
  source = source.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  source = source.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  source = source.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  for (const [key, html] of placeholders) source = source.replaceAll(key, html);
  return source;
}

function renderTable(lines, currentDoc, docsByRel, docsByBase) {
  const splitRow = (line) => {
    const placeholders = [];
    let safe = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    safe = safe.replace(/\[\[[^\]]+\]\]/g, (match) => {
      const key = `@@WIKI_TABLE_${placeholders.length}@@`;
      placeholders.push([key, match]);
      return key;
    });
    return safe.split("|").map((cell) => {
      let restored = cell.trim();
      for (const [key, value] of placeholders) restored = restored.replaceAll(key, value);
      return restored;
    });
  };

  const rows = lines
    .filter((line) => !/^\s*\|?\s*:?-{3,}/.test(line))
    .map(splitRow);
  if (!rows.length) return "";
  const [head, ...body] = rows;
  const header = head.map((cell) => `<th>${inlineMarkdown(cell, currentDoc, docsByRel, docsByBase)}</th>`).join("");
  const bodyRows = body
    .map(
      (row) =>
        `<tr>${row
          .map((cell) => `<td>${inlineMarkdown(cell, currentDoc, docsByRel, docsByBase)}</td>`)
          .join("")}</tr>`,
    )
    .join("");
  return `<div class="table-wrap"><table><thead><tr>${header}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
}

function markdownToHtml(markdown, currentDoc, docsByRel, docsByBase) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inList = null;
  let inCode = false;
  let codeLang = "";
  let codeLines = [];

  const closeList = () => {
    if (inList) {
      html.push(`</${inList}>`);
      inList = null;
    }
  };

  const flushCode = () => {
    html.push(
      `<pre><code${codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ""}>${escapeHtml(codeLines.join("\n"))}</code></pre>`,
    );
    codeLines = [];
    codeLang = "";
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        closeList();
        inCode = true;
        codeLang = trimmed.replace(/^```/, "").trim();
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      closeList();
      continue;
    }

    if (/^\s*\|?.+\|.+$/.test(line) && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1] || "")) {
      closeList();
      const tableLines = [line, lines[i + 1]];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
        tableLines.push(lines[i]);
        i += 1;
      }
      i -= 1;
      html.push(renderTable(tableLines, currentDoc, docsByRel, docsByBase));
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      const text = stripMarkdown(heading[2]);
      const id = slugPart(text);
      html.push(`<h${level} id="${id}">${inlineMarkdown(heading[2], currentDoc, docsByRel, docsByBase)}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeList();
      html.push("<hr>");
      continue;
    }

    if (trimmed.startsWith(">")) {
      closeList();
      html.push(`<blockquote>${inlineMarkdown(trimmed.replace(/^>\s?/, ""), currentDoc, docsByRel, docsByBase)}</blockquote>`);
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      if (inList !== "ul") {
        closeList();
        html.push("<ul>");
        inList = "ul";
      }
      html.push(`<li>${inlineMarkdown(unordered[1], currentDoc, docsByRel, docsByBase)}</li>`);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      if (inList !== "ol") {
        closeList();
        html.push("<ol>");
        inList = "ol";
      }
      html.push(`<li>${inlineMarkdown(ordered[1], currentDoc, docsByRel, docsByBase)}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(trimmed, currentDoc, docsByRel, docsByBase)}</p>`);
  }

  closeList();
  if (inCode) flushCode();
  return html.join("\n");
}

function layout({ title, description, body, activeRel = "", fromDoc = null, navHtml = "", extraClass = "" }) {
  const root = (target) => rootHref(fromDoc, target);
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · AI Postproduktion VFX Vault</title>
  <meta name="description" content="${escapeHtml(description || "GitHub-Pages-Wissenshub aus dem AI_Postproduktion_VFX_Vault")}">
  <link rel="stylesheet" href="${root("assets/styles.css")}">
  <link rel="icon" href="${root("assets/favicon.svg")}" type="image/svg+xml">
</head>
<body class="${extraClass}">
  <a class="skip-link" href="#main">Zum Inhalt springen</a>
  <header class="site-top">
    <a class="brand" href="${root("index.html")}" aria-label="Startseite">
      <span class="brand-mark" aria-hidden="true">DR</span>
      <span><strong>Digital Rooms</strong><small>AI · Postproduktion · VFX</small></span>
    </a>
    <nav class="top-nav" aria-label="Hauptnavigation">
      <a href="${root("index.html")}">Atlas</a>
      <a href="${root("links.html")}">Links</a>
      <a href="${root("attachments.html")}">Rohquellen</a>
      <a href="${root("pages/00-index--start-hier.html")}">Start hier</a>
    </nav>
  </header>
  <div class="site-shell">
    ${navHtml}
    <main id="main" class="main-content ${extraClass}">
      ${body}
    </main>
  </div>
  <script src="${root("assets/search-index.js")}"></script>
  <script src="${root("assets/search.js")}"></script>
</body>
</html>`;
}

function navTreeHtml(docs, activeRel, fromDoc = null) {
  const grouped = new Map();
  for (const doc of docs) {
    if (!grouped.has(doc.section)) grouped.set(doc.section, []);
    grouped.get(doc.section).push(doc);
  }

  const groups = [...grouped.entries()]
    .map(([section, items]) => {
      const links = items
        .sort((a, b) => a.title.localeCompare(b.title, "de"))
        .map((doc) => {
          const href = fromDoc ? `${doc.slug}.html` : `pages/${doc.slug}.html`;
          const active = doc.rel === activeRel ? " aria-current=\"page\"" : "";
          return `<a href="${href}"${active}>${escapeHtml(doc.title)}</a>`;
        })
        .join("");
      return `<details ${items.some((doc) => doc.rel === activeRel) || section === "Start" ? "open" : ""}>
        <summary>${escapeHtml(section)} <span>${items.length}</span></summary>
        <div class="nav-links">${links}</div>
      </details>`;
    })
    .join("");

  return `<aside class="side-nav" aria-label="Vault-Navigation">
    <label class="search-box">
      <span>Vault durchsuchen</span>
      <input type="search" id="site-search" placeholder="Tool, Theorie, Paper, Claim...">
    </label>
    <div id="search-results" class="search-results" aria-live="polite"></div>
    <div class="nav-tree">${groups}</div>
  </aside>`;
}

function graphSvg(sectionStats) {
  const nodes = [
    ["Digital Rooms", 320, 155, 54, "#111827"],
    ["Tools", 160, 88, 33, "#0b9aaa"],
    ["VFX", 205, 245, 30, "#de4a2c"],
    ["Promotion", 430, 86, 38, "#6d5bd0"],
    ["Image Space", 505, 226, 35, "#0f766e"],
    ["Quellen", 88, 205, 28, "#d19400"],
  ];
  const lines = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [3, 4],
    [4, 2],
    [5, 3],
  ];
  const labels = nodes
    .map(
      ([label, x, y, r, color]) =>
        `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity=".94"/><text x="${x}" y="${y + 4}" text-anchor="middle">${escapeHtml(label)}</text></g>`,
    )
    .join("");
  const edges = lines
    .map(([a, b]) => {
      const start = nodes[a];
      const end = nodes[b];
      return `<line x1="${start[1]}" y1="${start[2]}" x2="${end[1]}" y2="${end[2]}"/>`;
    })
    .join("");
  const stats = sectionStats
    .slice(0, 5)
    .map((stat, index) => `<text class="stat-label" x="36" y="${324 + index * 22}">${escapeHtml(stat.section)} · ${stat.count}</text>`)
    .join("");
  return `<svg class="knowledge-graph" viewBox="0 0 620 430" role="img" aria-label="Wissensgraph: Digital Rooms verbindet Tools, VFX, Promotion, Digital Image Space und Quellen">
    <rect x="0" y="0" width="620" height="430" rx="28"/>
    <g class="graph-lines">${edges}</g>
    <g class="graph-nodes">${labels}</g>
    <text class="graph-title" x="36" y="54">Vault Map</text>
    ${stats}
  </svg>`;
}

function cardForDoc(doc, href) {
  return `<article class="note-card" data-note-card data-title="${escapeHtml(doc.title.toLowerCase())}" data-section="${escapeHtml(doc.section.toLowerCase())}">
    <a href="${href}"><span>${escapeHtml(doc.section)}</span><strong>${escapeHtml(doc.title)}</strong></a>
    <p>${escapeHtml(doc.summary)}</p>
  </article>`;
}

function buildIndex(docs, allUrls, attachments, backlinks) {
  const featured = featuredPaths
    .map((rel) => docs.find((doc) => doc.rel === rel))
    .filter(Boolean);
  const sectionStats = [...docs.reduce((map, doc) => {
    map.set(doc.section, (map.get(doc.section) || 0) + 1);
    return map;
  }, new Map())]
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count);

  const toolDocs = docs.filter((doc) => doc.rel.startsWith("01_Tools_und_Modelle/") && doc.rel !== "01_Tools_und_Modelle/Tool_Landschaft_2026.md");
  const researchDocs = docs.filter((doc) => doc.rel.startsWith("15_Promotion/") || doc.rel.startsWith("16_Digital_Image_Space/")).slice(0, 10);
  const mostLinked = docs
    .map((doc) => ({ doc, count: backlinks.get(doc.rel)?.length || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const hero = `<section class="hero">
    <div class="hero-copy">
      <p class="meta-line">Stand aus Vault · 2026-05-17</p>
      <h1>Digital Rooms, AI und Postproduktion</h1>
      <p class="lede">Ein GitHub-Pages-Wissenshub zu generativer KI, VFX, Postproduktion, Video-/Bildmodellen, Theorie, Promotion und der Frage, wie digitale Bild-, Daten-, Interface- und Handlungsräume gestaltet werden.</p>
      <div class="hero-actions">
        <a class="button primary" href="pages/00-index--start-hier.html">Start hier</a>
        <a class="button" href="links.html">Quellen und Links</a>
      </div>
      <dl class="stats-row">
        <div><dt>${docs.length}</dt><dd>Notizen</dd></div>
        <div><dt>${allUrls.length}</dt><dd>externe Links</dd></div>
        <div><dt>${attachments.length}</dt><dd>lokale Rohquellen</dd></div>
        <div><dt>${[...backlinks.values()].reduce((sum, list) => sum + list.length, 0)}</dt><dd>interne Kanten</dd></div>
      </dl>
    </div>
    <div class="hero-visual">${graphSvg(sectionStats)}</div>
  </section>`;

  const featuredHtml = `<section class="content-band">
    <div class="section-heading">
      <h2>Empfohlene Einstiegspfade</h2>
      <p>Die wichtigsten Knoten aus Startseite, Promotion, Theorie, Tool-Landschaft und Evidenzprüfung.</p>
    </div>
    <div class="card-grid featured-grid">${featured.map((doc) => cardForDoc(doc, `pages/${doc.slug}.html`)).join("")}</div>
  </section>`;

  const sectionsHtml = `<section class="content-band split-band">
    <div class="section-heading">
      <h2>Themenfelder</h2>
      <p>Alle Vault-Schichten bleiben sichtbar: kompilierte Wiki, Review Layer, Quellen, Outputs und Denkraum.</p>
    </div>
    <div class="section-list">
      ${sectionStats
        .map(
          (stat) => `<a href="#all-notes"><span>${escapeHtml(stat.section)}</span><strong>${stat.count}</strong></a>`,
        )
        .join("")}
    </div>
  </section>`;

  const toolsHtml = `<section class="content-band">
    <div class="section-heading">
      <h2>Tool- und Modellradar</h2>
      <p>Produkt- und Pipeline-Notizen für Video, Bild, Compositing, Rotoscoping und Postproduktion.</p>
    </div>
    <div class="rail">${toolDocs.map((doc) => cardForDoc(doc, `pages/${doc.slug}.html`)).join("")}</div>
  </section>`;

  const researchHtml = `<section class="content-band">
    <div class="section-heading">
      <h2>Promotion und Digital Image Space</h2>
      <p>Theorieachsen, Fallstudien, Begriffsapparat und methodische Experimente als zusammenhängender Forschungsraum.</p>
    </div>
    <div class="card-grid compact-grid">${researchDocs.map((doc) => cardForDoc(doc, `pages/${doc.slug}.html`)).join("")}</div>
  </section>`;

  const linkedHtml = `<section class="content-band">
    <div class="section-heading">
      <h2>Stark verlinkte Knoten</h2>
      <p>Backlinks zeigen, welche Notizen im Vault als Orientierungspunkte fungieren.</p>
    </div>
    <div class="rank-list">
      ${mostLinked
        .map(
          ({ doc, count }) => `<a href="pages/${doc.slug}.html"><strong>${escapeHtml(doc.title)}</strong><span>${count} Backlinks · ${escapeHtml(doc.section)}</span></a>`,
        )
        .join("")}
    </div>
  </section>`;

  const notesHtml = `<section class="content-band" id="all-notes">
    <div class="section-heading">
      <h2>Alle Notizen</h2>
      <p>Kompletter Export aus dem Vault. Die Suche oben links filtert über Titel, Zusammenfassung, Abschnitt und Pfad.</p>
    </div>
    <div class="table-wrap notes-table">
      <table>
        <thead><tr><th>Titel</th><th>Abschnitt</th><th>Typ</th><th>Links</th></tr></thead>
        <tbody>
          ${docs
            .map(
              (doc) => `<tr data-note-card data-title="${escapeHtml(doc.title.toLowerCase())}" data-section="${escapeHtml(doc.section.toLowerCase())}">
                <td><a href="pages/${doc.slug}.html">${escapeHtml(doc.title)}</a><small>${escapeHtml(doc.rel)}</small></td>
                <td>${escapeHtml(doc.section)}</td>
                <td>${escapeHtml(doc.kind)}</td>
                <td>${doc.urls.length} extern · ${doc.outgoing.length} intern</td>
              </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </section>`;

  return layout({
    title: "Atlas",
    description: "GitHub-Pages-Wissenshub aus dem AI_Postproduktion_VFX_Vault",
    navHtml: navTreeHtml(docs, ""),
    body: `${hero}${featuredHtml}${sectionsHtml}${toolsHtml}${researchHtml}${linkedHtml}${notesHtml}`,
    extraClass: "atlas-page",
  });
}

function buildLinksPage(docs, allUrls) {
  const grouped = allUrls.reduce((map, item) => {
    const domain = domainOf(item.url);
    if (!map.has(domain)) map.set(domain, []);
    map.get(domain).push(item);
    return map;
  }, new Map());
  const groups = [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const body = `<article class="article-page link-index">
    <header class="article-hero">
      <p class="meta-line">${allUrls.length} externe URLs · ${groups.length} Domains</p>
      <h1>Quellen und externe Verlinkungen</h1>
      <p>Automatisch aus allen Markdown-Dateien extrahiert. Jede Quelle bleibt mit der Vault-Notiz verknüpft, aus der sie stammt.</p>
    </header>
    <div class="domain-grid">
      ${groups
        .map(
          ([domain, links]) => `<section>
            <h2>${escapeHtml(domain)} <span>${links.length}</span></h2>
            <ul>
              ${links
                .map(
                  (item) => `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.url)}</a><small>aus <a href="pages/${item.doc.slug}.html">${escapeHtml(item.doc.title)}</a></small></li>`,
                )
                .join("")}
            </ul>
          </section>`,
        )
        .join("")}
    </div>
  </article>`;
  return layout({
    title: "Links",
    description: "Externe Quellen und Verlinkungen aus dem AI Postproduktion VFX Vault",
    navHtml: navTreeHtml(docs, ""),
    body,
    extraClass: "links-page",
  });
}

function buildAttachmentsPage(docs, attachments) {
  const body = `<article class="article-page">
    <header class="article-hero">
      <p class="meta-line">${attachments.length} lokale Dateien</p>
      <h1>Rohquellen und Assets</h1>
      <p>Lokale PDFs und Materialien aus <code>raw/assets</code>, in den GitHub-Pages-Export kopiert.</p>
    </header>
    <div class="attachment-list">
      ${attachments
        .map(
          (item) => `<a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.rel)}</span>
          </a>`,
        )
        .join("") || "<p>Keine lokalen Assets gefunden.</p>"}
    </div>
  </article>`;
  return layout({
    title: "Rohquellen",
    description: "Lokale Rohquellen und Assets aus dem Vault",
    navHtml: navTreeHtml(docs, ""),
    body,
    extraClass: "attachments-page",
  });
}

function buildNotePage(doc, docs, backlinks, docsByRel, docsByBase) {
  const articleHtml = markdownToHtml(doc.markdown, doc, docsByRel, docsByBase);
  const extLinks = doc.urls
    .map((url) => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(domainOf(url))}</a><small>${escapeHtml(url)}</small></li>`)
    .join("");
  const back = (backlinks.get(doc.rel) || [])
    .map((source) => `<li><a href="${source.slug}.html">${escapeHtml(source.title)}</a><small>${escapeHtml(source.section)}</small></li>`)
    .join("");
  const headings = doc.headings
    .map((heading) => `<a class="h${heading.level}" href="#${heading.id}">${escapeHtml(heading.text)}</a>`)
    .join("");
  const outgoing = doc.outgoing
    .map((target) => `<li><a href="${target.slug}.html">${escapeHtml(target.title)}</a><small>${escapeHtml(target.section)}</small></li>`)
    .join("");

  const body = `<article class="article-page">
    <header class="article-hero">
      <p class="meta-line">${escapeHtml(doc.section)} · ${escapeHtml(doc.kind)} · ${escapeHtml(doc.rel)}</p>
      <h1>${escapeHtml(doc.title)}</h1>
      <p>${escapeHtml(doc.summary)}</p>
    </header>
    <div class="article-layout">
      <div class="article-body">${articleHtml}</div>
      <aside class="article-meta">
        <section>
          <h2>Auf dieser Seite</h2>
          <div class="toc">${headings || "<span>Keine Zwischenüberschriften</span>"}</div>
        </section>
        <section>
          <h2>Interne Links</h2>
          <ul>${outgoing || "<li><span>Keine internen Ausgänge</span></li>"}</ul>
        </section>
        <section>
          <h2>Backlinks</h2>
          <ul>${back || "<li><span>Keine Backlinks</span></li>"}</ul>
        </section>
        <section>
          <h2>Externe Quellen</h2>
          <ul>${extLinks || "<li><span>Keine externen URLs</span></li>"}</ul>
        </section>
      </aside>
    </div>
  </article>`;

  return layout({
    title: doc.title,
    description: doc.summary,
    activeRel: doc.rel,
    fromDoc: doc,
    navHtml: navTreeHtml(docs, doc.rel, doc),
    body,
    extraClass: "note-page",
  });
}

function stylesCss() {
  return `:root {
  color-scheme: light;
  --bg: #f7f8f3;
  --paper: #ffffff;
  --ink: #141414;
  --muted: #63615c;
  --line: #d9ddd2;
  --soft: #ecefe6;
  --teal: #0b9aaa;
  --coral: #de4a2c;
  --violet: #6d5bd0;
  --gold: #d19400;
  --green: #0f766e;
  --shadow: 0 20px 60px rgba(20, 20, 20, .09);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background:
    linear-gradient(90deg, rgba(11,154,170,.08) 0 1px, transparent 1px 100%),
    linear-gradient(0deg, rgba(222,74,44,.06) 0 1px, transparent 1px 100%),
    var(--bg);
  background-size: 48px 48px;
  color: var(--ink);
  line-height: 1.55;
}
a { color: inherit; }
.skip-link {
  position: absolute;
  left: 12px;
  top: -80px;
  background: var(--ink);
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  z-index: 20;
}
.skip-link:focus { top: 12px; }
.site-top {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 72px;
  padding: 12px 28px;
  border-bottom: 1px solid var(--line);
  background: rgba(247, 248, 243, .92);
  backdrop-filter: blur(18px);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: var(--ink);
  color: white;
  font-weight: 800;
  letter-spacing: 0;
}
.brand strong,
.brand small { display: block; }
.brand small {
  color: var(--muted);
  font-size: 12px;
  margin-top: 1px;
}
.top-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.top-nav a,
.button {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255,255,255,.72);
  text-decoration: none;
  font-size: 14px;
  font-weight: 650;
}
.button.primary {
  background: var(--ink);
  border-color: var(--ink);
  color: white;
}
.site-shell {
  display: grid;
  grid-template-columns: 310px minmax(0, 1fr);
  min-height: calc(100vh - 72px);
}
.side-nav {
  position: sticky;
  top: 72px;
  align-self: start;
  height: calc(100vh - 72px);
  overflow: auto;
  border-right: 1px solid var(--line);
  background: rgba(255,255,255,.58);
  padding: 18px;
}
.search-box {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}
.search-box span {
  font-size: 12px;
  font-weight: 760;
  text-transform: uppercase;
  color: var(--muted);
}
.search-box input {
  width: 100%;
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
  background: white;
  color: var(--ink);
  font: inherit;
}
.search-results {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}
.search-results a {
  display: block;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: white;
  padding: 10px;
  text-decoration: none;
}
.search-results strong,
.search-results small { display: block; }
.search-results small { color: var(--muted); }
.nav-tree details {
  border-top: 1px solid var(--line);
  padding: 9px 0;
}
.nav-tree summary {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 760;
  font-size: 14px;
}
.nav-tree summary span {
  color: var(--muted);
  font-weight: 650;
}
.nav-links {
  display: grid;
  gap: 2px;
  padding: 8px 0 0;
}
.nav-links a {
  display: block;
  padding: 7px 8px;
  border-radius: 7px;
  text-decoration: none;
  color: #363632;
  font-size: 13px;
}
.nav-links a:hover,
.nav-links a[aria-current="page"] {
  background: var(--soft);
  color: var(--ink);
}
.main-content {
  min-width: 0;
  padding: 34px;
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, .64fr);
  gap: 30px;
  align-items: center;
  min-height: calc(100vh - 140px);
  padding-bottom: 46px;
}
.hero-copy,
.hero-visual {
  min-width: 0;
}
.hero-copy > * {
  max-width: 100%;
}
.meta-line {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 760;
  text-transform: uppercase;
}
h1, h2, h3, h4 {
  letter-spacing: 0;
  line-height: 1.04;
}
.hero h1 {
  max-width: 880px;
  margin: 0;
  font-size: clamp(42px, 5.6vw, 78px);
  font-weight: 820;
  overflow-wrap: break-word;
  hyphens: manual;
}
.lede,
.article-hero > p {
  max-width: 790px;
  color: #383834;
  font-size: clamp(18px, 2vw, 24px);
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  gap: 10px;
  margin: 36px 0 0;
}
.stats-row div {
  border-top: 3px solid var(--ink);
  padding-top: 10px;
}
.stats-row dt {
  font-size: 32px;
  font-weight: 820;
}
.stats-row dd {
  margin: 0;
  color: var(--muted);
}
.knowledge-graph {
  width: 100%;
  height: auto;
  filter: drop-shadow(var(--shadow));
}
.knowledge-graph rect {
  fill: #fbfbf7;
  stroke: var(--line);
}
.knowledge-graph line {
  stroke: #9aa49b;
  stroke-width: 2;
}
.knowledge-graph text {
  fill: white;
  font-size: 13px;
  font-weight: 780;
}
.knowledge-graph .graph-title {
  fill: var(--ink);
  font-size: 22px;
}
.knowledge-graph .stat-label {
  fill: var(--muted);
  font-size: 13px;
  font-weight: 650;
}
.content-band {
  padding: 42px 0;
  border-top: 1px solid var(--line);
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}
.section-heading h2,
.article-meta h2 {
  margin: 0;
  font-size: 28px;
}
.section-heading p {
  max-width: 620px;
  margin: 0;
  color: var(--muted);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.compact-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.note-card {
  min-height: 188px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255,255,255,.78);
  padding: 16px;
  box-shadow: 0 12px 34px rgba(20,20,20,.04);
}
.note-card a {
  display: grid;
  gap: 8px;
  text-decoration: none;
}
.note-card span {
  color: var(--coral);
  font-size: 12px;
  font-weight: 780;
  text-transform: uppercase;
}
.note-card strong {
  font-size: 18px;
  line-height: 1.15;
}
.note-card p {
  color: var(--muted);
  font-size: 14px;
}
.section-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}
.section-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: white;
  padding: 12px;
  text-decoration: none;
}
.section-list strong {
  color: var(--teal);
}
.rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}
.rank-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.rank-list a {
  display: grid;
  gap: 8px;
  border-left: 5px solid var(--violet);
  background: white;
  padding: 14px;
  border-radius: 8px;
  text-decoration: none;
}
.rank-list span,
td small,
.article-meta small {
  display: block;
  color: var(--muted);
  font-size: 12px;
}
.table-wrap {
  width: 100%;
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: white;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}
th {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--muted);
  background: #f1f4ee;
}
.article-page {
  max-width: 1400px;
  margin: 0 auto;
}
.article-hero {
  padding: 30px 0 34px;
  border-bottom: 1px solid var(--line);
}
.article-hero h1 {
  max-width: 980px;
  margin: 0;
  font-size: clamp(38px, 5vw, 74px);
}
.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  gap: 34px;
  align-items: start;
}
.article-body {
  min-width: 0;
  padding: 30px 0 70px;
}
.article-body h1 { display: none; }
.article-body h2 {
  margin-top: 42px;
  font-size: 31px;
}
.article-body h3 {
  margin-top: 30px;
  font-size: 23px;
}
.article-body p,
.article-body li {
  font-size: 17px;
}
.article-body a {
  color: #005f70;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.article-body code,
.article-hero code {
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #f0f3ed;
  padding: 1px 5px;
  font-size: .92em;
}
pre {
  overflow: auto;
  border-radius: 8px;
  background: #161616;
  color: white;
  padding: 16px;
}
blockquote {
  margin: 22px 0;
  border-left: 5px solid var(--gold);
  background: rgba(209,148,0,.09);
  padding: 12px 16px;
}
.missing-link {
  border-bottom: 1px dashed var(--coral);
  color: var(--coral);
}
.article-meta {
  position: sticky;
  top: 96px;
  display: grid;
  gap: 14px;
  padding: 30px 0;
}
.article-meta section {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255,255,255,.78);
  padding: 14px;
}
.article-meta h2 {
  margin-bottom: 10px;
  font-size: 15px;
}
.article-meta ul {
  list-style: none;
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
}
.article-meta a {
  text-decoration: none;
  color: #005f70;
}
.toc {
  display: grid;
  gap: 6px;
}
.toc a {
  font-size: 13px;
  text-decoration: none;
}
.toc .h3 { padding-left: 12px; color: var(--muted); }
.domain-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  padding: 30px 0 70px;
}
.domain-grid section,
.attachment-list a {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255,255,255,.8);
  padding: 16px;
}
.domain-grid h2 {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 12px;
  font-size: 19px;
}
.domain-grid h2 span {
  color: var(--coral);
}
.domain-grid ul {
  list-style: none;
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 0;
}
.domain-grid li a {
  overflow-wrap: anywhere;
}
.domain-grid small {
  display: block;
  color: var(--muted);
}
.attachment-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 30px 0;
}
.attachment-list a {
  display: grid;
  gap: 8px;
  text-decoration: none;
}
.attachment-list span {
  color: var(--muted);
  overflow-wrap: anywhere;
}
@media (max-width: 1180px) {
  .site-shell { grid-template-columns: 1fr; }
  .side-nav {
    position: relative;
    top: 0;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .nav-tree { display: none; }
  .hero,
  .article-layout { grid-template-columns: 1fr; }
  .article-meta { position: static; }
  .card-grid,
  .compact-grid,
  .rank-list,
  .section-list,
  .domain-grid,
  .attachment-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px) {
  body { overflow-x: hidden; }
  .site-top {
    position: relative;
    flex-direction: column;
    align-items: stretch;
    padding: 14px;
    max-width: 100vw;
    overflow: hidden;
  }
  .top-nav {
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .top-nav a {
    justify-content: center;
    min-width: 0;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 13px;
  }
  .site-shell { min-height: 0; }
  .main-content {
    width: 100vw;
    max-width: 100vw;
    padding: 18px;
    overflow: hidden;
  }
  .hero { min-height: auto; gap: 22px; }
  .hero-copy,
  .hero-copy > *,
  .lede {
    width: 100%;
    max-width: calc(100vw - 36px);
  }
  .hero h1 {
    max-width: 100%;
    font-size: 34px;
    line-height: 1.08;
  }
  .hero-visual { max-width: 100%; }
  .stats-row,
  .card-grid,
  .compact-grid,
  .rank-list,
  .section-list,
  .domain-grid,
  .attachment-list { grid-template-columns: 1fr; }
  .section-heading {
    display: grid;
    align-items: start;
  }
  .article-hero h1 { font-size: 38px; }
}`;
}

function searchJs() {
  return `(() => {
  const input = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  const cards = [...document.querySelectorAll("[data-note-card]")];
  if (!input || !window.VAULT_SEARCH_INDEX) return;

  function renderResults(query) {
    const normalized = query.trim().toLowerCase();
    cards.forEach((card) => {
      if (!normalized) {
        card.hidden = false;
        return;
      }
      const haystack = [card.dataset.title || "", card.dataset.section || "", card.textContent || ""].join(" ").toLowerCase();
      card.hidden = !haystack.includes(normalized);
    });
    if (!results) return;
    if (normalized.length < 2) {
      results.innerHTML = "";
      return;
    }
    const matches = window.VAULT_SEARCH_INDEX
      .map((item) => ({ item, haystack: [item.title, item.section, item.summary, item.rel].join(" ").toLowerCase() }))
      .filter(({ haystack }) => haystack.includes(normalized))
      .slice(0, 8);
    const inNoteFolder = location.pathname.includes("/pages/");
    results.innerHTML = matches
      .map(({ item }) => {
        const href = inNoteFolder && item.href.startsWith("pages/") ? "../" + item.href : item.href;
        return '<a href="' + href + '"><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.section + ' · ' + item.rel) + '</small></a>';
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  input.addEventListener("input", () => renderResults(input.value));
})();`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#141414"/>
  <text x="32" y="39" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="#fff">DR</text>
</svg>`;
}

function copyAttachments() {
  const rawAssets = path.join(vaultRoot, "raw", "assets");
  const outAssets = path.join(docsRoot, "assets", "raw");
  const attachments = [];
  if (!fs.existsSync(rawAssets)) return attachments;
  const files = walk(rawAssets).filter((file) => fs.statSync(file).isFile());
  for (const file of files) {
    const rel = toPosix(path.relative(rawAssets, file));
    const destination = path.join(outAssets, rel);
    ensureDir(path.dirname(destination));
    fs.copyFileSync(file, destination);
    attachments.push({
      name: path.basename(file),
      rel: `raw/assets/${rel}`,
      href: `assets/raw/${rel.split("/").map(encodeURIComponent).join("/")}`,
    });
  }
  return attachments;
}

function build() {
  const mdFiles = walk(vaultRoot)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => toPosix(path.relative(vaultRoot, a)).localeCompare(toPosix(path.relative(vaultRoot, b)), "de"));

  const docs = mdFiles.map((file) => {
    const rel = toPosix(path.relative(vaultRoot, file));
    const markdown = fs.readFileSync(file, "utf8");
    return {
      file,
      rel,
      slug: slugForRel(rel),
      title: extractTitle(markdown, rel),
      summary: extractSummary(markdown),
      headings: extractHeadings(markdown),
      urls: extractUrls(markdown),
      section: sectionForRel(rel),
      kind: kindForRel(rel),
      markdown,
      outgoing: [],
    };
  });

  const slugCounts = new Map();
  for (const doc of docs) {
    const count = slugCounts.get(doc.slug) || 0;
    slugCounts.set(doc.slug, count + 1);
    if (count > 0) doc.slug = `${doc.slug}-${count + 1}`;
  }

  const docsByRel = new Map(docs.map((doc) => [doc.rel, doc]));
  const docsByBase = new Map();
  for (const doc of docs) {
    const base = normalizeKey(path.basename(doc.rel, ".md"));
    if (!docsByBase.has(base)) docsByBase.set(base, []);
    docsByBase.get(base).push(doc);
  }

  const backlinks = new Map();
  for (const doc of docs) {
    const links = [...doc.markdown.matchAll(/\[\[([^\]]+)\]\]/g)];
    const outgoing = new Map();
    for (const match of links) {
      const target = match[1].split("|")[0].trim();
      const resolved = resolveTarget(target, doc.rel, docsByRel, docsByBase);
      if (resolved?.doc && resolved.doc.rel !== doc.rel) outgoing.set(resolved.doc.rel, resolved.doc);
    }
    doc.outgoing = [...outgoing.values()];
    for (const target of doc.outgoing) {
      if (!backlinks.has(target.rel)) backlinks.set(target.rel, []);
      backlinks.get(target.rel).push(doc);
    }
  }

  removeDir(docsRoot);
  ensureDir(path.join(docsRoot, "assets"));
  ensureDir(path.join(docsRoot, "pages"));

  const attachments = copyAttachments();
  const allUrls = docs.flatMap((doc) => doc.urls.map((url) => ({ url, doc })));

  fs.writeFileSync(path.join(docsRoot, ".nojekyll"), "");
  fs.writeFileSync(path.join(docsRoot, "assets", "styles.css"), stylesCss());
  fs.writeFileSync(path.join(docsRoot, "assets", "favicon.svg"), faviconSvg());
  fs.writeFileSync(path.join(docsRoot, "assets", "search.js"), searchJs());
  fs.writeFileSync(
    path.join(docsRoot, "assets", "search-index.js"),
    `window.VAULT_SEARCH_INDEX = ${JSON.stringify(
      docs.map((doc) => ({
        title: doc.title,
        section: doc.section,
        summary: doc.summary,
        rel: doc.rel,
        href: `pages/${doc.slug}.html`,
      })),
      null,
      2,
    )};\n`,
  );

  fs.writeFileSync(path.join(docsRoot, "index.html"), buildIndex(docs, allUrls, attachments, backlinks));
  fs.writeFileSync(path.join(docsRoot, "links.html"), buildLinksPage(docs, allUrls));
  fs.writeFileSync(path.join(docsRoot, "attachments.html"), buildAttachmentsPage(docs, attachments));
  fs.writeFileSync(path.join(docsRoot, "404.html"), buildIndex(docs, allUrls, attachments, backlinks));

  for (const doc of docs) {
    const html = buildNotePage(doc, docs, backlinks, docsByRel, docsByBase);
    fs.writeFileSync(path.join(docsRoot, "pages", `${doc.slug}.html`), html);
  }

  fs.writeFileSync(
    path.join(docsRoot, "site-manifest.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        notes: docs.length,
        externalLinks: allUrls.length,
        attachments: attachments.length,
        pages: docs.map((doc) => ({ title: doc.title, rel: doc.rel, href: `pages/${doc.slug}.html` })),
      },
      null,
      2,
    ),
  );

  console.log(`Built ${docs.length} notes, ${allUrls.length} external links and ${attachments.length} attachments into ${docsRoot}`);
}

build();
