# AGENTS.md

Arbeitsregeln für diesen Karpathy-Style LLM-Wiki-Vault.

## Zweck

Dieser Vault ist eine LLM-gepflegte Wissensbasis zu AI, Postproduktion, VFX, Tools, Workflows, Markt, Recht, Lehre und Promotion.

Das Ziel ist nicht Nutzerzufriedenheit, sondern Wissensqualität. Neue Quellen werden aus `raw/` in eine dauerhafte, verlinkte Markdown-Wiki-Struktur eingearbeitet, aber nur nach Evidenzprüfung.

## Karpathy-Style Denkraum

Der Vault bleibt ein Denkraum, nicht nur ein Belegarchiv. Rohideen, Analogien, Hypothesen, Begriffsversuche, offene Fragen und spekulative Verbindungen sind ausdrücklich erlaubt, solange ihr Status sichtbar bleibt.

Karpathy-Prinzip: Wissen wird nicht nur gefunden, sondern iterativ **gesammelt, komprimiert, verlinkt, befragt, wiederverwendet und neu kompiliert**. Der Vault soll deshalb nicht wie eine lineare Literaturliste funktionieren, sondern wie ein persönliches externes Gedächtnis: Rohmaterial bleibt zugänglich, Zwischengedanken bleiben sichtbar, gute Verdichtungen werden wieder in die Wiki zurückgeführt.

Denkraum-Regeln:

- Spekulieren ist erlaubt; als `scoping`, `signal`, `hypothesis` oder `open question` markieren.
- Ungeprüfte Ideen dürfen verlinkt, sortiert und weitergedacht werden, aber nicht als Claim erscheinen.
- Der Vault darf unvollständige Denkspuren behalten, wenn sie späteres Denken ermöglichen.
- Verdichtung ist erwünscht, aber nicht jede Denknotiz muss sofort zu einer Synthese werden.
- Ambivalente oder widersprüchliche Notizen dürfen nebeneinander stehen, solange der Konflikt sichtbar ist.
- Der Wert einer Notiz kann auch in ihrer Frage, Unschärfe oder Suchrichtung liegen.
- Die Wiki soll Wissen kompilieren und Denken ermöglichen; sie soll nicht nur fertige Antworten enthalten.
- Wiederverwendung ist Teil des Systems: alte Notizen dürfen neu gelesen, umsortiert, verdichtet, widersprochen und für neue Fragen reaktiviert werden.
- Gute Outputs werden nicht als Endprodukte behandelt, sondern als Material, das bei Wert zurück in Konzepte, Quellenkarten, Forschungsfragen oder Methoden wandert.
- Belegarchiv und Denkraum sind gleich wichtig: Evidenz schützt Claims, Denkraum erzeugt neue Suchrichtungen.

## Wissenszyklus

1. `capture`: Rohquelle, Gedanke, Frage oder Signal sichern.
2. `scope`: Thema abgrenzen, Begriffe klären, Suchrichtung formulieren.
3. `link`: mit Quellen, Konzepten, Gegenpositionen und offenen Fragen verbinden.
4. `compress`: lange Materialien zu präzisen Karten, Thesen oder Unterscheidungen verdichten.
5. `question`: Widersprüche, Lücken, Gegenbelege und bessere Begriffe suchen.
6. `compile`: nur ausreichend geprüfte Claims in Synthesen, Startseiten oder Notion übernehmen.
7. `reuse`: alte Notizen für neue Fragen reaktivieren und neu kompilieren.

## Epistemische Grundregeln

- Signal, Interpretation und Evidenz werden getrennt.
- Fluente Formulierungen gelten nie als Wahrheitsbeleg.
- Schwache Evidenz darf nicht zu starker Synthese hochgestuft werden.
- Widerspruch ist wertvoller als Bestätigung.
- Unsicherheit wird sichtbar markiert.
- AI-Slop, rekursive Zitationen und niedrig-informative Wiederholung werden aktiv gesucht.
- Claims brauchen Quellenrückverfolgbarkeit.
- Öffentlich nutzbare Synthesen brauchen `claim-ready`-Status.
- Neue Themen beginnen immer als `inbox -> scoping -> signal`.
- Kein Status-Upgrade ohne Evidenzreview.
- Gegenbelege und alternative Erklärungen werden aktiv gesucht.
- Ambiguität bleibt erhalten, solange die Evidenz unvollständig ist.
- Präzision hat Vorrang vor Vollständigkeit.
- Wahrheit hat Vorrang vor Nützlichkeit.

## Claim-Status

- `inbox`: unkuratierter Eingang, noch keine Bewertung.
- `scoping`: Thema wird abgegrenzt; Suchbegriffe, Begriffe und mögliche Quellen werden gesammelt.
- `signal`: erster Hinweis oder Praxisindikator; nicht synthese- oder claim-ready.
- `evidence-reviewed`: Quelle wurde auf Provenienz, Evidenztyp, Datum, Autor:in, Methode und Gegenbelege geprüft.
- `claim-ready`: Aussage ist für Synthese oder öffentliche Nutzung ausreichend belegt.
- `contested`: Aussage ist plausibel, aber durch Gegenbelege, unklare Quellenlage oder methodische Schwächen umstritten.
- `deprecated`: Aussage ist veraltet, widerlegt oder nicht mehr tragfähig.
- `hypothesis`: produktive, noch nicht belegte Denkfigur; darf in Denkraum und Scoping genutzt werden, aber nicht in öffentliche Synthesen.
- `open question`: explizite Forschungsfrage ohne ausreichende Evidenzlage.

