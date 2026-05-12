import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { FLAGSHIPS } from '@/lib/data/catalog';
import { CATEGORY_COVERS } from '@/lib/data/imagery';
import { formatINR } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Configurator',
  description: 'Choose a category to begin designing your bespoke piece.'
};

export default function ConfiguratorIndex() {
  return (
    <section className="relative min-h-[100svh] bg-ivory-100 pt-32 pb-20">
      <div className="absolute inset-0 -z-10 bg-ivory-paper opacity-60" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Configurator · Six categories · Live</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-pewter-800 text-balance">
            Choose your <span className="gold-text italic">starting silhouette.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pewter-500 text-pretty">
            Every category opens into a live atelier where you pick silhouette, fabric, foam,
            wood, dimensions and finish — with realtime pricing at every step.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 6).map((c, i) => {
            const flagship = FLAGSHIPS[c.id];
            const cover = CATEGORY_COVERS[c.id];
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
            return (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link
                  href={href}
                  className="group relative block overflow-hidden border border-pewter-300/60 bg-ivory-50 shadow-soft transition-shadow duration-500 hover:shadow-editorial"
                >
                  <div className="relative aspect-[4/5] overflow-hidden zoom-frame">
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
                    <div className="absolute inset-x-0 bottom-0 p-7 text-ivory-50">
                      <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                        {c.subtitle}
                      </p>
                      <h3 className="mt-2 font-display text-3xl">{c.label}</h3>
                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ivory-100/85">
                        {c.description}
                      </p>
                    </div>
                    <div className="absolute right-4 top-4 border border-white/30 bg-white/10 px-2 py-1 text-[9px] uppercase tracking-luxe text-ivory-50 backdrop-blur-sm">
                      Live
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-pewter-300/60 px-5 py-4">
                    {flagship ? (
                      <span className="font-mono text-[11px] text-walnut-500 tabular-nums">
                        from {formatINR(flagship.basePrice)}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-pewter-600 group-hover:text-walnut-500">
                      Open configurator <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
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
