'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { CATEGORY_COVERS } from '@/lib/data/imagery';
import { ROUTES } from '@/lib/utils/constants';
import { Reveal } from '@/components/motion/Reveal';

/**
 * SignatureCollections — editorial magazine grid with real photography.
 *
 * Each tile opens the category landing (e.g. /collections/sofas) which
 * presents a full editorial layout before the configurator.
 */
export function SignatureCollections() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="luxe-container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">The signature collections</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
                Every room, <span className="gold-text italic">redrawn.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-pewter-500 text-pretty">
                Six categories · hundreds of silhouettes · one atelier. Choose a room and we
                will tailor its furniture to your space, your fabric, your soul.
              </p>
            </Reveal>
          </div>
          <Link
            href={ROUTES.collections}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-luxe text-walnut-500 transition-colors hover:text-walnut-400 lg:flex"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 6).map((c, i) => {
            const cover = CATEGORY_COVERS[c.id] ?? CATEGORY_COVERS.sofa;
            return (
              <Reveal key={c.id} delay={i * 0.06}>
                <CollectionTile
                  title={c.label}
                  subtitle={c.subtitle}
                  description={c.description}
                  href={`/collections/${c.slug}`}
                  image={cover.url}
                  alt={cover.alt}
                  index={i}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CollectionTile({
  title,
  subtitle,
  description,
  href,
  image,
  alt,
  index
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  index: number;
}) {
  return (
    <motion.div
      whileHover="hover"
      className="group relative overflow-hidden border border-pewter-300/60"
    >
      <Link href={href} className="block zoom-frame">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />

          {/* Gradient overlay keeps type legible */}
          <div className="absolute inset-0 img-overlay-bottom" />

          {/* Index mark */}
          <div className="absolute left-6 top-6 font-display text-2xl text-ivory-50/80">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-7 text-ivory-50">
            <p className="text-[10px] uppercase tracking-luxe text-champagne-200">{subtitle}</p>
            <h3 className="mt-2 font-display text-3xl">{title}</h3>
            <p className="mt-3 line-clamp-2 max-w-[30ch] text-xs leading-relaxed text-ivory-100/85">
              {description}
            </p>

            <motion.div
              variants={{ hover: { x: 6 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-champagne-200"
            >
              Explore the collection
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
