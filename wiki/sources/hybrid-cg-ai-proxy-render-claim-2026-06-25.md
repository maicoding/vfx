---
title: "Hybrid CG AI Proxy Render Claim 2026-06-25"
type: source
status: signal
created: 2026-06-25
updated: 2026-06-25
tags: [hybrid-workflow, cg, ai-video, seedance, proxy-render, reference-image, scene-room]
source_status: user-provided-social-claim-source-not-found
evidence_strength: weak-to-medium-directional
forecast_mode: critical
sources:
  - "User-provided text, 2026-06-25"
  - "https://arxiv.org/abs/2603.23246"
  - "https://arxiv.org/abs/2604.14148"
  - "https://arxiv.org/abs/2506.17450"
  - "https://www.theverge.com/news/658613/nvidia-ai-blueprint-blender-3d-image-references"
---

# Hybrid CG AI Proxy Render Claim, 25.06.2026

## Karpathy-Status

- Lifecycle: `signal / evidence-linked`
- Rolle: Quellenkarte / Praxisclaim
- Evidenzmodus: User-Quelle, Paper-Anschluss, Toolkontext, Unsicherheit
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: nicht als Produktionsbeweis verwenden.
- Nächster Prüfschritt: Originalpost, konkretes Shot-Material und reproduzierbaren Test suchen.

## Ausgangsclaim

AI ersetzt CG nicht. Es gibt einen Regler zwischen Kontrolle und Abgabe. Bei einem Shot wie Caramel bleibt ein vereinfachter 3D-Render sinnvoll, weil er Motion Control liefert. Der Render muss nicht final sein. Seedance bekommt Proxy-Render plus Referenzbild und schließt die Material-/Look-Lücke.

## Quellenstatus

- Originalquelle öffentlich nicht eindeutig gefunden.
- Text liegt als User-Input vor.
- Seedance-Bezug ist plausibel, aber nicht als konkreter Caramel-Case belegt.
- Technische Plausibilität wird durch verwandte Forschung zu 3D-proxy-guided generative rendering gestützt.

## Signal

- Der Claim beschreibt eine Kontrollskala zwischen expliziter CG-Arbeit und generativer Übergabe.
- 3D liefert Bewegung, Kamera, Timing, Blocking, Occlusion und räumliche Kontrolle.
- Generative Video-Modelle liefern Materialnähe, Detail, Lichtgefühl, Textur und plausibles Finish.
- Referenzbilder werden als Look- und Materialanker eingesetzt.

## Interpretation

Dieser Workflow ist für `Scene Room` stark, weil er den Shot als geteilten Kontrollraum zeigt:

- Proxy Mesh: räumliche und kinetische Kontrolle.
- 3D Render: bewegte Struktur und Kamera-/Timing-Vorgabe.
- Reference Image: Material, Look, Licht, Finish.
- Video Model: rekonstruktive / generative Schließung.
- Compositing: Validierung, Integration, Color, Kanten, Rechte, Delivery.

Die relevante Frage lautet: Welcher Teil des Shots wird explizit modelliert, welcher Teil referenziert, welcher Teil generativ geschlossen?

## Evidenz

| Quelle | Relevanz | Belastbarkeit | Grenze |
|---|---|---|---|
| Seedance 2.0 Paper | Seedance 2.0 unterstützt multimodale Inputs: Text, Bild, Audio, Video; offene Plattform unterstützt bis zu 9 Bilder, 3 Videos und 3 Audio-Clips als Referenzen | mittel | kein Nachweis für den konkreten Caramel-/Proxy-Render-Case |
| GO-Renderer, 2026 | 3D-Proxies steuern Viewpoint; Diffusion erzeugt hochwertige Objektansichten und Lighting, ohne komplexe Materialien explizit zu modellieren | stark als Forschungsanschluss | nicht Seedance-spezifisch |
| BlenderFusion, 2025 | 3D-grounded visual editing und generatives Compositing verbinden Blender-Kontrolle mit generativer Szenenfusion | mittel | Forschung, keine Produktionsstandardisierung |
| NVIDIA 3D-guided generative AI Blueprint | Rough 3D Scene in Blender dient als Kontrolle für generative Bildausgabe | mittel als Toolsignal | Bild, nicht Video; Quelle sekundär |

## Was tragfähig ist

- Proxy-3D als Kontrollsignal für generative Bilder/Videos ist technisch plausibel.
- Referenzbilder können Material- und Look-Konsistenz verbessern.
- Der Workflow passt zu Hybrid Workflows und Scene Rooms.
- Für Shots mit schwer simulierbaren Materialien kann die Kombination aus Motion Proxy und AI-Finish attraktiv sein.

## Was nicht tragfähig ist

- `Same result` ist ohne A/B-Test, Shotmaterial, Zeitmessung und Qualitätskriterien nicht belegbar.
- `Less studio time` ist nicht allgemein belastbar.
- Konsistenz mit Restshot ist nicht automatisch gesichert.
- Seedance als spezifisches Tool ist im Claim nicht ausreichend belegt.
- Produktionsreife hängt von Export, Auflösung, Temporal Stability, Rechte, Prompt-Wiederholbarkeit und Compositing-Fähigkeit ab.

## Gegenpositionen

- Voll-CG bleibt überlegen, wenn der Shot präzise physikalische Kontrolle, Simulation, AOVs, Deep Data, Stereo, HDR, lange Dauer oder wiederholbare Revisionen braucht.
- AI-Finish kann temporale Artefakte, Materialdrift, falsche Kontaktkanten, unkontrollierte Highlights oder inkonsistente Schatten erzeugen.
- Bei Flüssigkeiten, Caramel, Glas, Haaren und transparenten Stoffen kann AI überzeugend aussehen, aber in der Comp versagen.
- Referenzbilder lösen keine Rechte-, Provenance- oder Shot-Continuity-Fragen.

## Promotionsanschluss

### Scene Room

- Proxy Mesh als räumliches Kontrollobjekt.
- Reference Image als ästhetischer und materieller Anker.
- Video Model als generativer Füll- und Rekonstruktionsapparat.
- Compositing als Beweis- und Integrationsschicht.

### Mapping Matrix

| Matrixfeld | Eintrag |
|---|---|
| Modell | Seedance / generatives Video-Modell |
| Interface | Prompt + Referenzinput + Renderinput |
| operative Bilder | Proxy Render, Reference Image, generated output |
| Raumlogik | Motion Control durch CG, Look Closure durch AI |
| Verantwortung | Qualität, Rechte, Materialtreue, Wiederholbarkeit |
| Evidenzstatus | `signal / needs-test` |

## Testdesign

- Erzeuge ein einfaches Proxy-Mesh mit kontrollierter Bewegung.
- Rendere Clay/Viewport/Low-Quality-Pass mit stabiler Kamera.
- Erzeuge ein Referenzbild für Material und Licht.
- Generiere mit Seedance oder anderem Image-/Video-conditioned Modell.
- Vergleiche mit vollständigem CG-Render:
  - Dauer.
  - Kosten.
  - Temporal Stability.
  - Materialtreue.
  - Kontaktkanten.
  - Shadow / Reflection Consistency.
  - Revisionierbarkeit.
  - Compositing-Anschluss.
  - Rechte / Provenance.

## URLs

- https://arxiv.org/abs/2604.14148
- https://arxiv.org/abs/2603.23246
- https://arxiv.org/abs/2506.17450
- https://www.theverge.com/news/658613/nvidia-ai-blueprint-blender-3d-image-references
