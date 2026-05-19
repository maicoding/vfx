# Forschung und Paper Pipeline

Tags: #papers #forschung #ai-video #vfx #pipeline

Stand: 2026-05-12

## Was im Vault bisher noch fehlte

Der Vault war bereits stark bei Tools, Markt, Workflows und Emerging Technologies. Was noch fehlte, war die wissenschaftliche Pipeline: Papers, Benchmarks und Forschungsrichtungen, aus denen die nächsten Produkte wahrscheinlich entstehen.

Die wichtigsten Forschungsfelder sind:

1. kontrollierbare Video-Generierung.
2. Multi-Shot- und Langform-Konsistenz.
3. Camera Control und 3D-konsistente Video-Generierung.
4. Video Object Segmentation, Matting und AI-Rotoscoping.
5. generatives Compositing, Object Removal und Video Inpainting.
6. Neural Rendering, 4D Gaussian Splatting und volumetrische Rekonstruktion.
7. Effizienz: Few-Step, Distillation, Flow Models und schnellere DiTs.
8. Benchmarks und QC-Metriken für Produktionsfähigkeit.

## 1. Kontrollierbare Video-Generierung

### FlashMotion

Microsoft Research, 2026. Few-step trajectory-controllable video generation mit FlashBench als Benchmark für lange, trajectory-kontrollierte Videos.

Relevanz für Postproduktion:

- weniger Wartezeit bei kontrollierten Motion-Varianten.
- bessere Steuerung von Objektbewegungen.
- wichtig für Previs, animierte Inserts und AI Motion Blocking.

Quelle: https://www.microsoft.com/en-us/research/publication/flashmotion-few-step-controllable-video-generation-with-trajectory-guidance/

### ATI: Any Trajectory Instruction

ArXiv 2025. Vereinheitlicht Kamera-, Objekt- und lokale Bewegungssteuerung über Trajektorien.

Relevanz:

- Bewegung wird direktierbar statt nur promptbar.
- potenziell wichtig für VFX-Blocking und shotgenaue Revisionen.

Quelle: https://huggingface.co/papers/2505.22944

### LAMP: Language-Assisted Motion Planning

ArXiv 2025. Motion Planning für Video-Generierung über Sprache und strukturierte Bewegungsplanung.

Relevanz:

- Übergang von Prompting zu planbarer Regie.
- interessant für komplexe Kamerafahrten und Objektinteraktionen.

## 2. Multi-Shot und Langform-Konsistenz

### FilmWeaver

AAAI 2026. Multi-Shot-Videos mit Cache-Guided Autoregressive Diffusion. Nutzt Shot Memory und Temporal Memory, um Figuren, Hintergründe und Bewegung über Shots stabiler zu halten.

Relevanz:

- direktes Forschungssignal für narrative AI-Video-Produktion.
- wichtig für Werbung, Musikvideo, Short Film, Serien-Previs.
- löst eines der Hauptprobleme aktueller Modelle: ein schöner Shot ist leicht, eine konsistente Sequenz ist schwer.

Quelle: https://ojs.aaai.org/index.php/AAAI/article/view/37711

### DCDM: Divide-and-Conquer Diffusion Models

2026. Zerlegt Konsistenz in intra-clip world knowledge, inter-clip camera consistency und inter-shot element consistency.

Relevanz:

- zeigt, dass Produktionsfähigkeit ein Systemproblem ist.
- könnte die Grundlage für AI-Shot-Management und Sequenzgeneration werden.

Quelle: https://www.catalyzex.com/paper/dcdm-divide-and-conquer-diffusion-models-for

## 3. Camera Control und 3D-konsistente Video-Generierung

### 3D Scene Prompting

Sony AI, ICLR 2026. Generiert nächste Video-Chunks mit präziser Kamerakontrolle und Szenenkonsistenz über duale raum-zeitliche Konditionierung.

Relevanz:

- entscheidend für virtuelle Kamera, Previs, Set Extension und 4D Scene Control.
- verschiebt Video-Generierung Richtung "generative rendering".

