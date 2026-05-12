'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CategoryMeta } from '@/lib/data/categories';
import type { Product } from '@/lib/schemas/product';
import { CATEGORY_COVERS, resolveProductImage, ROOM_STAGING } from '@/lib/data/imagery';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { formatINR } from '@/lib/utils/format';

/**
 * CategoryLanding — editorial landing for each category.
 *
 * Layout:
 *   · hero image + title + tagline + "open configurator" CTA
 *   · style filter strip
 *   · editorial product grid with real imagery + price + tags
 *   · lifestyle strip + supporting copy
 */
export function CategoryLanding({
  category,
  products
}: {
  category: CategoryMeta;
  products: Product[];
}) {
  const cover = CATEGORY_COVERS[category.id] ?? CATEGORY_COVERS.sofa;

  // Deduplicate by style for the filter strip
  const styles = Array.from(
    new Set(products.map((p) => p.style).filter((s): s is string => Boolean(s)))
  );

  const categoryConfigSlug =
    category.id === 'hydraulic-bed' ? 'beds' : `${category.id}s`;

  return (
    <>
      {/* ═════════════ HERO ═════════════ */}
      <section className="relative min-h-[80svh] overflow-hidden pt-20">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-100/85 via-ivory-100/25 to-ivory-100/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-100/80 via-transparent to-transparent" />
        </motion.div>

        <div className="luxe-container flex min-h-[80svh] flex-col justify-end py-20">
          <Reveal>
            <Badge>{category.subtitle}</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-3xl font-display text-hero font-light leading-[0.92] text-pewter-800 text-balance">
              {category.label.split(' ').map((w, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? 'gold-text italic' : ''}>
                  {w}{' '}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-pewter-600 text-pretty">
              {category.description}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={`/configurator/${categoryConfigSlug}`}>
                <Button size="lg" variant="primary">
                  Open live configurator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Book a consultation
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ STYLE FILTER STRIP ═════════════ */}
      {styles.length > 0 && (
        <section className="relative border-y border-pewter-300/60 bg-ivory-50 py-8">
          <div className="luxe-container">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] uppercase tracking-luxe text-pewter-400">
                Silhouettes ·
              </span>
              {styles.slice(0, 14).map((s) => (
                <span
                  key={s}
                  className="border border-pewter-300/70 bg-ivory-100 px-3 py-1.5 text-[10px] uppercase tracking-luxe text-walnut-500"
                >
                  {s.replace(/-/g, ' ')}
                </span>
              ))}
              {styles.length > 14 && (
                <span className="text-[10px] uppercase tracking-luxe text-pewter-400">
                  +{styles.length - 14} more
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ EDITORIAL PRODUCT GRID ═════════════ */}
      <section className="relative bg-ivory-100 py-20">
        <div className="luxe-container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The {category.label.toLowerCase()} archive</p>
              <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
                {products.length} silhouettes.
                <span className="gold-text italic"> One atelier.</span>
              </h2>
            </div>
            <Link
              href={`/configurator/${categoryConfigSlug}`}
              className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-walnut-500 transition-colors hover:text-walnut-400"
            >
              Configure the flagship <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => {
              const img = resolveProductImage(p.slug, p.category);
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
                      <div className="absolute inset-0 img-overlay-bottom opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                      {/* Badge row */}
                      <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 text-[9px] uppercase tracking-luxe">
                        <span className="border border-white/30 bg-white/10 px-2 py-1 text-ivory-50 backdrop-blur-sm">
                          {p.style?.replace(/-/g, ' ') ?? p.category}
                        </span>
                        {p.tags?.[0] && (
                          <span className="border border-champagne-200/60 bg-ivory-50/90 px-2 py-1 text-walnut-500">
                            {p.tags[0].replace(/-/g, ' ')}
                          </span>
                        )}
                      </div>

                      {/* Bottom info */}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-ivory-50">
                        <h3 className="font-display text-xl leading-tight">{p.name}</h3>
                        <p className="mt-1 line-clamp-1 text-[11px] text-ivory-100/80">
                          {p.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Bottom bar — price + CTA */}
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
        </div>
      </section>

      {/* ═════════════ LIFESTYLE STRIP ═════════════ */}
      <section className="relative overflow-hidden bg-ivory-50 py-24">
        <div className="luxe-container grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="relative aspect-[5/4] w-full overflow-hidden zoom-frame shadow-editorial">
              <Image
                src={ROOM_STAGING[0].url}
                alt={ROOM_STAGING[0].alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-end">
              <p className="eyebrow">Made for your room</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] text-pewter-800 text-balance">
                Drawn to fit the light you live in.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-pewter-500 text-pretty">
                Every {category.label.toLowerCase().slice(0, -1)} is built after order, to your
                dimensions and your fabric. Our atelier begins with measuring the room, and ends
                with the craftsman signing the underside.
              </p>
              <div className="mt-8">
                <Link href={`/configurator/${categoryConfigSlug}`}>
                  <Button size="lg" variant="primary">
                    Begin your {category.label.toLowerCase().slice(0, -1)}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
