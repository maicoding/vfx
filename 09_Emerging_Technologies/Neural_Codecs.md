# Neural Codecs

## Karpathy-Status

- Lifecycle: `signal / evidence-linked`
- Rolle: Praxis-, Tool- oder Trendkarte
- Evidenzmodus: Paper, Standardisierung, Code-Repositorien, Herstellerquellen
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: keine Leistungs-, Markt- oder Standardisierungsclaims ohne Quelle, Testbed und Datum.
- Nächster Prüfschritt: Gegenbelege zu Qualität, Latenz, Energiebedarf, Hardware und Archivfähigkeit prüfen.
Tags: #neural-codecs #compression #jpeg-ai #dcvc #encodec #digital-image-space #scene-room

## Thema

Neural Codecs sind lernbasierte Kompressionssysteme für Bild, Video, Audio, Szenen oder latente Repräsentationen.

## Unterpunkte

### 1. Neural Image Codecs

- JPEG AI.
- Learned Image Compression.
- variable-rate coding.
- perceptual optimization.
- machine-consumable compressed representation.
- mobile / on-device decoding.

### 2. Neural Video Codecs

- DCVC-Familie.
- DCVC-RT.
- DCVC-UF.
- diffusion-prior video compression.
- intra/inter neural coding.
- temporal latent compression.
- neural representation compression.

### 3. Neural Audio Codecs

- SoundStream.
- EnCodec.
- AudioDec.
- Lyra.
- neural codec language models.
- diskrete Audio-Tokens für Generierung.

### 4. Backward-Compatible Neural Coding

- neuronale Postfilter.
- neural enhancement layers.
- JPEG-kompatible Erweiterungen.
- hybrid classical / neural pipelines.
- Opus mit DNN-gestützter Redundanz und Packet-Loss-Concealment.

### 5. Scene / Spatial Codecs

- Gaussian-Splat-basierte Kompression.
- implicit neural representations.
- neural video representation compression.
- komprimierte Szenen statt komprimierter Frames.
- mögliche Nähe zu Neural Rendering, Digital Twins und Scene Rooms.

## Signal

- Neural Codecs verschieben Kompression von handdesignten Transform-, Prädiktions- und Entropieschemata zu gelernten Encodern, Decodern, Latents und Wahrnehmungsverlusten.
- Für `Digital Image Space` sind sie relevant, weil das komprimierte Medium nicht nur Datei kleiner macht, sondern eine operative Zwischenrepräsentation erzeugt.
- Für `Scene Room` sind sie relevant, sobald Video, Gaussian Splats, Neural Rendering und Review-Streams als latente, rekonstruierbare Räume übertragen werden.
- Für generative Modelle sind Audio- und Bild-Codecs wichtig, weil diskrete oder kontinuierliche Codes als Tokenräume für Generierung dienen.

## Interpretation

- Neural Codecs sind nicht nur Infrastrukturthema, sondern eine Theorieachse für operative Bildräume.
- Die relevante Verschiebung liegt bei `Frame -> Latent -> Reconstruction -> Perception`.
- Kompression wird zur Interface- und Modellfrage: Wer kontrolliert, was im Latent erhalten bleibt, geglättet wird, halluziniert wird oder für Maschinen besser lesbar bleibt?
- Für Postproduktion zählt weniger der reine Bitratenclaim, stärker zählen Editierbarkeit, Farbtreue, temporale Stabilität, Latenz, Reproduzierbarkeit und Archivfähigkeit.

## Evidenz