Quelle: https://ai.sony/publications/3D-Scene-Prompting-for-Scene-Consistent-Camera-Controllable-Video-Generation/

### Cavia

Apple ML Research, ICML 2025. Camera-controllable Multi-view Video Diffusion mit View-Integrated Attention.

Relevanz:

- mehrere konsistente Kamerapfade derselben Szene.
- wichtig für Free-Viewpoint, virtuelle Re-Camera und multi-view Previs.

Quelle: https://machinelearning.apple.com/research/cavia

### ReCamDriving

ArXiv 2025. LiDAR-freie, kamerakontrollierte Novel-Trajectory-Video-Generierung mit 3D Gaussian Splatting Guidance.

Relevanz:

- zeigt die Verbindung von 3DGS und Video-Diffusion.
- für VFX interessant, weil geometrische Führung Halluzinationen reduziert.

Quelle: https://huggingface.co/papers/2512.03621

### SpaceTimePilot

Adobe Research, CVPR 2026. Generative Rendering dynamischer Szenen über Raum und Zeit; steuert Kamera und zeitliche Bewegung aus einem Input-Video.

Relevanz:

- extrem nah an Postproduktion: aus einem Video werden alternative Raum-Zeit-Ansichten.
- potenziell wichtig für Retiming, Re-Camera, Virtual Production und VFX-Exploration.

Quelle: https://research.adobe.com/publication/spacetimepilot-generative-rendering-of-dynamic-scenes-across-space-and-time/

## 4. Video Segmentation, Matting und AI-Rotoscoping

### SAM 3

Meta, 2025. Segment Anything with Concepts: erkennt, segmentiert und trackt Konzepte in Bildern und Videos über Text- oder Bildprompts.

Relevanz:

- Grundlage für textbasiertes Rotoscoping: "track all red helmets" statt einzelne Objektprompts.
- für Logging, Roto, QC und Asset Search relevant.

Quelle: https://ai.meta.com/research/publications/sam-3-segment-anything-with-concepts/

### Segment Anything Across Shots

AAAI 2026. Multi-shot Video Object Segmentation mit Cut-VOS Benchmark.

Relevanz:

- wichtig, weil reale Filme aus Schnitten bestehen.
- Roto/Masking muss über Shotwechsel und Montage denken, nicht nur über einen Clip.

Quelle: https://ojs.aaai.org/index.php/AAAI/article/view/42485

### SAMA: Segment and Matte Anything

AAAI 2026. Vereinheitlicht Segmentierung und Matting in einem SAM-basierten Modell.

Relevanz:

- nächster Schritt von groben Masken zu feineren Alpha-Matten.
- direkt relevant für Haare, Kanten, transparente Details und AI-Roto.

Quelle: https://ojs.aaai.org/index.php/AAAI/article/view/37382

### VideoMaMa

2026. Mask-guided Video Matting via generative priors; wandelt grobe Segmentierungsmasken in feinere Alpha-Matten und baut MA-V Dataset.

Relevanz:

- wichtiger Baustein für Roto-Workflows: coarse mask rein, production-nähere Matte raus.
- zeigt, dass synthetische Daten plus generative Priors für reale Footage nutzbar werden.

Quelle: https://www.researchgate.net/publication/399956410_VideoMaMa_Mask-Guided_Video_Matting_via_Generative_Prior

## 5. Generatives Compositing, Object Removal und Inpainting

### GenCompositor

ICLR 2026 Preprint. Diffusion-Transformer-Framework für generatives Video-Compositing: Foreground-Video + Background-Video + Trajektorie/Skalierung.

Relevanz:

- Forschung trifft direkt VFX: Figuren/Objekte in Zielvideo integrieren.
- künftige Tools könnten Shadows, Lighting, Motion und Perspektive generativ angleichen.

Quelle: https://gencompositor.github.io/

### Object-WIPER

