'use client';

import { Award, Globe2, Hammer, Heart, Package, Ruler, Shield, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { BRAND } from '@/lib/data/brand';
import { CATALOG_COUNTS } from '@/lib/data/catalog';

/**
 * HeritageStrip — trust + branding section.
 *
 * Since 2000 · Export quality · Premium craftsmanship ·
 * Customer satisfaction · Premium materials · Process visualisation.
 */

const PILLARS = [
  {
    icon: Award,
    k: `Since ${BRAND.founded}`,
    v: '25 years of atelier craft',
    d: 'A quarter century of bespoke commissions across Bengaluru and beyond.'
  },
  {
    icon: Globe2,
    k: 'Export quality',
    v: 'Shipped to 14 countries',
    d: 'Climate-tested, moisture-protected frames certified for global delivery.'
  },
  {
    icon: Hammer,
    k: 'Premium craftsmanship',
    v: 'Four master hands per piece',
    d: 'Every Ryhan piece passes carpenter, upholsterer, tailor and finisher.'
  },
  {
    icon: Heart,
    k: 'Customer satisfaction',
    v: '98.6% repeat rate',
    d: 'Nearly nine in ten clients return for a second commission.'
  },
  {
    icon: Ruler,
    k: 'Tailored to you',
    v: '± 2 cm tolerance',
    d: 'Every dimension measured in atelier before the first cut.'
  },
  {
    icon: Package,
    k: 'Nothing ready-made',
    v: '100% made-to-order',
    d: 'No warehouses. No off-the-rack stock. Only your commission.'
  },
  {
    icon: Shield,
    k: 'Warranty',
    v: 'Up to 12 years',
    d: 'Tier-scaled warranty on frames, foam, upholstery and hardware.'
  },
  {
    icon: Sparkles,
    k: 'Signature library',
    v: `${CATALOG_COUNTS.total}+ silhouettes`,
    d: 'Parametric architecture — each silhouette yields millions of configurations.'
  }
];

export function HeritageStrip() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-70" />
      <div className="noise-overlay" />
      <div className="absolute inset-0 -z-10 bg-cinema-vignette opacity-40" />

      <div className="luxe-container">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">The signature of our atelier</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-cream-50 text-balance">
                A quiet excellence,
                <br />
                <span className="gold-text italic">measured in decades.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-sm leading-relaxed text-cream-200/70 text-pretty">
              We don't scale by factories. We scale by hands, craftsmen, and the willingness
              to tell a client that their sofa will be ready in six to ten weeks.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-obsidian-600/40 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.05}>
              <div className="group relative h-full bg-obsidian-900/80 p-7 transition-colors duration-700 hover:bg-obsidian-800/80">
                <p.icon className="h-5 w-5 text-gold-300" />
                <p className="mt-6 font-display text-lg text-cream-50">{p.k}</p>
                <p className="mt-1 text-sm text-gold-200/90">{p.v}</p>
                <p className="mt-3 text-[12px] leading-relaxed text-cream-200/55 text-pretty">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
