'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Collection, Product } from '@/lib/schemas/product';
import { CATEGORY_COVERS, resolveProductImage, ROOM_STAGING } from '@/lib/data/imagery';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { formatINR } from '@/lib/utils/format';

/**
 * CuratedCollection — editorial landing for Signature / Trending / Premium /
 * Luxury Heritage / Italian Luxury / Export Quality / Hotel Grade.
 */
export function CuratedCollection({
  collection,
  products
}: {
  collection: Collection;
  products: Product[];
}) {
  // Choose a matching hero image based on the first product's category,
  // or fallback to a room staging photo.
  const hero =
    products[0] &&
    (CATEGORY_COVERS[products[0].category] ?? ROOM_STAGING[collection.order % ROOM_STAGING.length]);
  const heroImg = hero ?? ROOM_STAGING[0];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[72svh] overflow-hidden pt-20">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={heroImg.url}
            alt={heroImg.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-100/80 via-ivory-100/25 to-ivory-100/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-100/80 via-transparent to-transparent" />
        </motion.div>

        <div className="luxe-container flex min-h-[72svh] flex-col justify-end py-20">
          <Reveal>
            <Badge>{collection.subtitle}</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-3xl font-display text-hero font-light leading-[0.92] text-pewter-800 text-balance">
              {collection.label.split(' ').map((w, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? 'gold-text italic' : ''}>
                  {w}{' '}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-pewter-600 text-pretty">
              {collection.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="relative bg-ivory-100 py-24">
        <div className="luxe-container">
          <p className="eyebrow">Curated pieces · {products.length}</p>
          <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
            Hand-picked by
            <span className="gold-text italic"> our atelier.</span>
          </h2>

          {products.length === 0 ? (
            <p className="mt-10 max-w-lg text-sm text-pewter-500">
              Pieces for this collection are being commissioned. Please contact our atelier.
            </p>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => {
                const img = resolveProductImage(p.slug, p.category);
                const categoryConfigSlug =
                  p.category === 'hydraulic-bed' ? 'beds' : `${p.category}s`;
                return (
                  <Reveal key={p.id} delay={(i % 9) * 0.04}>
                    <Link
                      href={`/configurator/${categoryConfigSlug}/${p.slug}`}
                      className="group relative block overflow-hidden border border-pewter-300/60 bg-ivory-50 shadow-soft transition-shadow duration-500 hover:shadow-editorial"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden zoom-frame">
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 img-overlay-bottom opacity-70" />
                        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 text-[9px] uppercase tracking-luxe">
                          <span className="border border-white/30 bg-white/10 px-2 py-1 text-ivory-50 backdrop-blur-sm">
                            {p.style?.replace(/-/g, ' ') ?? p.category}
                          </span>
                          <span className="border border-champagne-200/60 bg-ivory-50/90 px-2 py-1 text-walnut-500">
                            {p.category}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-ivory-50">
                          <h3 className="font-display text-xl">{p.name}</h3>
                          <p className="mt-1 line-clamp-1 text-[11px] text-ivory-100/80">
                            {p.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-pewter-300/60 px-5 py-4">
                        <span className="font-mono text-xs text-walnut-500 tabular-nums">
                          From {formatINR(p.basePrice)}
                        </span>
                        <motion.span
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-pewter-600 group-hover:text-walnut-500"
                        >
                          Configure <ArrowUpRight className="h-3.5 w-3.5" />
                        </motion.span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
