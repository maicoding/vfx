# Digital Rooms, AI und Postproduktion

## Karpathy-Status

- Lifecycle: `scoping`
- Rolle: Arbeitsnotiz
- Evidenzmodus: Material und Verlinkung
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: nicht als Claim verwenden.
- Nächster Prüfschritt: Status prüfen.
GitHub-Pages-Wissenshub aus dem Obsidian-Vault `AI_Postproduktion_VFX_Vault`.

Der Vault sammelt Recherche zu generativer KI, Postproduktion, VFX, Video- und Bildmodellen, Digital Rooms, Digital Image Space, Recht/Ethik/Provenance, Lehre, Promotion, Markt, Tools und Workflows.

## Online-Seite

Die Live-Seite liegt auf GitHub Pages:

```text
https://maicoding.github.io/vfx/
```

`main` bleibt die Quelle der Wahrheit für Vault-Inhalte, Generator und Workflow. Der statische Export wird aus `docs/` gebaut und automatisch in den Branch `gh-pages` veröffentlicht.

Der Pages-Export ist bewusst auf Inhalte kuratiert: interne Betriebs-, Sync-, System- und Workflow-Notizen bleiben im Vault, werden aber nicht in die öffentliche Seite, Suche, Backlinks oder Linklisten übernommen.

Die Seite enthält:

- `index.html` als Atlas-Startseite
- `strands.html` als kuratierte Forschungs- und Lesestränge
- `pages/*.html` als gerenderte Vault-Notizen
- `links.html` als extrahierter externer Linkindex
- `attachments.html` als lokale Rohquellenliste
- `assets/search-index.js` für die statische Suche
- `assets/daily-thesis.js` für die These des Tages

## Lokal neu bauen

```bash
node scripts/build-pages.mjs
```

Der Generator wandelt öffentliche Markdown-Inhalte in HTML, löst Obsidian-Wikilinks auf, erzeugt Backlinks, extrahiert externe URLs, kopiert lokale Dateien aus `raw/assets`, baut Strang-Navigationen und schreibt eine maschinenlesbare `site-manifest.json`.

## GitHub Pages

Empfohlener Weg für dieses Repository:

1. In GitHub `Settings -> Pages` öffnen.
2. `Build and deployment -> Source -> Deploy from a branch` wählen.
3. Branch `gh-pages` und Ordner `/ (root)` auswählen.
4. Speichern.

Der Workflow `.github/workflows/pages.yml` baut bei jedem Push auf `main` neu und pusht den fertigen Export nach `gh-pages`.

Mehr Details: `GITHUB_PAGES.md`
