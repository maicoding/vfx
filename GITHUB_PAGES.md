# GitHub Pages Export

Dieser Vault kann als statische GitHub-Pages-Seite veröffentlicht werden.

## Lokal bauen

```bash
node scripts/build-pages.mjs
```

Der Output landet in `docs/`:

- `docs/index.html` als Atlas-Startseite
- `docs/pages/*.html` als gerenderte Vault-Notizen
- `docs/links.html` als externer Linkindex
- `docs/attachments.html` als Liste lokaler Rohquellen
- `docs/assets/search-index.js` fuer die Suche
- `docs/site-manifest.json` als maschinenlesbarer Exportbericht

## Auf GitHub veroeffentlichen

Empfohlen: Diesen Vault-Ordner als eigenes Repository pushen. Danach in GitHub:

1. `Settings -> Pages`
2. `Build and deployment -> Source -> GitHub Actions`
3. Workflow `Deploy GitHub Pages` ausfuehren oder auf `main` pushen

Der Workflow baut den Vault mit `node scripts/build-pages.mjs` und deployt den `docs/`-Ordner.

## Inhaltliche Logik

Markdown bleibt die Quelle der Wahrheit. Die Seite loest Obsidian-Wikilinks auf, extrahiert externe URLs, erzeugt Backlinks, kopiert lokale `raw/assets`-Dateien und macht alles ueber eine statische Suche auffindbar.
