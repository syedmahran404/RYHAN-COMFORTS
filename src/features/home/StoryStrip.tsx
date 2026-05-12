'use client';

import Image from 'next/image';
import { ROOM_STAGING } from '@/lib/data/imagery';
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
  const bgImage = ROOM_STAGING[0];
  return (
    <section className="relative bg-ivory-100 py-28">
      <div className="luxe-container">
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">The atelier philosophy</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
                A quiet rebellion against{' '}
                <span className="gold-text italic">mass production.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-pewter-500 text-pretty">
              Twenty-five years, one principle: furniture should be as considered as the home it
              enters. We don't ship warehouses. We ship heirlooms.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: three-pillar manifesto */}
          <div className="grid gap-px bg-pewter-300/60">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08}>
                <Parallax offset={12} className="h-full">
                  <div className="group relative h-full bg-ivory-50 p-10 transition-colors duration-700 hover:bg-ivory-100">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-5xl text-champagne-300/70 transition-colors duration-700 group-hover:text-walnut-400">
                        {p.k}
                      </span>
                      <div className="h-px w-16 translate-y-6 bg-champagne-300/60" />
                    </div>
                    <h3 className="mt-10 font-display text-3xl text-pewter-800">{p.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-pewter-500 text-pretty">
                      {p.body}
                    </p>
                  </div>
                </Parallax>
              </Reveal>
            ))}
          </div>

          {/* Right: editorial image */}
          <Reveal delay={0.2}>
            <div className="relative h-full min-h-[420px] overflow-hidden zoom-frame shadow-editorial">
              <Image
                src={bgImage.url}
                alt={bgImage.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 img-overlay-bottom">
                <div className="p-6 text-ivory-50">
                  <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                    Room in light
                  </p>
                  <p className="mt-2 font-display text-2xl">The Osaka apartment</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
