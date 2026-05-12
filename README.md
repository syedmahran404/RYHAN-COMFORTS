# Ryhan Comforts — Phase 2

A cinematic, luxury digital atelier for **Ryhan Comforts** — custom-made luxury furniture since 2000.

> Owner: **Azam Pasha** · Sub Manager: **Syed Mahran**
> +91 72045 56776 · +91 86180 82641

## Phases

| Phase | Status | Scope |
| ----- | ------ | ----- |
| **Phase 1** | ✓ Merged | Scalable foundation, design system, base configurator, working sofa prototype. |
| **Phase 2** | ✓ This branch | Full parametric catalog, advanced configurators for all six categories, enterprise pricing, advanced 3D, admin dashboard. |
| **Phase 3** | Roadmap | Auth, Prisma/Postgres, GLTF swap, quote inbox + PDF, CMS writes. |

## Phase 2 deliverables

- **Schemas** — extended with `Section`, `ProductStyle`, `ProductTag`, `Dimensions`, `Complexity`, `PricingRule`, `Foam`, `Collection`. Phase 1 schemas remain validators.
- **Pricing engine** — complexity multiplier, dimension-based surcharges (area + height), tag premiums, foam tiering.
- **Parametric catalog** — generator functions for sofa / chair / bed / headboard / mattress / curtain. Adding a new silhouette is one function call.
- **Style library** — 13 sofa styles × 3 sub-models each; 9 chair styles; 5 bed kinds; 5 headboard kinds; 5 mattress kinds; 5 curtain kinds.
- **Collections** — Signature · Trending · Premium · Luxury Heritage · Italian Luxury · Export Quality · Hotel Grade.
- **Materials** — Velvets · Linens · Cottons · Bouclés · Suedes · Rexines · Leathers · Premium fabrics · Woods · Metals · Mattress cores.
- **Foams** — Better (40D) · Best (50D) · Luxury Premium (60D), scoped per slot (seat/back/mattress/bed/headboard).
- **3D engine** — `ProductViewer` dispatcher with 6 procedural models (sofa with 7 arm styles, 5 back styles, 6 leg styles, 4 seat patterns; chair, bed, headboard, mattress, curtain each with style-aware variants). Quality tiers (Fast / Balanced / Cinematic). Procedural PBR fabric, leather, wood normal maps.
- **Configurator shell** — schema-driven section tabs, dimension panel (W×D×H), live auto-rotate / quality controls, grouped price breakdown, server-posted quotes (with WhatsApp fallback).
- **Advanced UI** — PageTransition, FloatingWhatsApp consultation CTA, ScrollStoryteller (pinned scroll-driven story panel), HeritageStrip, MaterialsPalette.
- **Admin dashboard** at `/admin` — read-only surface of the catalog, materials, foams, collections, pricing rules (Phase 3 unlocks writes).
- **Routes** — `/configurator/:category` + `/configurator/:category/:slug`, `/collections/:slug`, `/admin`, plus Phase 1 home/about/contact/craft.

## Architecture

```
src/
├─ app/                               # App Router routes, layouts, metadata
│  ├─ configurator/[category]/[slug]/ # Per-product configurator route
│  ├─ collections/[slug]/             # Curated collection detail
│  ├─ admin/                          # Read-only dashboard
│  └─ api/quote/                      # Quote submission endpoint
├─ components/
│  ├─ ui/              # Reusable primitives (button, card, slider, badge, separator)
│  ├─ layout/          # Navbar, Footer, FloatingWhatsApp
│  ├─ motion/          # Reveal, Parallax, MagneticButton, Marquee, PageTransition, AnimatedNumber
│  └─ three/           # Stage, Lighting, MaterialSystem, ProductViewer + 6 category models
├─ features/
│  ├─ home/            # Hero, Story, Collections, Materials, Heritage, Scroll story, Craft, Testimonials, CTA
│  └─ configurator/    # Shell + Stage + ProductViewer consumer + SectionTabs + DimensionsPanel + StageControls
├─ lib/
│  ├─ data/            # Brand, catalog, categories, foams, materials, collections
│  │  └─ generators/   # Parametric builders — one per category
│  ├─ pricing/         # Enterprise pricing engine
│  ├─ state/           # Zustand stores (configurator, ui)
│  ├─ schemas/         # Zod schemas (admin-ready)
│  └─ utils/           # cn, format, constants
└─ styles/             # globals.css
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Phase 3 — designed-in extension points

- Swap procedural meshes for GLTF — each `<mesh>` carries `userData.slot` tags for traverse-and-rewire.
- Every `lib/data/*` file is a Zod-validated source of truth — Prisma adapters drop in cleanly.
- `/api/quote` already validates with the same schemas the store dehydrates against.
- Catalog + materials + foams + collections are all admin-rewritable via the schemas exposed at `/admin`.
