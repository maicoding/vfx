# Topic Lifecycle

Status: living-system-rule  
Zweck: Denkraum und Evidenzlogik verbinden.

## Grundsatz

Der Vault ist zugleich **Denkraum** und **Belegarchiv**. Der Topic Lifecycle darf frühes Denken nicht blockieren. Er regelt nur, welche Operationen in welchem Status erlaubt sind und wann eine Aussage als Claim verwendet werden darf.

## Lifecycle

```yaml
topic_lifecycle:
  inbox:
    allowed:
      - collect
      - tag
    note: "Denkraum-Eingang. Noch keine Relevanz- oder Wahrheitsbehauptung."

  scoping:
    allowed:
      - define_questions
      - map_domain
      - collect_terms
      - identify_possible_sources
    note: "Begriffe, Grenzen und Suchachsen klären. Karpathy-Denkraum bleibt aktiv."

  signal:
    allowed:
      - identify_patterns
      - connect_to_existing_notes
      - mark_as_hypothesis
    forbidden:
      - factual_claims
      - public_synthesis
      - theory_integration_as_evidence
    note: "Signal ist Musterhinweis, nicht Evidenz."

  evidence-linked:
    requires:
      - source_traceability
      - contextual_validation
      - evidence_type
      - uncertainty_note
    allowed:
      - internal_synthesis
      - concept_linking
      - contradiction_mapping
    note: "Interne Synthese möglich, aber noch nicht automatisch öffentlich claim-ready."

  claim-ready:
    requires:
      - multi_source_validation
      - human_review
      - contradiction_check
      - source_traceability
      - scope_boundary
    allowed:
      - public_synthesis
      - notion_summary
      - teaching_use
      - proposal_text
    note: "Claim-ready heißt verwendbar, nicht endgültig wahr."
```

## Automation

```yaml
automation:
  weekly:
    - source_refresh
    - contradiction_scan
    - topic_drift_scan
    - confidence_decay
    - slop_detection
```

## Karpathy-Schutz

- `inbox`, `scoping` und `signal` sind keine Fehler, sondern Denkzustände.
- Frühe Muster dürfen gesammelt, verlinkt und befragt werden.
- Nur die Verwendung ist begrenzt: Ein Signal darf keine Tatsachenbehauptung tragen.
- Verdichten heißt nicht glätten. Widersprüche und offene Fragen bleiben sichtbar.
- Alte Denkspuren dürfen reaktiviert werden, wenn neue Fragen oder Quellen sie relevant machen.
- Neue Denkachsen werden im [[../15_Promotion/Denkachsen_Register|Denkachsen Register]] sortiert.
- Neue Themen verwenden [[Karpathy_Capture_Template|Karpathy Capture Template]], bevor sie in Synthesen, Indexseiten oder Notion wandern.

## Status-Upgrade-Regel

Ein Thema darf nur hochgestuft werden, wenn die Bedingungen des Zielstatus erfüllt sind. Fluenz, Wiederholung, Anbieterclaims oder Plausibilität ersetzen keine Evidenz.

## Status-Downgrade-Regel

Ein Thema wird zurückgestuft, wenn:

- Quellen veralten.
- Gegenbelege stärker werden.
- Zitationen rekursiv oder unklar sind.
- der Kontext des Claims enger ist als ursprünglich angenommen.
- sich ein Claim als AI-Slop oder niedrig-informative Wiederholung erweist.
