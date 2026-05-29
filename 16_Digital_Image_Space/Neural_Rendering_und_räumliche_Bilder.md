# Neural Rendering und räumliche Bilder

## Karpathy-Status

- Lifecycle: `scoping / evidence-linked`
- Rolle: Promotions- und Theorieachse
- Evidenzmodus: Theorieanker, Quellenanschlüsse, offene Fragen
- Denkraum: erlaubt, solange Status und Unsicherheit sichtbar bleiben.
- Nicht als Claim nutzen: nicht claim-ready ohne Matrixeintrag.
- Nächster Prüfschritt: Status in Claim Evidence Matrix abgleichen.
Tags: #neural-rendering #gaussian-splatting #nerf #3d #4d

## Kurzthese

Neural Rendering und Gaussian Splatting machen Bilder navigierbar. Sie verwandeln fotografische oder videografische Aufnahmen in räumliche Repräsentationen, die aus neuen Blickwinkeln gerendert werden können.

## Technologien

### NeRF

Neural Radiance Fields beschreiben Szenen als kontinuierliche neuronale Felder. Sie sind qualitativ stark, aber häufig rechenintensiv und weniger direkt editierbar.

### Gaussian Splatting

Gaussian Splatting repräsentiert Szenen durch viele anisotrope 3D-Gaussians mit Position, Form, Farbe und Opazität. Es ist oft schneller renderbar und näher an interaktiven Workflows.

### 4D Gaussian Splatting

4D-Ansätze ergänzen Zeit und Bewegung. Dadurch werden dynamische Szenen, Performances und bewegte Objekte interessanter für VFX und immersive Medien.

## Relevanz für Postproduktion

- Location Scans.
- digitale Sets.
- Re-Camera.
- Free-Viewpoint.
- Set Extensions.
- virtuelle Kamerafahrten.
- immersive Installationen.
- Previs.
- AI-gestütztes Relighting und Compositing.

## Grenze

Räumliche Bildrepräsentationen sind nicht automatisch saubere 3D-Assets. Problematisch bleiben transparente Materialien, spiegelnde Oberflächen, bewegte Personen, dynamisches Licht, rechtliche Provenance, präzise Art Direction und Export in etablierte VFX-Pipelines.

## Forschungsfrage

> Wann wird ein räumliches Bild zu einem produktionsfähigen VFX-Asset?

