'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SOFA_IMAGES } from '@/lib/data/imagery';
import { formatINR } from '@/lib/utils/format';

/**
 * SofaShowcase — editorial strip of six flagship silhouettes.
 *
 * Deliberately photo-primary: each card is a full-bleed interior
 * image with an overlay caption. The shape is reminiscent of a
 * Bentley Home catalogue spread.
 */

const FEATURED = [
  {
    slug: 'azam-signature',
    name: 'Azam Signature',
    style: 'Signature Series',
    from: 125000
  },
  {
    slug: 'maharaja-throne',
    name: 'Maharaja Throne',
    style: 'Royal Carved',
    from: 95000
  },
  {
    slug: 'milano-curved',
    name: 'Milano Curved',
    style: 'Italian Luxury',
    from: 48000
  },
  {
    slug: 'kensington-chesterfield',
    name: 'Kensington Chesterfield',
    style: 'Chesterfield',
    from: 32000
  },
  {
    slug: 'nimbus-cloud',
    name: 'Nimbus Cloud',
    style: 'Cloud',
    from: 39500
  },
  {
    slug: 'verona-velvet-lounge',
    name: 'Verona Velvet Lounge',
    style: 'Velvet Lounge',
    from: 42000
  }
];

export function SofaShowcase() {
  return (
    <section className="relative bg-ivory-50 py-28">
      <div className="luxe-container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured silhouettes</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
                Six openings into <span className="gold-text italic">the atelier.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-pewter-500 text-pretty">
                A glimpse of our most commissioned silhouettes — from the throne-scale Maharaja
                to the cloud-soft Nimbus. Tap any piece to enter its configurator.
              </p>
            </Reveal>
          </div>
          <Link
            href="/configurator/sofas"
            className="hidden items-center gap-2 text-[11px] uppercase tracking-luxe text-walnut-500 transition-colors hover:text-walnut-400 lg:flex"
          >
            Browse all sofas <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((f, i) => {
            const img = SOFA_IMAGES[f.slug];
            if (!img) return null;
            const isWide = i === 0 || i === 4;
            return (
              <Reveal key={f.slug} delay={i * 0.04}>
                <Link
                  href={`/configurator/sofas/${f.slug}`}
                  className={`group relative block overflow-hidden border border-pewter-300/60 shadow-soft transition-shadow duration-500 hover:shadow-editorial zoom-frame ${
                    isWide ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 img-overlay-bottom" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory-50">
                    <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                      {f.style}
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <h3 className="font-display text-2xl leading-tight">{f.name}</h3>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-luxe text-champagne-200"
                      >
                        Configure
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </motion.span>
                    </div>
                    <p className="mt-2 font-mono text-[11px] text-ivory-100/80">
                      From {formatINR(f.from)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
