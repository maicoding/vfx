# Workflows

## Ingest

1. Neues Material in `raw/inbox/` lesen.
2. Neues Thema immer als `inbox -> scoping -> signal` behandeln.
3. Quelle, Datum, URL, Autor:in, Evidenztyp und Quellenstatus sichern.
4. Signal, Interpretation und Evidenz getrennt extrahieren.
5. Gegenbelege und konkurrierende Erklärungen suchen.
6. AI-Slop, rekursive Zitationen und niedrig-informative Wiederholung markieren.
7. Review-Notiz oder Extraktion in `review/` aktualisieren.
8. Relevante Seiten in der kompilierten Wiki nur aktualisieren, wenn die Aussage mindestens `evidence-reviewed` ist.
9. `00_Index/Start_Hier.md` immer aktualisieren, sobald sich Kernthese, Einstiegspfade, offene Fragen oder Prioritäten ändern.
10. `00_System/index.md` und bei Bedarf `wiki/index.md` aktualisieren.
11. `07_Notion_Sync/Notion_Sync.md` und die passende Notion-Seite nachziehen, wenn neue Hauptseiten, Synthesen oder Promotionsbausteine entstehen.
12. Bei grundlegenden Änderungen an Promotionsfokus, Kernthese, Theorieachsen oder Fallstudienlogik die Automation `Promotionsvault Digital Rooms Research-Scout` prüfen und bei Bedarf aktualisieren.
13. Eintrag in `00_System/log.md` und bei Bedarf `wiki/log.md` anhängen.

## Topic Lifecycle

Siehe [[topic_lifecycle|Topic Lifecycle]].

1. `inbox`: nur sammeln und taggen.
2. `scoping`: Fragen definieren und Domain mappen.
3. `signal`: Muster identifizieren, aber keine factual claims formulieren.
4. `evidence-linked`: nur mit Quellenrückverfolgbarkeit und Kontextvalidierung.
5. `claim-ready`: nur mit Mehrquellenvalidierung, Human Review und Widerspruchsprüfung.

Wöchentliche Automation:

- `source_refresh`
- `contradiction_scan`
- `topic_drift_scan`
- `confidence_decay`
- `slop_detection`

## Query

1. `00_System/index.md` lesen.
2. Relevante Seiten und Quellen öffnen.
3. Signal, Interpretation und Evidenz getrennt halten.
4. Gegenpositionen und schwache Evidenz sichtbar markieren.
5. Antwort mit Quellen- und Claim-Status formulieren.
6. Dauerhafte Erkenntnisse nur als Synthese oder Output ablegen, wenn sie mindestens `evidence-reviewed` sind.

## Denkraum

1. Rohideen, Analogien, Hypothesen und offene Fragen dürfen festgehalten werden.
2. Jede Denkraum-Notiz braucht einen Status: `scoping`, `signal`, `hypothesis`, `open question`, `contested` oder höher.
3. Denkraum darf verlinken und kombinieren, ohne bereits zu beweisen.
4. Denkraum-Notizen dürfen nicht als öffentliche Synthesen verwendet werden, solange sie nicht mindestens `evidence-reviewed` sind.
5. Productive ambiguity erhalten: konkurrierende Begriffe, Zweifel und Gegenpositionen nebeneinander stehen lassen.
6. Bei Verdichtung klar trennen: Was bleibt Denkspur, was wird Claim, was wird verworfen?

## Karpathy-Wissenszyklus

1. `capture`: Rohquelle, Gedanke, Frage oder Signal sichern.
2. `scope`: Thema abgrenzen und Suchrichtung formulieren.
3. `link`: mit Quellen, Konzepten, Gegenpositionen und offenen Fragen verbinden.
4. `compress`: lange Materialien zu Karten, Thesen, Unterscheidungen oder Begriffen verdichten.
5. `question`: Lücken, Gegenbelege und bessere Begriffe suchen.
6. `compile`: geprüfte Erkenntnisse in Wiki, Startseite, Notion oder Automation übernehmen.
7. `reuse`: alte Notizen aktiv reaktivieren, wenn eine neue Frage sie wieder relevant macht.

Outputs sind nicht Endpunkte. Wenn ein Output dauerhaft Erkenntniswert hat, wird er zurück in Quellenkarten, Konzepte, Forschungsfragen, Methoden oder Synthesen integriert.

## Agentic Research und Workflow Automation

Agentische Workflows dürfen hier nur als kontrollierte Research- und Produktionsassistenz genutzt werden.

Geeignet:

1. Tool- und Modellrecherche mit Quellenpflicht.
2. Vergleich von Workflows nach Produktionsphase.
3. Extraktion von Skills, Risiken und Use Cases aus Artikeln.
4. Vorbereitung von Compositing-, Relighting- oder Video-Prompt-Tests.
5. Prüfung von Quellen auf Aktualität, Herstellerinteresse und Evidenzstatus.

Nicht geeignet:

1. Rechts- oder Ethikentscheidungen final automatisieren.
2. Quellen ohne menschliche Prüfung in Synthesen übernehmen.
3. Personenbezogene oder urheberrechtlich heikle Daten ungeprüft verarbeiten.
4. Tool-Empfehlungen ohne Datum, Quellenstatus und Modellversion speichern.

Minimalstruktur für Agentenaufträge:

```text
ROLE
GOAL
SCOPE
INPUTS
TOOLS
CHECKS
HUMAN CHECKPOINTS
OUTPUT
STOP RULES
```

Prüffragen:

- Ist die Quelle primär, aktuell und belastbar?
- Ist der Claim traceable?
- Gibt es Gegenbelege oder alternative Erklärungen?
- Ist die Aussage nur fluide formuliert oder wirklich belegt?
- Liegt AI-Slop, rekursive Zitation oder low-information repetition vor?
- Ist der Workflow reproduzierbar?
- Welche Annahmen wurden vom Modell ergänzt?
- Wo braucht es ein menschliches Urteil?
- Was ist nur Tool-Marketing?

## Lint

1. Fehlende Quellen, Widersprüche und veraltete Aussagen suchen.
2. Claims ohne Quellenrückverfolgbarkeit markieren.
3. Synthesen ohne `claim-ready`-Status zurückstufen.
4. Denkraum-Notizen nicht fälschlich als Claims behandeln.
5. Prüfen, ob wertvolle Outputs zurück in die Wiki kompiliert wurden.
6. Orphans, fehlende Backlinks und doppelte Begriffe markieren.
7. Prüfen, ob Startseite, Notion-Sync und Automation dem aktuellen Promotionsfokus entsprechen.
8. Dauerhafte Befunde in `00_System/health_check.md` oder der passenden Quellen-/Syntheseseite notieren.
