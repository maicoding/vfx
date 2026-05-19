# Best Practice Workflows

Tags: #best-practice #workflow #governance #ai-vfx

## Grundprinzip

AI sollte in Postproduktion wie ein beschleunigendes Department behandelt werden, nicht wie ein magischer Exportbutton. Jede AI-Ausgabe braucht Briefing, Versionierung, Review und Freigabe.

## Workflow 1: AI-Roto für VFX-Shot

1. Plate importieren und Shot-Kontext klären.
2. AI Object Matte oder Segmentierung erzeugen.
3. Matte auf Temporal Stability testen.
4. Problemzonen markieren: Haare, Motion Blur, Transparenz, Rauch, schnelle Kanten.
5. Artist-Korrektur in Nuke, AE, Resolve oder Mocha.
6. Matte als Alpha/Layer/Node versionieren.
7. Comp-QC im finalen Look, nicht nur isoliert auf Schwarz/Weiss.

## Workflow 2: AI-Previs zu finaler Produktion

1. Script oder Idee in Shotliste übersetzen.
2. Referenzen für Figur, Ort, Licht, Linse und Stil definieren.
3. AI-Animatic erzeugen.
4. Regie, Kamera, VFX und Produktion prüfen Machbarkeit.
5. Nur als Previs behandeln, nicht als finale Bildquelle.
6. Relevante Entscheidungen in Shotgrid/Ftrack/Notion/Vault dokumentieren.

## Workflow 3: Generative Extend im Schnitt

1. Problem identifizieren: zu kurzer Take, fehlende Reaktion, Audio-Lücke.
2. Extend nur für kleine, plausible Verlängerungen einsetzen.
3. Ton und Bild getrennt prüfen.
4. Artefakte, Lip-Sync, Kontinuität und Timing checken.
5. AI-Anteil markieren, wenn relevant für Kund:innen, Sender oder Rechte.

## Workflow 4: AI-Relighting / 2.5D

1. Plate analysieren.
2. Depth/Normal/Alpha/PBR-Passes erzeugen.
3. Passes einzeln validieren.
4. Relighting in Comp testen.
5. Grain, Lens, Motion Blur und Color Matching nachziehen.
6. Final nur mit menschlicher Comp-QC freigeben.

## Governance Checkliste

- Welche Tools sind im Projekt erlaubt?
- Welche Daten dürfen hochgeladen werden?
- Welche Referenzen sind lizenziert?
- Welche AI-Ausgaben müssen markiert werden?
- Wer verantwortet finale Freigabe?
- Wo werden Prompts, Seeds, Versionen und Modellnamen dokumentiert?
- Wie werden Content Credentials erhalten oder ergänzt?
