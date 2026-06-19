# Emerging Technologies

## Karpathy-Status

- Lifecycle: `signal / evidence-linked`
- Rolle: Praxis-, Tool- oder Trendkarte
- Evidenzmodus: Herstellerquelle, Branchenquelle, Paper oder Review
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: keine Markt-/Leistungsclaims ohne Quelle und Datum.
- Nächster Prüfschritt: Quellen aktualisieren und Gegenbeispiele suchen.
Tags: #emerging-tech #neural-rendering #gaussian-splatting #ai-vfx

## 1. Neural Rendering und Gaussian Splatting

Gaussian Splatting rekonstruiert räumliche Szenen aus Bildern oder Video als Punkt-/Splat-Repräsentation. Für Postproduktion ist das interessant, weil echte Orte schnell als navigierbare, fotorealistische Räume verfügbar werden.

Anwendungen:

- digitale Sets.
- Set Extensions.
- Location Scans.
- Free-Viewpoint Shots.
- immersive Installationen.
- virtuelle Produkt-/Architekturvisualisierung.

Update 2026-06-19:

- Edit3DGS: dynamisches Head Editing mit 2D instruction-guided diffusion und 3D Gaussian Splatting.
- Local-GS: Performance-Optimierung für interaktives Gaussian-Splatting-Rendering.
- Relightable Gaussian Splatting for Virtual Production: relightbare VP-Szenen mit Depth, Lighting Intensity, Lighting Color und Unlit Render als Outputvariablen.
- Forschungsstatus: `paper-signal / evidence-linked`, nicht produktionsvalidiert.

Quelle: [[../wiki/sources/vfx-promotion-weekly-research-2026-06-19|VFX Promotion Weekly Research 2026-06-19]]

Warum wichtig:

Es schließt eine Lücke zwischen 2D-Footage und vollmodelliertem 3D. Besonders stark, wenn Kamera-, Licht- und Szenenveränderungen nur moderat sein müssen.

## 2. Volumetric Video und Free-Viewpoint

Volumetric Video macht Performances oder Räume aus verschiedenen Perspektiven rekonstruierbar. Für Sport, Konzert, XR, Broadcast und Museen ist das naheliegend; für Film noch schwer wegen Datenmenge, Kontrolle und Ästhetik.

## 3. AI Relighting und 2.5D Compositing

AI erzeugt aus 2D-Footage nutzbare Hilfspasses:

- Depth.
- Normal.
- Alpha.
- Base Color / Albedo.
- Roughness.
- Specular.
- Motion.

Das ermöglicht Relighting, Fog, Depth of Field, Set Extension und besseres Object Placement ohne vollständige 3D-Rekonstruktion.

## 4. AI Keying ohne Greenscreen

Echtzeit-Segmentierung ersetzt in einfachen Setups den Greenscreen. Für Broadcast, Creator, schnelle Commercials und Event-Produktionen ist das bereits brauchbar. High-End bleibt schwierig bei Haaren, Transparenzen, Motion Blur und Rauch.

## 5. Generative Extend für Bild, Ton und Handlung

Nicht nur Frames verlängern, sondern Anschlussmomente erzeugen:

- Reaktionspausen.
- Bildbereiche außerhalb des Frames.
- Clean Plates.
- Roomtone und Ambience.
- kleine Continuity-Fixes.

## 6. Agentic Editing und Agentic Postproduction

Agenten übernehmen mehrstufige Aufgaben: Footage suchen, markieren, schneiden, betiteln, lokalisieren, maskieren, exportieren. Die Timeline bleibt, aber wird stärker eine Kontrolloberfläche.

## 7. Private Studio Models

Studios trainieren oder feinjustieren Modelle auf eigenen Daten, um Stil, Rechte und Sicherheit zu kontrollieren. Besonders relevant für vertrauliche IP, unveröffentlichte Schauspieler:innen, Markenassets und wiederholbare VFX-Aufgaben.

## 8. AI QC

Automatische Qualitätskontrolle wird wachsen:

- Flackern.
- Roto-Kanten.
- Continuity.
- falsche Logos.
- Gesichter/Hände/Artefakte.
- Untertitel und Dubbing.
- Broadcast Specs.
- AI-Provenance und Rechtehinweise.

## 9. Neural Codecs und intelligente Kompression

AI-basierte Kompression kann Review, Remote Workflows und Volumetric/Neural Rendering entlasten. Wichtig wird, ob Qualität, Latenz und Archivfähigkeit professionellen Ansprüchen genügen.

Vertiefung: [[Neural_Codecs|Neural Codecs]]

## 10. Multimodale Produktionsmodelle

Die nächste Stufe ist nicht Text-to-Video, sondern ein Produktionsmodell, das Script, Storyboard, Kamera, Audio, Assets, Referenzen und Schnittlogik gemeinsam verarbeitet.

## 11. Hybrid Workflows: Compositing, CGI, AI und Scene Rooms

Hybrid Workflows verbinden Live-Action-Plates, CG-Render, Unreal-/Real-Time-Ausgaben, Gaussian Splats, AI-Roto/Cleanup, USD/MaterialX/ACES und Review-Layer. Sie sind deshalb ein konkreter Praxisfall für `Scene Rooms`.

Vertiefung: [[../15_Promotion/Hybrid_Workflows_als_Digital_Rooms|Hybrid Workflows als Digital Rooms]]

Quellen / Signale:

- Foundry Nuke 17.0: native Gaussian Splats, USD-basiertes 3D-System und erweiterte Machine-Learning-Funktionen: https://www.foundry.com/news-and-awards/foundry-releases-nuke-17-advancing-compositing-workflows
- Nuke 17.0 Release Notes: SplatRender, USD 25.08 und Gaussian-Splat-Workflow: https://learn.foundry.com/nuke/content/release_notes/nuke_17.0.html
- ACES 2.0 / ASWF: verbesserte Color- und Austauschlogik für komplexe Bildpipelines: https://press.oscars.org/news/academy-motion-picture-arts-and-sciences-launches-next-chapter-aces-academy-software
