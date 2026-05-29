# Hybrid Workflows als Digital Rooms

## Karpathy-Status

- Lifecycle: `scoping / evidence-linked`
- Rolle: Promotions- und Theorieachse
- Evidenzmodus: Theorieanker, Quellenanschlüsse, offene Fragen
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: nicht claim-ready ohne Matrixeintrag.
- Nächster Prüfschritt: Status in Claim Evidence Matrix abgleichen.
Tags: #promotion #digital-rooms #hybrid-workflows #compositing #cgi #scene-room #evidence-linked

Status: signal / evidence-linked  
Stand: 2026-05-28

## Kurzthese

Hybrid Workflows sind operative Digital Rooms: Arbeitsräume, in denen fotografische, synthetische, rekonstruierte und generative Bildzustände zusammengeführt, geprüft und verantwortet werden.

## Signal

Compositing und CGI trennen sich weniger klar in 2D-Comp, 3D-Render, AI-Generation und Real-Time-Engine. Aktuelle Tool- und Forschungsentwicklungen zeigen eine Konvergenz aus:

- Live-Action-Plate.
- CG-Render.
- Unreal- oder Real-Time-Output.
- Gaussian Splatting / neural scene representation.
- AI-Roto, Object Masking, Cleanup und Generative Extend.
- USD / MaterialX / OpenPBR als Austausch- und Materialschicht.
- ACES / OCIO als Color- und Vertrauensschicht.
- Review, Provenance und Versionierung.

## Interpretation

Der finale Shot entsteht nicht mehr nur als lineare Übergabe von Department zu Department. Er wird in einem verhandelten Raum unterschiedlicher Bildzustände gebaut:

- fotografisch: Plate, Scan, HDRI, Reference.
- synthetisch: CG, Simulation, Render Passes, AOVs.
- rekonstruktiv: Photogrammetry, NeRF, Gaussian Splatting, Depth, Camera Solve.
- generativ: AI Video, AI Extension, AI Matte, AI Cleanup.
- infrastrukturell: USD, MaterialX, ACES, Review- und Asset-Systeme.

Für die Promotion ist das stark, weil `Hybrid Workflow` ein konkreter Praxisbeleg für `Digital Rooms` ist. Der Workflow selbst wird zum Raum, in dem Bild, Daten, Interface, Modell, Material, Verantwortung und Evidenz zusammenkommen.

## Typologie

### 1. Plate + CG + AI Cleanup

Klassischer Dreh bleibt Ausgangspunkt. CG ergänzt Sets, Props, Figuren oder Effekte. AI wird für Roto, Object Masking, Cleanup, Upscaling, Denoising, Beauty Work oder temporale Fixes eingesetzt.

Quellen / Signale:

- Foundry beschreibt CopyCat, Cattery und AI-Tools als studio- und artist-kontrollierte ML-Erweiterung für VFX- und Animation-Workflows: https://www.foundry.com/ai-solutions
- Foundry Nuke 16.1 erweitert Machine-Learning-Training mit BigCat für größere Datensätze: https://learn.foundry.com/nuke/content/release_notes/nuke_16.1.html
- Adobe meldet AI-gestützte Video-Editing- und Object-Mask-Workflows in Premiere / After Effects: https://www.cgw.com/Press-Center/News/2026/Adobe-announes-new-AI-powered-video-editing-tool.aspx

Evidenzstatus: stark für assistive AI in Postproduktion; vorsichtig bei vollautomatischen Qualitätsversprechen.

### 2. Plate + Gaussian Splat + Nuke

Ein realer Ort wird als Gaussian Splat rekonstruiert, in Nuke oder einer Engine manipuliert und mit Live Action kombiniert. Besonders relevant für Set Extensions, Matte Painting, Location Capture und virtuelle Kamerabewegungen.

Quellen / Signale:

- Foundry Nuke 17.0 bringt native Gaussian-Splat-Unterstützung, Import, View, Manipulation, Render und Export: https://www.foundry.com/news-and-awards/foundry-releases-nuke-17-advancing-compositing-workflows
- Nuke 17.0 Release Notes nennen SplatRender, USD 25.08 und Working with Gaussian Splats: https://learn.foundry.com/nuke/content/release_notes/nuke_17.0.html
- Nuke 17.0v1 Release Notes verknüpfen Gaussian Splats mit Set Extensions, Matte Painting und Element Integration: https://learn.foundry.com/nuke/content/release_notes/17.0/nuke_17.0v1_releasenotes.html
- SIGGRAPH beschreibt Gaussian-Splatting-basierte Rendering-Ansätze für hochwertige 3D-Content-Erzeugung: https://blog.siggraph.org/2025/03/gaussian-splatting-based-rendering-for-high-quality-3d-content-creation.html/

Evidenzstatus: stark als Emerging Production Technology; Pipeline-Reife je nach Use Case prüfen.

### 3. Unreal / Real-Time + Offline Render + Compositing

Real-Time-Engines dienen für Layout, Previs, ICVFX, virtuelle Produktion oder finalnahe Shots. Offline-Render und Nuke-Comp bleiben relevant, wenn höhere Kontrolle, AOVs, Deep Data, Beauty Work oder Delivery-Anforderungen nötig sind.

Quellen / Signale:

- Unreal Engine 5.6 betont bessere Produktionspipelines, Performance Capture und cinematic rendering: https://www.unrealengine.com/en-US/news/unreal-engine-5-6-is-now-available
- Nuke 17.0 aktualisiert die 3D- und USD-Schicht im Compositing und macht dadurch real-time / USD / Comp-Anschlüsse relevanter: https://learn.foundry.com/nuke/content/release_notes/17.0/nuke_17.0v1_releasenotes.html

