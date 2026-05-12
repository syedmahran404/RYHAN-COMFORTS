'use client';

import Image from 'next/image';
import { Award, Globe2, Hammer, Heart, Package, Ruler, Shield, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { BRAND } from '@/lib/data/brand';
import { CATALOG_COUNTS } from '@/lib/data/catalog';
import { ROOM_STAGING } from '@/lib/data/imagery';

const PILLARS = [
  { icon: Award, k: `Since ${BRAND.founded}`, v: '25 years of atelier craft' },
  { icon: Globe2, k: 'Export quality', v: 'Shipped to 14 countries' },
  { icon: Hammer, k: 'Premium craftsmanship', v: 'Four master hands per piece' },
  { icon: Heart, k: 'Customer satisfaction', v: '98.6% repeat rate' },
  { icon: Ruler, k: 'Tailored to you', v: '± 2 cm tolerance' },
  { icon: Package, k: 'Nothing ready-made', v: '100% made-to-order' },
  { icon: Shield, k: 'Warranty', v: 'Up to 12 years' },
  { icon: Sparkles, k: 'Signature library', v: `${CATALOG_COUNTS.total}+ silhouettes` }
];

export function HeritageStrip() {
  const img = ROOM_STAGING[2];
  return (
    <section className="relative overflow-hidden bg-ivory-50 py-28">
      <div className="luxe-container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Image — tall editorial frame */}
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden zoom-frame shadow-editorial">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 img-overlay-bottom" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-ivory-50">
                <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                  The signature of our atelier
                </p>
                <p className="mt-2 font-display text-3xl">
                  A quiet excellence,
                  <br />
                  <span className="italic">measured in decades.</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Trust pillars */}
          <div>
            <Reveal>
              <p className="eyebrow">Trust marks</p>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[1] text-pewter-800">
                Eight reasons our clients <span className="gold-text italic">never buy twice.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px bg-pewter-300/40 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.k} delay={i * 0.04}>
                  <div className="group relative h-full bg-ivory-50 p-6 transition-colors duration-500 hover:bg-ivory-100">
                    <p.icon className="h-5 w-5 text-champagne-300" />
                    <p className="mt-5 font-display text-lg text-pewter-800">{p.k}</p>
                    <p className="mt-1 text-sm text-walnut-500">{p.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
