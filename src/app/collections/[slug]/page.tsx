import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS, getCollection } from '@/lib/data/collections';
import { getProductsByCollection, getProductsByTag } from '@/lib/data/catalog';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { Reveal } from '@/components/motion/Reveal';

export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCollection(params.slug);
  if (!c) return { title: 'Collection' };
  return { title: `${c.label} Collection`, description: c.description };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const pinned = collection.productIds ? getProductsByCollection(collection.id) : [];
  const tagMatched = collection.filterTag ? getProductsByTag(collection.filterTag) : [];
  const seen = new Set<string>();
  const products = [...pinned, ...tagMatched].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  return (
    <section className="relative min-h-[100svh] pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-80" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Collection · {collection.subtitle}</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
            {collection.label.split(' ').map((w, i, arr) => (
              <span key={i} className={i === arr.length - 1 ? 'gold-text italic' : ''}>
                {w}{' '}
              </span>
            ))}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-200/70 text-pretty">
            {collection.description}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 && (
            <p className="col-span-full text-sm text-cream-200/60">
              Pieces for this collection are being commissioned. Please contact our atelier.
            </p>
          )}
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Link
                href={`/configurator/${categorySlug(p.category)}/${p.slug}`}
                className="group block overflow-hidden border border-obsidian-600/70 bg-obsidian-900/40 p-6 transition-all duration-500 hover:border-gold-500/40 hover:bg-obsidian-800/60"
              >
                <div className="flex items-start justify-between">
                  <p className="text-[10px] uppercase tracking-luxe text-gold-300">
                    {p.style?.replace(/-/g, ' ') ?? p.category}
                  </p>
                  {p.tags?.[0] && (
                    <span className="text-[9px] uppercase tracking-luxe text-cream-200/60">
                      · {p.tags[0].replace(/-/g, ' ')}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-2xl text-cream-50">{p.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-cream-200/60">{p.tagline}</p>
                <div className="mt-6 flex items-end justify-between">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 transition-transform duration-500 group-hover:translate-x-1">
                    Configure <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-xs text-cream-200/70 tabular-nums">
                    from {formatINR(p.basePrice)}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function categorySlug(category: string) {
  if (category === 'hydraulic-bed') return 'beds';
  return `${category}s`;
}
