import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/data/categories';
import { ROUTES } from '@/lib/utils/constants';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'Ryhan Comforts signature collections — sofas, chairs, beds, mattresses, curtains and headboards.'
};

export default function CollectionsIndex() {
  return (
    <section className="relative min-h-[100svh] pt-32 pb-24">
      <div className="noise-overlay" />
      <div className="luxe-container">
        <Badge>The complete index</Badge>
        <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
          Signature <span className="gold-text italic">collections.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-200/70 text-pretty">
          Each collection is an architectural language — a vocabulary of silhouettes, joinery and
          upholstery our atelier applies to your room. Phase 2 opens each collection to deep
          customisation and catalog browsing.
        </p>

        <div className="mt-16 grid gap-px bg-obsidian-600/50 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={c.id === 'sofa' ? ROUTES.configuratorSofa : `${ROUTES.configurator}`}
              className="group relative bg-obsidian-900 p-8 transition-colors duration-500 hover:bg-obsidian-800"
            >
              <p className="text-[10px] uppercase tracking-luxe text-gold-300">{c.subtitle}</p>
              <h3 className="mt-5 font-display text-3xl text-cream-50">{c.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-200/70 text-pretty">
                {c.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 opacity-70 transition-opacity group-hover:opacity-100">
                {c.id === 'sofa' ? 'Configure live' : 'Enquire bespoke'}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
