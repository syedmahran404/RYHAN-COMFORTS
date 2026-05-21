# Ryhan Comforts — Phase 1

A cinematic, luxury digital atelier for **Ryhan Comforts** — custom-made luxury furniture since 2000.

> Owner: **Azam Pasha** · Sub Manager: **Syed Mahran**
> +91 72045***** · +91 86180*****

## Phase 1 Scope

Phase 1 establishes a scalable foundation — not a finished product. It ships:

- Next.js 14 App Router + TypeScript + Tailwind + ShadCN-compatible primitives
- Luxury design system (obsidian / walnut / bronze / gold / cream)
- Framer Motion + GSAP + Lenis scroll orchestration
- React Three Fiber engine with HDR environment, PBR materials, procedural sofa
- Zustand configurator store + pricing engine
- Schema-driven catalog (sofas, chairs, beds, mattresses, curtains, headboards)
- Cinematic homepage with 3D hero, story scroll, signature collection, craft process, contact
- Working **sofa configurator prototype** with live material / color / foam / seating and realtime pricing

## Architecture

```
src/
├─ app/                 # App Router routes, layouts, metadata
├─ components/
│  ├─ ui/              # Reusable primitives (button, card, slider, ...)
│  ├─ layout/          # Navbar, Footer, Shell, CommandMenu
│  ├─ motion/          # Reveal, Parallax, MagneticButton, Marquee
│  └─ three/           # Stage, Lighting, SofaModel, MaterialSystem
├─ features/
│  ├─ home/            # Hero, Story, Signature, Craft, Testimonials, CTA
│  └─ configurator/    # Schema-driven engine + Sofa prototype
├─ lib/
│  ├─ data/            # Catalog, fabrics, woods, models, brand
│  ├─ pricing/         # Pricing engine
│  ├─ state/           # Zustand stores
│  ├─ schemas/         # Zod schemas (Phase 2 admin-ready)
│  └─ utils/           # cn, format, etc.
└─ styles/              # globals.css
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Phase 2 — designed-in extension points

- Admin CMS writes into `lib/data/*` schemas (already Zod-validated).
- Swap procedural sofa for GLTF — `components/three/SofaModel` has a `variant` prop.
- Pricing engine already supports multiple rules per category (`lib/pricing/engine.ts`).
- All configurator state is dehydrated — quotes API stub at `app/api/quote/route.ts`.
