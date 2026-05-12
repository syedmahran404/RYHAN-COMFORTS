'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';

const PILLARS = [
  {
    k: '01',
    title: 'Design, with you',
    body:
      'We begin with your room — its light, its rhythm, its ceiling. Every Ryhan piece is drawn to fit the space it will live in.'
  },
  {
    k: '02',
    title: 'Materials, honestly',
    body:
      'Walnut, rosewood, linen, velvet, full-grain leather — sourced, not substituted. Every batch is signed by the craftsman.'
  },
  {
    k: '03',
    title: 'Made after order',
    body:
      'We keep no ready stock. Your piece is built after you order it — which is why it fits, and why it lasts.'
  }
];

export function StoryStrip() {
  return (
    <section className="relative py-28">
      <div className="luxe-container">
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">The atelier philosophy</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-cream-50 text-balance">
                A quiet rebellion against <span className="gold-text italic">mass production.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-cream-200/70 text-pretty">
              Twenty-five years, one principle: furniture should be as considered as the home
              it enters. We don't ship warehouses. We ship heirlooms.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px bg-obsidian-600/60 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1}>
              <Parallax offset={20} className="h-full">
                <div className="group relative h-full bg-obsidian-900/80 p-10 transition-colors duration-700 hover:bg-obsidian-800/80">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl text-gold-400/50 transition-colors duration-700 group-hover:text-gold-300">
                      {p.k}
                    </span>
                    <div className="h-px w-16 translate-y-6 bg-gold-500/40" />
                  </div>
                  <h3 className="mt-10 font-display text-3xl text-cream-50">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream-200/70 text-pretty">
                    {p.body}
                  </p>
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
