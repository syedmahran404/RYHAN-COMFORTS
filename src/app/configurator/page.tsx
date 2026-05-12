import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { FLAGSHIPS } from '@/lib/data/catalog';
import { formatINR } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Configurator',
  description: 'Choose a category to begin designing your bespoke piece.'
};

export default function ConfiguratorIndex() {
  return (
    <section className="relative min-h-[100svh] pt-32 pb-20">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-60" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Configurator · Six categories · Live 3D</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
            Choose your <span className="gold-text italic">starting silhouette.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-200/70 text-pretty">
            Every category opens into a live 3D atelier where you pick silhouette, fabric,
            foam, wood, dimensions and finish — with realtime pricing at every step.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 6).map((c, i) => {
            const flagship = FLAGSHIPS[c.id];
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
            const href = slug ? `/configurator/${slug}` : '/configurator';
            const isLive = Boolean(flagship && slug);
            return (
              <Reveal key={c.id} delay={i * 0.06}>
                <Link
                  href={href}
                  className={`group relative block overflow-hidden border p-8 transition-all duration-500 ${
                    isLive
                      ? 'border-gold-500/30 bg-obsidian-800/40 hover:border-gold-400 hover:bg-obsidian-800/70'
                      : 'border-obsidian-600/60 bg-obsidian-900/40 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[10px] uppercase tracking-luxe text-gold-300">
                      {c.subtitle}
                    </p>
                    <span className="text-[9px] uppercase tracking-luxe text-gold-200">
                      · Live
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-cream-50">{c.label}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream-200/70">
                    {c.description}
                  </p>
                  <div className="mt-8 flex items-end justify-between">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 transition-transform duration-500 group-hover:translate-x-1">
                      Open configurator <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                    {flagship && (
                      <span className="font-mono text-[11px] text-cream-200/70 tabular-nums">
                        from {formatINR(flagship.basePrice)}
                      </span>
                    )}
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
