# KAGE (影の道) — World Specification

> **Five-Chapter Night Walk Through a Kyoto Mountain Temple**
> Procedural Three.js Sanctuary · Native Scroll Camera Spline · Zero External 3D Models

---

## 1. World Identity & Atmosphere

- **Title**: `KAGE` (`影の道 · FIVE CHAPTER NIGHT`)
- **Setting**: Aged mountain temple sanctuary in Kyoto at midnight
- **Sky & Fog**: Deep obsidian-charcoal sky (`#07080c`), exponential night mist (`#090a0f`, density `0.038`)
- **Celestial Body**: Low vermilion blood moon (`#d94848` / `#ff6b6b`) with procedural lunar maria texture and dual-layer atmospheric corona at `(5.8, 5.2, -19.0)`
- **Particles**: `168` procedural crimson maple leaves (`momiji`) and ember spores drifting on sinusoidal wind currents

---

## 2. Runtime Procedural Geometry

1. **Monumental 3D Typography (`K A G E`)**
   - High-DPI procedural canvas plane suspended at `z = -5.8`, depth-tested so the foreground mossy hill and lower temple sanctuary naturally occlude the base of the letterforms.
2. **Moss Ridge & Instanced Grass (`4,500` blades)**
   - Rolling foreground mound on the left (`x: -3.2, z: -2.0`) with vertex-swaying instanced grass blades catching cool moonlight and warm lantern bounce.
3. **Sanmon & Main Temple Hall (`Hondō`)**
   - Multi-tiered curved Japanese *irimoya* pagoda roof with upturned eaves, ribbed tiles, vermilion structural columns (`#8f2424`), charred cedar beams (`yakisugi`), and white plaster panels.
   - Five warm oil-paper *shoji* screens (`#f3cf8a`) along the inner sanctuary gallery casting soft amber light onto the veranda.
4. **Tamagaki Fence, Torii & Moss Stones**
   - Worn granite stepping stones, wooden courtyard fence along the lower threshold, outer vermilion torii silhouette, and carved stone lanterns (`tōrō`).
5. **Hero Crimson Momiji Leaf**
   - Procedural 7-lobed Japanese maple leaf mesh that drifts into focus during Chapter 02 (*Threshold*).

---

## 3. Single Camera Path (5 Scroll Chapters)

| Chapter | Scroll Range | Camera Position `(x, y, z)` | LookAt Target `(x, y, z)` | Narrative Focus |
| :--- | :--- | :--- | :--- | :--- |
| **01 · Prologue** | `0.00 – 0.20` | `(0.0, 2.35, 6.8)` | `(0.0, 2.15, -6.0)` | Monumental `K A G E` occluded by mossy hill, temple roof & blood moon |
| **02 · Threshold** | `0.20 – 0.42` | `(0.5, 1.15, 2.4)` | `(0.3, 1.25, -5.5)` | Descending past the hill to the wooden fence, stone lanterns & floating maple leaf |
| **03 · Gardens** | `0.42 – 0.65` | `(-1.1, 1.85, -0.4)` | `(0.8, 2.40, -7.5)` | Courtyard angle framing the temple eaves & crimson moon behind 3 illustrated field notes |
| **04 · Rituals** | `0.65 – 0.85` | `(2.6, 1.45, -1.6)` | `(0.2, 1.95, -7.8)` | Diagonal sweep across the tiled roof ridge and glowing sanctuary shoji screens |
| **05 · Afterlight** | `0.85 – 1.00` | `(0.0, 1.65, -2.1)` | `(0.0, 2.05, -8.5)` | Symmetrical face-on stillness before the five illuminated shoji panels |
