# Digital Rooms, AI und Postproduktion

GitHub-Pages-Wissenshub aus dem Obsidian-Vault `AI_Postproduktion_VFX_Vault`.

Der Vault sammelt Recherche zu generativer KI, Postproduktion, VFX, Video- und Bildmodellen, Digital Rooms, Digital Image Space, Recht/Ethik/Provenance, Lehre, Promotion, Markt, Tools und Workflows.

## Online-Seite

Die statische Seite liegt in `docs/` und ist fuer GitHub Pages vorbereitet:

- `docs/index.html` als Atlas-Startseite
- `docs/pages/*.html` als gerenderte Vault-Notizen
- `docs/links.html` als extrahierter externer Linkindex
- `docs/attachments.html` als lokale Rohquellenliste
- `docs/assets/search-index.js` fuer die statische Suche

## Lokal neu bauen

```bash
node scripts/build-pages.mjs
```

Der Generator wandelt Markdown in HTML, loest Obsidian-Wikilinks auf, erzeugt Backlinks, extrahiert externe URLs und kopiert lokale Dateien aus `raw/assets`.

## GitHub Pages

Der Workflow `.github/workflows/pages.yml` deployt `docs/` automatisch, wenn GitHub Pages auf `GitHub Actions` gestellt ist.

Mehr Details: `GITHUB_PAGES.md`
