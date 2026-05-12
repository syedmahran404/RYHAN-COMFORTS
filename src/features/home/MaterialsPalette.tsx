'use client';

import { VELVETS, LEATHERS, WOODS, BOUCLES, LINENS } from '@/lib/data/materials';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils/cn';

/**
 * MaterialsPalette — a visual chorus of the atelier's materials.
 *
 * Shows the real catalogue entries (from lib/data/materials) so the
 * homepage is an honest preview of the configurator's palette.
 */

const GROUPS = [
  { label: 'Velvets', items: VELVETS.slice(0, 6) },
  { label: 'Leathers', items: LEATHERS.slice(0, 5) },
  { label: 'Linens & bouclés', items: [...LINENS.slice(0, 3), ...BOUCLES.slice(0, 3)] },
  { label: 'Woods', items: WOODS.slice(0, 6) }
];

export function MaterialsPalette() {
  return (
    <section className="relative border-t border-obsidian-600/60 py-28">
      <div className="luxe-container">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">The atelier palette</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-cream-50 text-balance">
                Materials, <span className="gold-text italic">touched first.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-sm leading-relaxed text-cream-200/70 text-pretty">
              Velvet, bouclé, linen, suede, rexine, full-grain leather, walnut, teak, rosewood.
              Every Ryhan piece is a composition — chosen by you, woven by us.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08}>
              <div>
                <p className="text-[10px] uppercase tracking-luxe text-gold-200">{g.label}</p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {g.items.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        'group relative aspect-square overflow-hidden border border-obsidian-600/50 transition-transform duration-500 hover:-translate-y-1 hover:border-gold-500/40'
                      )}
                      style={{ backgroundColor: m.color }}
                      title={m.name}
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/40" />
                      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-obsidian-950/80 p-1.5 text-[8px] uppercase tracking-luxe text-cream-100 transition-transform duration-500 group-hover:translate-y-0">
                        {m.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