| Feld | Quelle | Signal | Belastbarkeit | Grenze |
|---|---|---|---|---|
| JPEG AI | JPEG Committee, JPEG AI; Esenlik et al. 2025 | Standardisierung lernbasierter Bildcodierung mit kompaktem Stream und menschlicher / maschineller Nutzung | hoch für Standardisierungsrichtung | konkrete Implementierungen und Adoption offen |
| Variable Rate JPEG AI | Jia et al. 2025 | ROI, Quality Maps, kontinuierliche Bitrate, mobile Implementierbarkeit | mittel | Paper-/Standardkontext, keine breite Praxisadoption |
| DCVC-RT | Microsoft Research / DCVC, CVPR 2025 | real-time neural video codec mit 1080p 100+ FPS Claim und Rate Control | mittel bis hoch als Forschungscode | Hersteller-/Paper-Testbedingungen, GPU-Abhängigkeit |
| DCVC-UF | Li et al. 2026 | Chunk-basiertes Coding für schnellere neural video compression | signal | sehr neu, noch nicht praxisvalidiert |
| GNVC-VD | Mao et al. 2025 | Video-Diffusion-Prior für perceptual neural video compression | signal | generative Rekonstruktion erhöht Wahrheits-/Halluzinationsrisiko |
| 2D Gaussian Splatting Codec | Gupta / Junejo 2025 | Video-Kompression über 2D Gaussian Splatting | signal | frühes Paper, praktischer Codec-Status offen |
| EnCodec | Meta AI / facebookresearch | neural audio codec für mono 24 kHz und stereo 48 kHz | hoch als Code- und Paperbasis | Audio, nicht direkt Bildraum; generative Nutzung relevant |
| SoundStream / AudioDec | Google / Sony AI Papers | low-bitrate, low-latency neural audio coding | mittel | domänenspezifisch, Audioqualität subjektiv |
| JPEG XS | JPEG Committee | Gegenpol: low-latency visually lossless Mezzanine-Codec für professionelle Videoverbindungen | hoch als etablierter Standard | nicht neural, aber wichtiger Vergleich für Postproduktion |

## Gegenpositionen

- Klassische Codecs haben Hardware-Decoding, Standards, Tests, Patente, Toolchains und Archivpraxis.
- Neural Codecs können Halluzinationsartefakte erzeugen, besonders bei generativen Priors.
- Perzeptuelle Qualität kann Messwerte verbessern und zugleich forensische, farbliche oder compositing-relevante Details verändern.
- Rechenaufwand und Energiebedarf können Bandbreitenvorteile aufheben.
- Standardisierung und Interoperabilität sind langsamer als Paper-Fortschritt.
- Für professionelle Postproduktion sind deterministische Reproduktion und Farbmanagement wichtiger als Demoqualität.

## Promotionsrelevanz

### Digital Image Space

- komprimierter Latent Space als Bildraum.
- Decoder als sichtbarer Bildgenerator.
- Qualität als rekonstruktive Wahrnehmungsentscheidung.
- maschinenlesbare komprimierte Repräsentation.

### Scene Room

- Review-Streams.
- Remote Compositing.
- Volumetric / Neural Rendering Transfer.
- Gaussian Splat Delivery.
- IP-basierte Studioinfrastruktur.

### Public / Built Room

- Digital Twins.
- XR Streaming.
- Spatial Video.
- Sensor- und Kamerakompression.
- Echtzeitübertragung räumlicher Umgebungen.

## Offene Fragen

- Wann wird ein neural codec als Archivformat akzeptabel?
- Welche Artefakte sind für Compositing kritischer als für normale Betrachtung?
- Welche Codec-Latents bleiben editierbar?
- Können neural codecs Alpha, Depth, Motion, Normals oder Scene Metadata zuverlässig mitführen?
- Wie werden Halluzinationen, Provenance und Rekonstruktionsunsicherheit dokumentiert?
- Welche Rolle spielen neural codecs für generative Video-Modelle als interne Tokenizer?

## Quellen

- JPEG AI: https://jpeg.org/jpegai/
- JPEG XS: https://jpeg.org/jpegxs/
- Esenlik et al., `An Overview of the JPEG AI Learning-Based Image Coding Standard`, 2025: https://arxiv.org/abs/2510.13867
- Jia et al., `Overview of Variable Rate Coding in JPEG AI`, 2025: https://arxiv.org/abs/2503.16288
- Microsoft DCVC: https://github.com/microsoft/DCVC
- Jia et al., `Towards Practical Real-Time Neural Video Compression`, 2025: https://arxiv.org/abs/2502.20762
- Li et al., `Ultra-Fast Neural Video Compression`, 2026: https://arxiv.org/abs/2606.04410
- Mao et al., `Generative Neural Video Compression via Video Diffusion Prior`, 2025: https://arxiv.org/abs/2512.05016
- Gupta / Junejo, `Neural Video Compression using 2D Gaussian Splatting`, 2025: https://arxiv.org/abs/2505.09324
- Meta EnCodec: https://github.com/facebookresearch/encodec
- Défossez et al., `High Fidelity Neural Audio Compression`, 2022: https://arxiv.org/abs/2210.13438
- Zeghidour et al., `SoundStream: An End-to-End Neural Audio Codec`, 2021: https://arxiv.org/abs/2107.03312
- Wu et al., `AudioDec`, 2023: https://arxiv.org/abs/2305.16608
