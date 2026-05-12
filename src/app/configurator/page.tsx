import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/data/categories';
import { ROUTES } from '@/lib/utils/constants';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Configurator',
  description: 'Choose a category to begin designing your bespoke piece.'
};

export default function ConfiguratorIndex() {
  return (
    <section className="relative min-h-[100svh] pt-32 pb-20">
      <div className="noise-overlay" />
      <div className="luxe-container">
        <Badge>Configurator · Phase 1</Badge>
        <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
          Choose your <span className="gold-text italic">starting silhouette.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-200/70 text-pretty">
          The atelier begins with a single decision. Phase 1 launches with our flagship sofa
          configurator — the chair, bed, mattress, curtain and headboard configurators arrive in
          Phase 2, built on the same engine.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 6).map((c) => {
            const isLive = c.id === 'sofa';
            const className = `group relative block overflow-hidden border p-8 transition-all duration-500 ${
              isLive
                ? 'border-gold-500/30 bg-obsidian-800/40 hover:border-gold-400 hover:bg-obsidian-800/70'
                : 'border-obsidian-600/60 bg-obsidian-900/40 cursor-not-allowed opacity-60'
            }`;

            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <p className="text-[10px] uppercase tracking-luxe text-gold-300">
                    {c.subtitle}
                  </p>
                  {isLive ? (
                    <span className="text-[9px] uppercase tracking-luxe text-gold-200">
                      · Live
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-luxe text-cream-200/40">
                      · Phase 2
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-3xl text-cream-50">{c.label}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream-200/70">
                  {c.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200">
                  {isLive ? 'Open configurator' : 'Coming soon'}
                  {isLive && <ArrowUpRight className="h-3.5 w-3.5" />}
                </div>
              </>
            );

            return isLive ? (
              <Link key={c.id} href={ROUTES.configuratorSofa} className={className}>
                {inner}
              </Link>
            ) : (
              <div key={c.id} className={className} aria-disabled>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
