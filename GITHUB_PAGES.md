# GitHub Pages Export

Dieser Vault kann als statische GitHub-Pages-Seite veröffentlicht werden.

## Lokal bauen

```bash
node scripts/build-pages.mjs
```

Suchqualität prüfen:

```bash
node scripts/test-search-index.mjs
```

Der Output landet in `docs/`:

- `docs/index.html` als Atlas-Startseite
- `docs/strands.html` als kuratierte Forschungs- und Lesestränge
- `docs/pages/*.html` als gerenderte Vault-Notizen
- `docs/links.html` als externer Linkindex
- `docs/attachments.html` als Liste lokaler Rohquellen
- `docs/assets/search-index.js` für die Suche
- `docs/assets/daily-thesis.js` für die These des Tages
- `docs/site-manifest.json` als maschinenlesbarer Exportbericht

Der Export ist eine öffentliche Inhaltsschicht. Interne Betriebs-, Sync-, System- und Workflow-Notizen bleiben im Repository, werden aber vor dem Rendern aus Markdown, Suche, Backlinks und Linklisten herausgefiltert.

## Auf GitHub veröffentlichen

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

`main` enthält den Vault und den Generator. `docs/` ist dort ignoriert, damit der generierte Export nicht doppelt versioniert wird. Der Workflow `.github/workflows/pages.yml` baut bei jedem Push auf `main` neu und pusht den fertigen statischen Export nach `gh-pages`.

### Manuell neu deployen

Der Workflow kann auch über `Actions -> Publish GitHub Pages -> Run workflow` manuell gestartet werden.

## Inhaltliche Logik

Markdown bleibt die Quelle der Wahrheit. Die Seite löst Obsidian-Wikilinks auf, extrahiert externe URLs, erzeugt Backlinks, kopiert lokale `raw/assets`-Dateien und macht die öffentlichen Inhaltsnotizen über eine statische Suche auffindbar.

Der Suchindex enthält Titel, Bereich, Kurzsummary, Überschriften, Pfad und einen gereinigten Textauszug. Interne System-, Workflow- und Notion-Notizen sowie Obsidian-Dubletten wie `* 2.md` werden bewusst nicht exportiert.

Zusätzlich kuratiert der Generator Stränge wie `Digital Rooms als Promotionskern`, `Tool- und Modellradar`, `Evidence Layer` oder `Provenance, Recht und Verantwortung`. Jede passende Notiz zeigt ihre Strang-Mitgliedschaft inklusive Vor/Zurück-Navigation. Die `These des Tages` wird clientseitig aus einer festen Thesenliste anhand des lokalen Datums gewählt und mit der jeweiligen Vault-Quelle verlinkt.
