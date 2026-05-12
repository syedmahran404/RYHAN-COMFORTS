import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';
import { CATEGORY_COVERS, ROOM_STAGING } from '@/lib/data/imagery';
import { ROUTES } from '@/lib/utils/constants';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'Ryhan Comforts signature collections — Signature, Trending, Premium, Heritage, Italian Luxury, Export Quality and Hotel Grade.'
};

export default function CollectionsIndex() {
  const featured = COLLECTIONS.filter((c) => c.featured).sort((a, b) => a.order - b.order);
  const rest = COLLECTIONS.filter((c) => !c.featured).sort((a, b) => a.order - b.order);

  return (
    <section className="relative min-h-[100svh] bg-ivory-100 pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-ivory-paper opacity-60" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Curated collections</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-pewter-800 text-balance">
            Signature <span className="gold-text italic">collections.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pewter-500 text-pretty">
            Curated edits of the Ryhan catalogue — each collection is a vocabulary of silhouettes
            our atelier applies to your room.
          </p>
        </Reveal>

        {/* Featured collections — editorial image-led tiles */}
        <h2 className="mt-16 text-[10px] uppercase tracking-luxe text-walnut-500">
          — The signature edits
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => {
            const img = ROOM_STAGING[i % ROOM_STAGING.length];
            return (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link
                  href={`${ROUTES.collections}/${c.slug}`}
                  className="group relative block overflow-hidden border border-pewter-300/60 bg-ivory-50 shadow-soft transition-shadow duration-500 hover:shadow-editorial"
                >
                  <div className="relative aspect-[4/5] overflow-hidden zoom-frame">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 img-overlay-bottom" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-ivory-50">
                      <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                        {c.subtitle}
                      </p>
                      <h3 className="mt-2 font-display text-3xl">{c.label}</h3>
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-ivory-100/85">
                        {c.description}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-champagne-200">
                        View collection <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Category index — browse-by-type, real imagery */}
        <h2 className="mt-20 text-[10px] uppercase tracking-luxe text-walnut-500">
          — Or browse by category
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.filter((c) => c.id !== 'deewan').map((c) => {
            const cover = CATEGORY_COVERS[c.id];
            return (
              <Link
                key={c.id}
                href={`/collections/${c.slug}`}
                className="group relative block overflow-hidden border border-pewter-300/60 bg-ivory-50 shadow-soft transition-shadow duration-500 hover:shadow-editorial"
              >
                <div className="relative aspect-[5/4] overflow-hidden zoom-frame">
                  {cover && (
                    <Image
                      src={cover.url}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 img-overlay-bottom" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory-50">
                    <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                      {c.subtitle}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{c.label}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-pewter-300/60 px-5 py-4">
                  <p className="text-xs text-pewter-500">{c.description.split('.')[0]}.</p>
                  <ArrowUpRight className="h-3.5 w-3.5 text-walnut-500" />
                </div>
              </Link>
            );
          })}
        </div>

        {rest.length > 0 && (
          <>
            <h2 className="mt-20 text-[10px] uppercase tracking-luxe text-walnut-500">
              — Other collections
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((c) => (
                <Link
                  key={c.id}
                  href={`${ROUTES.collections}/${c.slug}`}
                  className="group border border-pewter-300/60 bg-ivory-50 p-6 transition-colors hover:border-champagne-300"
                >
                  <p className="text-[10px] uppercase tracking-luxe text-champagne-300">
                    {c.subtitle}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-pewter-800">{c.label}</h3>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
