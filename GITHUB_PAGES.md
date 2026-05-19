# GitHub Pages Export

Dieser Vault kann als statische GitHub-Pages-Seite veröffentlicht werden.

## Lokal bauen

```bash
node scripts/build-pages.mjs
```

Der Output landet in `docs/`:

- `docs/index.html` als Atlas-Startseite
- `docs/strands.html` als kuratierte Forschungs- und Lesestränge
- `docs/pages/*.html` als gerenderte Vault-Notizen
- `docs/links.html` als externer Linkindex
- `docs/attachments.html` als Liste lokaler Rohquellen
- `docs/assets/search-index.js` fuer die Suche
- `docs/assets/daily-thesis.js` fuer die These des Tages
- `docs/site-manifest.json` als maschinenlesbarer Exportbericht

## Auf GitHub veroeffentlichen

### Empfohlen: Branch `gh-pages`

GitHub Pages sollte auf den Branch `gh-pages` zeigen:

1. `Settings -> Pages`
2. `Build and deployment -> Source -> Deploy from a branch`
3. Branch `gh-pages`, Ordner `/ (root)`
4. Speichern

Die erwartete URL ist:

```text
https://maicoding.github.io/vfx/
```

`main` enthaelt den Vault und den Generator. `docs/` ist dort ignoriert, damit der generierte Export nicht doppelt versioniert wird. Der Workflow `.github/workflows/pages.yml` baut bei jedem Push auf `main` neu und pusht den fertigen statischen Export nach `gh-pages`.

### Manuell neu deployen

Der Workflow kann auch ueber `Actions -> Publish GitHub Pages -> Run workflow` manuell gestartet werden.

## Inhaltliche Logik

Markdown bleibt die Quelle der Wahrheit. Die Seite loest Obsidian-Wikilinks auf, extrahiert externe URLs, erzeugt Backlinks, kopiert lokale `raw/assets`-Dateien und macht alles ueber eine statische Suche auffindbar.

Zusaetzlich kuratiert der Generator Stränge wie `Digital Rooms als Promotionskern`, `Tool- und Modellradar`, `Evidence Layer` oder `Provenance, Recht und Verantwortung`. Jede passende Notiz zeigt ihre Strang-Mitgliedschaft inklusive Vor/Zurueck-Navigation. Die `These des Tages` wird clientseitig aus einer festen Thesenliste anhand des lokalen Datums gewaehlt und mit der jeweiligen Vault-Quelle verlinkt.
