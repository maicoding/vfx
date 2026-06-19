---
title: "Graph Query Layer"
type: operation
status: draft
created: 2026-06-16
updated: 2026-06-16
tags: [operation, graph, query-layer, agenten, obsidian]
sources: []
---

# Graph Query Layer

## Karpathy-Status

- Lifecycle: `system-rule / graph`
- Rolle: Systemregel / Workflow
- Evidenzmodus: Regeltext, keine Forschungsclaim-Seite
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: Regel anwenden, nicht als Evidenz zitieren.
- Nächster Prüfschritt: Bei Graph- oder Workflow-Änderung synchronisieren.

## Vor Änderungen an Seiten

- Welche Seiten linken auf diesen Knoten?
- Welche Seiten werden von diesem Knoten verlinkt?
- Welche Quellen, Review-Seiten oder MOCs sind betroffen?
- Welche Cross-Vault-Brücken sind betroffen?
- Welche Knoten haben `stuetzt`, `konkretisiert`, `braucht_review` oder `uebertraegt_auf`?

## Vor Änderungen an Quellen

- Welche Konzeptseiten führen diese Quelle?
- Welche Synthesen nutzen diese Quelle als Beleg?
- Welche Review-Notizen nennen diese Quelle?
- Welche Claims würden schwächer, wenn die Quelle relativiert wird?

## Dataview-Skizzen

```dataview
TABLE type, status, tags
FROM ""
WHERE contains(tags, "graph") OR contains(tags, "map")
SORT file.name ASC
```

```dataview
TABLE status, sources
FROM ""
WHERE contains(file.outlinks, this.file.link)
SORT file.name ASC
```

## Verbindungen

- [[../maps/ai-postproduktion-vfx-vault-knowledge-graph]]
- [[../maps/ai-postproduktion-vfx-vault-graph-edges]]
- [[../maps/ai-postproduktion-vfx-vault-cross-vault-bridge]]
