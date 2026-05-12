'use client';

import Image from 'next/image';
import { VELVETS, LEATHERS, WOODS, BOUCLES, LINENS } from '@/lib/data/materials';
import { SWATCH_TEXTURES } from '@/lib/data/imagery';
import { Reveal } from '@/components/motion/Reveal';

const GROUPS = [
  { label: 'Velvets', texture: SWATCH_TEXTURES.velvet, items: VELVETS.slice(0, 6) },
  { label: 'Leathers', texture: SWATCH_TEXTURES.leather, items: LEATHERS.slice(0, 5) },
  {
    label: 'Linens & bouclés',
    texture: SWATCH_TEXTURES.boucle,
    items: [...LINENS.slice(0, 3), ...BOUCLES.slice(0, 3)]
  },
  { label: 'Woods', texture: SWATCH_TEXTURES.wood, items: WOODS.slice(0, 6) }
];

export function MaterialsPalette() {
  return (
    <section className="relative border-t border-pewter-300/60 bg-ivory-100 py-28">
      <div className="luxe-container">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">The atelier palette</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
                Materials, <span className="gold-text italic">touched first.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-sm leading-relaxed text-pewter-500 text-pretty">
              Velvet, bouclé, linen, suede, rexine, full-grain leather, walnut, teak, rosewood.
              Every Ryhan piece is a composition — chosen by you, woven by us.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.06}>
              <div className="group border border-pewter-300/70 bg-ivory-50 p-5 shadow-soft transition-shadow duration-500 hover:shadow-editorial">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={g.texture}
                    alt={`${g.label} texture`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-luxe text-walnut-500">
                  {g.label}
                </p>
                <div className="mt-3 grid grid-cols-6 gap-1.5">
                  {g.items.map((m) => (
                    <div
                      key={m.id}
                      className="aspect-square border border-pewter-300/40 shadow-bevel"
                      style={{ backgroundColor: m.color }}
                      title={m.name}
                    />
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
