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

Das Repository ist fuer zwei Veroeffentlichungswege vorbereitet.

### Empfohlen: Branch `gh-pages`

Der fertige statische Export wurde in den Branch `gh-pages` gepusht. Danach in GitHub:

1. `Settings -> Pages`
2. `Build and deployment -> Source -> Deploy from a branch`
3. Branch `gh-pages`, Ordner `/ (root)`
4. Speichern

Die erwartete URL ist:

```text
https://maicoding.github.io/vfx/
```

### Optional: GitHub Actions

Der Workflow `.github/workflows/pages.yml` kann manuell ausgefuehrt werden, wenn GitHub Pages im Repository auf `GitHub Actions` gestellt ist:

1. `Settings -> Pages`
2. `Build and deployment -> Source -> GitHub Actions`
3. Workflow `Deploy GitHub Pages` manuell ausfuehren

Hinweis: Der GitHub-Actions-Token durfte Pages in diesem Repository nicht selbst aktivieren. Deshalb ist der `gh-pages`-Branch der robustere Erstveroeffentlichungsweg.

## Inhaltliche Logik

Markdown bleibt die Quelle der Wahrheit. Die Seite loest Obsidian-Wikilinks auf, extrahiert externe URLs, erzeugt Backlinks, kopiert lokale `raw/assets`-Dateien und macht alles ueber eine statische Suche auffindbar.
