# Digital Rooms, AI und Postproduktion

GitHub-Pages-Wissenshub aus dem Obsidian-Vault `AI_Postproduktion_VFX_Vault`.

Der Vault sammelt Recherche zu generativer KI, Postproduktion, VFX, Video- und Bildmodellen, Digital Rooms, Digital Image Space, Recht/Ethik/Provenance, Lehre, Promotion, Markt, Tools und Workflows.

## Online-Seite

Die Live-Seite liegt auf GitHub Pages:

```text
https://maicoding.github.io/vfx/
```

`main` bleibt die Quelle der Wahrheit fuer Vault-Inhalte, Generator und Workflow. Der statische Export wird aus `docs/` gebaut und automatisch in den Branch `gh-pages` veroeffentlicht.

Die Seite enthaelt:

- `index.html` als Atlas-Startseite
- `strands.html` als kuratierte Forschungs- und Lesestränge
- `pages/*.html` als gerenderte Vault-Notizen
- `links.html` als extrahierter externer Linkindex
- `attachments.html` als lokale Rohquellenliste
- `assets/search-index.js` fuer die statische Suche
- `assets/daily-thesis.js` fuer die These des Tages

## Lokal neu bauen

```bash
node scripts/build-pages.mjs
```

Der Generator wandelt Markdown in HTML, loest Obsidian-Wikilinks auf, erzeugt Backlinks, extrahiert externe URLs, kopiert lokale Dateien aus `raw/assets`, baut Strang-Navigationen und schreibt eine maschinenlesbare `site-manifest.json`.

## GitHub Pages

Empfohlener Weg fuer dieses Repository:

1. In GitHub `Settings -> Pages` oeffnen.
2. `Build and deployment -> Source -> Deploy from a branch` waehlen.
3. Branch `gh-pages` und Ordner `/ (root)` auswaehlen.
4. Speichern.

Der Workflow `.github/workflows/pages.yml` baut bei jedem Push auf `main` neu und pusht den fertigen Export nach `gh-pages`.

Mehr Details: `GITHUB_PAGES.md`
