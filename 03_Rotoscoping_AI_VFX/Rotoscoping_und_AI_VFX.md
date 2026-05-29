# Rotoscoping und AI VFX

## Karpathy-Status

- Lifecycle: `signal / scoping`
- Rolle: Praxis- oder Forschungsachse
- Evidenzmodus: Beobachtungen, Quellen, offene Prüffragen
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: nicht als finalen Claim verwenden.
- Nächster Prüfschritt: Quellenstatus und Scope nachziehen.
Tags: #rotoscoping #ai-vfx #compositing #matte

## Warum Rotoscoping der perfekte Testfall ist

Rotoscoping ist repetitiv, zeitintensiv und teuer. Gleichzeitig ist es bildkritisch: schlechte Kanten ruinieren Compositing sofort. Genau deshalb zeigt Roto besonders gut, wo AI hilft und wo sie kontrolliert werden muss.

## Klassische Probleme

- Haare, Fell, Stoffkanten und Motion Blur.
- transparente oder halbtransparente Objekte.
- Glas, Rauch, Wasser, Reflektionen.
- schnelle Bewegung und verdeckte Körperteile.
- Kanten, die über Zeit flackern.
- schwierige Interaktion zwischen Vordergrund und Hintergrund.

## Was AI heute gut kann

- erste Object Mattes und Segmentierung.
- Propagation über mehrere Frames.
- Garbage Mattes.
- Cleanup- und Beauty-Patterns auf Sequenzen übertragen.
- Background Removal für schnelle Entwürfe.
- schnelle Iteration für Social, Advertising und einfache Comps.

## Was menschlich bleiben muss

- finale Kantenentscheidung.
- semantische Trennung bei Überlagerungen.
- Compositing-Urteil: passt das Element wirklich in Licht, Grain, Motion, Lens, Color?
- Shot Continuity.
- Art Direction.
- Verantwortung für Rechte und Freigaben.

## Wichtige Tools

- [[../01_Tools_und_Modelle/Adobe_Firefly_Postproduktion|After Effects Object Matte]]
- [[../01_Tools_und_Modelle/Foundry_Nuke_AI|Foundry CopyCat, Cattery und AI-assisted Roto]]
- Runway Background Removal / Video-to-Video Workflows
- DaVinci Resolve Magic Mask / Neural Engine
- Mocha Pro für planar tracking und Roto-Unterstützung

## Zukunftsbild

Roto-Artists werden weniger Frame für Frame "malen" und mehr AI-generierte Vorschläge führen, korrigieren, stabilisieren und pipelinefähig machen. Das bedeutet nicht, dass Roto unwichtig wird. Im Gegenteil: Roto-Kompetenz wird zum Qualitätsfilter für AI.

## Checkliste für AI-Roto-Tests

- Flackert die Matte über Zeit?
- Sind Haare und Motion Blur plausibel?
- Gibt es Kanten-Chatter bei schnellen Bewegungen?
- Bleiben transparente Bereiche nutzbar?
- Kann ich die Matte lokal korrigieren?
- Kann ich die Ausgabe als Alpha, Spline, Layer oder Node weiterverarbeiten?
- Ist das Ergebnis reproduzierbar?