Evidenzstatus: stark als Pipeline-Trend; konkrete Studio-Implementationen müssen fallbezogen geprüft werden.

### 4. AI Video + klassisches Finishing

Generierte Clips werden nicht zwingend als finaler Shot genutzt, sondern als Animatic, Styleframe, Movement Reference, B-Roll, Transition, Insert, Concept Plate oder Testmaterial. Klassisches Finishing prüft und stabilisiert Timing, Color, Roto, Cleanup, Editierbarkeit und Rechte.

Quellen / Signale:

- Adobe beschreibt Firefly- und Premiere-nahe AI-Video-Workflows inklusive Generative Extend und Media Intelligence: https://www.adobe.com/content/dam/cc/in/about-adobe/newsroom/pdfs/2025/Adobe%20NAB%20Press%20Release-New%20AI%20Innovation%20in%20Industry-Leading%20Adobe%20Premiere%20Pro%20%281%29.pdf
- Foundry positioniert AI in Nuke als kontrollierbare Ergänzung zu Compositing, nicht als Ersatz für final-pixel-Verantwortung: https://www.foundry.com/ai-solutions

Evidenzstatus: stark als Praxisrichtung; schwach, wenn daraus pauschal "AI ersetzt Postproduktion" abgeleitet wird.

### 5. USD Scene + 2D Comp + Review Layer

Assets, Materials, Lights und Varianten bleiben in USD / MaterialX / OpenPBR organisiert. Nuke oder ein anderes Compositing-System hält finale Bildlogik, Mattes, AOVs, Deep Data, Color und Review-Entscheidungen zusammen.

Quellen / Signale:

- Nuke 17.0 unterstützt USD 25.08 und führt MaterialX-Shader-Support im USD-basierten 3D-System ein: https://learn.foundry.com/nuke/content/release_notes/nuke_17.0.html
- OpenPBR wird als standardisierter PBR-Shader für interoperables Material Authoring across VFX, Animation und Design Visualization beschrieben: https://arxiv.org/abs/2512.23696
- ACES 2.0 wurde 2025 in die Academy Software Foundation überführt und verbessert unter anderem Rendering, HDR-Konsistenz und Output-Device-Support: https://press.oscars.org/news/academy-motion-picture-arts-and-sciences-launches-next-chapter-aces-academy-software

Evidenzstatus: stark; Standardisierungs- und Interoperabilitätsebene ist für professionelle CGI wahrscheinlich zentraler als einzelne AI-Demos.

### 6. Photogrammetry / Scan + AI Generation

Scans oder rekonstruktive Verfahren liefern Raum- oder Objektbasis. Generative Modelle ergänzen Varianten, Texturen, Hintergründe, beschädigte Bereiche oder Look-Optionen.

Quellen / Signale:

- Gaussian Splatting wird als Brücke zwischen Capture und navigierbarem 3D-Raum relevant: https://blog.siggraph.org/2025/03/gaussian-splatting-based-rendering-for-high-quality-3d-content-creation.html/
- Neural Texture Splatting untersucht expressive 3D Gaussian Splatting für View Synthesis, Geometry und Dynamic Reconstruction: https://arxiv.org/abs/2511.18873

Evidenzstatus: stark als Forschung und Emerging Workflow; offen für konkrete Produktionsstabilität.

### 7. Compositing + Provenance

Je hybrider ein Shot wird, desto wichtiger wird die Frage: Was ist fotografiert, simuliert, rekonstruiert, generiert, retuschiert oder nur temporäre Referenz? Hybrid Workflows brauchen deshalb Herkunfts-, Rechte-, Review- und Freigabelogik.

Quellen / Signale:

- ACES / ASWF betont die Rolle gemeinsamer Standards für komplexe Color- und Bildaustausch-Workflows: https://press.oscars.org/news/academy-motion-picture-arts-and-sciences-launches-next-chapter-aces-academy-software
- Foundry Cattery nennt Modelllizenz und Datenprovenienz als Teil der AI-Modellnutzung: https://www.foundry.com/ai-solutions

Evidenzstatus: stark als Problemstellung; konkrete Provenance-Standards für AI-VFX bleiben weiter zu prüfen.

## Bedeutung für die Promotion

Hybrid Workflows können als empirischer Kernfall des `Scene Room` dienen. Sie zeigen, dass digitale Räume nicht erst in VR, Games oder Digital Twins entstehen. Sie entstehen bereits in der Postproduktion:

- als Node Graph.
- als USD Stage.
- als neural rekonstruierte Szene.
- als Timeline mit AI- und CG-Elementen.
- als Review- und Freigaberaum.
- als Belegarchiv der Bildherkunft.

## Claim-Status

Claim-ready-nahe:

- Compositing integriert 2026 stärker 3D-, USD- und Gaussian-Splat-Workflows.
- AI ist in Compositing/Postproduktion derzeit vor allem assistiv und kontrollbedürftig.
- Standardisierung über USD, MaterialX/OpenPBR und ACES wird für hybride CGI/Post-Workflows wichtiger.

Nicht claim-ready:

- Gaussian Splatting ersetzt klassische CG-Environments.
- AI Video ersetzt klassische VFX/Postproduktion.
- Hybrid Workflows sind bereits überall Studio-Standard.

## Nächste Prüffragen

- Welche konkreten Hybrid-Workflow-Fallstudien sind für die Promotion geeignet?
- Welche Teile lassen sich praktisch als eigenes Artefakt nachbauen?
- Wie wird `Hybrid Workflow` von `Digital Room` abgegrenzt?
- Welche Quellen liefern Studio-Praxis statt Vendor-Claims?
- Welche Rolle spielt Color Management als epistemische Vertrauensschicht?