Siehe auch: [[00_System/topic_lifecycle|Topic Lifecycle]]

## Topic Lifecycle

- `inbox`: erlaubt `collect`, `tag`.
- `scoping`: erlaubt `define_questions`, `map_domain`.
- `signal`: erlaubt `identify_patterns`; verbietet `factual_claims`.
- `evidence-linked`: verlangt `source_traceability` und `contextual_validation`.
- `claim-ready`: verlangt `multi_source_validation`, `human_review` und `contradiction_check`.

Wichtig: Der Lifecycle schützt den Denkraum. `inbox`, `scoping` und `signal` sind legitime Karpathy-Denkzustände. Sie werden nicht gelöscht oder abgewertet, sondern nur von öffentlichen Claims getrennt.

## Schichten

### Raw Sources

- `raw/inbox/` enthält neue oder unkuratierte Quellen.
- `raw/assets/` enthält lokale Bilder, PDFs, Medien und Screenshots.
- Raw Sources bleiben unverändert. Sie sind die Quelle der Wahrheit.

### Review Layer

- `review/` enthält Quellenprüfung, Extraktion, Evidenzkarten, offene Prüffragen und Reviewer-Notizen.
- Unsichere Aussagen werden hier sichtbar gehalten, bevor sie in Synthesen wandern.

### Denkraum Layer

- `wiki/concepts/`, `wiki/operations/` und Promotionsnotizen dürfen Denkspuren enthalten.
- Denkraum-Notizen müssen Status, offene Frage und nächste Prüfrichtung nennen.
- Denkraum darf breit sein; Synthese muss eng bleiben.

### Compiled Wiki

Die bestehenden thematischen Ordner sind die kompilierte Wiki:

- `00_Index/`
- `01_Tools_und_Modelle/`
- `02_Postproduktion_Workflows/`
- `03_Rotoscoping_AI_VFX/`
- `04_Trends_und_Vorreiter/`
- `05_Ethik_Recht_Provenance/`
- `06_Quellen/`
- `08_Marktkarte/`
- `09_Emerging_Technologies/`
- `10_Use_Cases/`
- `11_Best_Practices/`
- `12_Skills_und_Rollen/`
- `13_Forschung_Papers/`
- `14_Positionierung_Studium/`
- `15_Promotion/`
- `wiki/`

Das LLM darf diese Ebene pflegen, ergänzen, verlinken und aktualisieren.

### Outputs

- `outputs/` enthält Notion-Versionen, Briefings, Slides, Charts und andere abgeleitete Formate.
- Outputs sind nicht die Quelle der Wahrheit. Gute Outputs werden bei dauerhaftem Wert zurück in die Wiki eingearbeitet.

### System Files

- `00_System/index.md` ist der inhaltliche Navigationsindex.
- `00_System/log.md` ist das chronologische Arbeitsprotokoll.
- `00_System/workflows.md` beschreibt wiederholbare Abläufe.
- `00_System/health_check.md` sammelt Wartungsfragen.

## Ingest Workflow

1. Neue Quelle in `raw/inbox/` lesen.
2. Neues Thema zunächst als `scoping` anlegen, nicht direkt synthetisieren.
3. Provenienz, URL, Datum, Autor:in, Evidenztyp und Quellenstatus sichern.
4. Signal, Interpretation und Evidenz getrennt extrahieren.
5. Gegenbelege, abweichende Begriffe und konkurrierende Erklärungen suchen.
6. Relevante Review-Notiz in `review/` aktualisieren.
7. Eine Quellen- oder Source-Seite erstellen bzw. aktualisieren.
8. Betroffene Konzept-, Tool-, Case- oder Syntheseseiten nur aktualisieren, wenn der Claim mindestens `evidence-reviewed` ist.
9. `00_System/index.md` und, falls genutzt, `wiki/index.md` aktualisieren.
10. Einen Eintrag in `00_System/log.md` und, falls genutzt, `wiki/log.md` anhängen.
11. Offene Prüffragen in `00_System/health_check.md` oder `wiki/operations/open-questions.md` notieren.

## Query Workflow

1. Zuerst `00_System/index.md` lesen.
2. Relevante Wiki-Seiten, Quellen und Review-Notizen öffnen.
3. Antwort mit Quellenbezug formulieren.
4. Wenn die Antwort dauerhaften Wert hat, als Synthese oder Output ablegen.
5. Index und Log aktualisieren, wenn die Wiki verändert wurde.

## Lint Workflow

Regelmäßig prüfen:

- fehlende Quellen
- widersprüchliche oder veraltete Aussagen
- Seiten ohne Rücklinks
- Quellen ohne Anschluss an Konzepte
- Konzepte ohne eigene Seite
- doppelte Begriffe
- Notion-/Output-Seiten, die aktueller sind als die Wiki

## Schreibregeln

- Deutsch, klar, konkret.
- Keine Inhalte löschen, außer die Nutzerin fordert es ausdrücklich.
- Unsicherheit markieren.
- Branchenartikel als Praxisbelege behandeln, nicht als harte Evidenz.
- Jede belastbare Zahl oder technische Produktbehauptung braucht eine prüfbare Quelle.
- Keine öffentliche Synthese ohne `claim-ready`-Status.
- Keine Theorie- oder Marktbehauptung aus reiner Wiederholung mehrerer Sekundärquellen ableiten.
