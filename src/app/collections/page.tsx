import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';
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
    <section className="relative min-h-[100svh] pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-60" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Curated collections</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
            Signature <span className="gold-text italic">collections.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-200/70 text-pretty">
            Curated edits of the Ryhan catalogue — each collection is a vocabulary of
            silhouettes our atelier applies to your room.
          </p>
        </Reveal>

        {/* Featured collections */}
        <h2 className="mt-16 text-[10px] uppercase tracking-luxe text-gold-200">
          — The signature edits
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <Link
                href={`${ROUTES.collections}/${c.slug}`}
                className="group relative block overflow-hidden border border-obsidian-600/70 bg-obsidian-900/40 p-8 transition-all duration-500 hover:border-gold-500/40 hover:bg-obsidian-800/60"
              >
                <p className="text-[10px] uppercase tracking-luxe text-gold-300">{c.subtitle}</p>
                <h3 className="mt-6 font-display text-3xl text-cream-50">{c.label}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream-200/70">
                  {c.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 transition-transform duration-500 group-hover:translate-x-1">
                  View collection <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Category index — browse-by-type */}
        <h2 className="mt-20 text-[10px] uppercase tracking-luxe text-gold-200">
          — Or browse by category
        </h2>
        <div className="mt-6 grid gap-px bg-obsidian-600/50 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const slug =
              c.id === 'sofa'
                ? 'sofas'
                : c.id === 'chair'
                  ? 'chairs'
                  : c.id === 'bed'
                    ? 'beds'
                    : c.id === 'mattress'
                      ? 'mattresses'
                      : c.id === 'curtain'
                        ? 'curtains'
                        : c.id === 'headboard'
                          ? 'headboards'
                          : null;
            const href = slug ? `/configurator/${slug}` : ROUTES.configurator;
            return (
              <Link
                key={c.id}
                href={href}
                className="group relative bg-obsidian-900 p-8 transition-colors duration-500 hover:bg-obsidian-800"
              >
                <p className="text-[10px] uppercase tracking-luxe text-gold-300">{c.subtitle}</p>
                <h3 className="mt-5 font-display text-3xl text-cream-50">{c.label}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream-200/70 text-pretty">
                  {c.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 opacity-70 transition-opacity group-hover:opacity-100">
                  Open configurator <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {rest.length > 0 && (
          <>
            <h2 className="mt-20 text-[10px] uppercase tracking-luxe text-gold-200">
              — Other collections
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((c) => (
                <Link
                  key={c.id}
                  href={`${ROUTES.collections}/${c.slug}`}
                  className="group border border-obsidian-600/60 bg-obsidian-900/40 p-6 transition-colors hover:border-gold-500/40"
                >
                  <p className="text-[10px] uppercase tracking-luxe text-gold-300">
                    {c.subtitle}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-cream-50">{c.label}</h3>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