Adobe Research, CVPR 2026. Training-free Object Removal, inklusive assoziierter Effekte wie Schatten, Reflexionen und transparente Spuren.

Relevanz:

- sehr nah an Cleanup/Wire Removal.
- wichtig, weil reine Objektmasken oft nicht reichen; Schatten und Reflexionen müssen mit verschwinden.

Quelle: https://research.adobe.com/publication/object-wiper-training-free-object-and-associated-effect-removal-in-videos/

### From Understanding to Erasing

ArXiv 2026. Stable Video Object Removal mit Fokus auf physische und semantische Nebenwirkungen wie Schatten, Reflexionen und Lichtveränderungen.

Relevanz:

- bestätigt den Trend: Object Removal wird semantischer und physikalischer.

## 6. Neural Rendering und 4D Gaussian Splatting

### Sparse4DGS

AAAI 2026. 4D Gaussian Splatting für dynamische Szenen aus sparse frames.

Relevanz:

- weniger dichtes Footage könnte für dynamische Rekonstruktion reichen.
- wichtig für Set Scans, Casual Capture und Budget-Produktionen.

Quelle: https://ojs.aaai.org/index.php/AAAI/article/view/37848

### MCGS

AAAI 2026. Markov Chain Gaussian Splatting für dynamische Szenenrekonstruktion mit besserer temporaler Kohärenz.

Relevanz:

- temporal stabile 4D-Rekonstruktion ist entscheidend für Post und Immersive.

Quelle: https://ojs.aaai.org/index.php/AAAI/article/view/38004

### Instant4D

ArXiv 2025. 4D Gaussian Splatting aus unkalibrierten Casual Videos in Minuten.

Relevanz:

- demokratisiert scanbasierte Szenenerfassung.
- potenziell wichtiger als klassische Photogrammetrie für schnelle Previs/Set Extensions.

Quelle: https://huggingface.co/papers/2510.01119

### Human-centric Volumetric Videos mit Gaussian Splatting

Visual Intelligence 2026. Framework für menschzentrierte volumetrische Videos.

Relevanz:

- digitale Performances, volumetrische Dokumentation, XR, virtuelle Humans.

Quelle: https://link.springer.com/article/10.1007/s44267-026-00111-7

## 7. Effizienz und neue Modellarchitekturen

### STARFlow-V

Apple ML Research, 2026. Video-Generierung mit Normalizing Flows statt klassischer Diffusion.

Relevanz:

- könnte schneller, kausaler und besser evaluierbar werden.
- wichtig, wenn Postproduktion interaktive Geschwindigkeit braucht.

Quelle: https://machinelearning.apple.com/research/starflow-v-video-modeling

### GalaxyDiT

NVIDIA Research, 2026. Training-free Beschleunigung von Video-Diffusion-Transformern.

Relevanz:

- weniger Rechenkosten, schnellere Iteration.
- für Studioeinsatz wichtig, weil Wartezeit kreative Iteration bremst.

Quelle: https://research.nvidia.com/publication/2026-07_galaxydit-efficient-video-generation-guidance-alignment-and-adaptive-proxy

## Was daraus wahrscheinlich in Produkte wandert

Kurzfristig:

- bessere Roto-/Matte-Funktionen.
- Object Removal inklusive Schatten/Reflexionen.
- Generative Extend wird stabiler.
- semantische Suche und concept-based segmentation.
- schnellere Video-Generierung.

Mittelfristig:

- editierbare Passes: Alpha, Depth, Normal, Motion, Camera.
- Camera-controllable AI Video.
- multi-shot consistency für ganze Sequenzen.
- 2.5D/4D Scene Editing.
- AI QC für Kanten, Flicker, Continuity und Provenance.

Langfristig:

- generative rendering statt reiner Video-Generierung.
- Produktionsmodelle, die Script, Shotlist, Assets, Kamera, Audio und Schnitt gemeinsam verstehen.
- private Studio-Modelle mit eigenen Daten und eigener Rechtekontrolle.
