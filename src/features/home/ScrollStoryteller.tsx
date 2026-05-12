'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';

/**
 * ScrollStoryteller — a scroll-pinned story panel.
 *
 * Three phases of the atelier story fade in/out as the user scrolls through
 * the section. Uses Framer's `useScroll` with a pinned-height container.
 */

const CHAPTERS = [
  {
    k: '2000',
    title: 'The first bench',
    body:
      'Azam Pasha cuts the first Ryhan bench — a teak piece for a Jayanagar living room. The atelier is born.'
  },
  {
    k: '2008',
    title: 'Into export',
    body:
      'Our first commission crosses a border — a Chesterfield for a buyer in Dubai. Moisture-proofed frames become a standard.'
  },
  {
    k: '2014',
    title: 'The carver joins',
    body:
      'Master carver Aslam joins the atelier. The Royal Carved collection begins with the first Maharaja Throne.'
  },
  {
    k: '2020',
    title: 'Under 10 weeks',
    body:
      'We reduce turnaround from 14 weeks to 10 without compromising a single cut or stitch.'
  },
  {
    k: '2026',
    title: 'Live atelier',
    body:
      'We open our live 3D configurator — the same schema-driven system our craftsmen build against.'
  }
];

export function ScrollStoryteller() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden"
      style={{ height: `${CHAPTERS.length * 90}svh` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-60" />
        <div className="noise-overlay" />
        <BackgroundScroll progress={scrollYProgress} />

        <div className="luxe-container relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="max-w-md">
            <p className="eyebrow">The atelier timeline</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-cream-50 text-balance">
                Five chapters, <span className="gold-text italic">one hand.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm leading-relaxed text-cream-200/70 text-pretty">
                Every Ryhan piece is the continuation of a longer story. Scroll to read the
                seasons that shaped the atelier.
              </p>
            </Reveal>
          </div>

          <div className="relative h-[68svh]">
            {CHAPTERS.map((c, i) => (
              <Chapter
                key={c.k}
                index={i}
                total={CHAPTERS.length}
                progress={scrollYProgress}
                chapter={c}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  index,
  total,
  progress,
  chapter
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  chapter: (typeof CHAPTERS)[number];
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = (index + 1) * seg;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), start + seg * 0.25, end - seg * 0.15, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], [24, -24]);

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p className="font-display text-[8rem] leading-none text-gold-500/25 tabular-nums">
        {chapter.k}
      </p>
      <h3 className="-mt-4 font-display text-4xl text-cream-50">{chapter.title}</h3>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-cream-200/70 text-pretty">
        {chapter.body}
      </p>
    </motion.article>
  );
}

function BackgroundScroll({
  progress
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(progress, [0, 1], ['0%', '-40%']);
  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute inset-0 -z-20 opacity-60"
    >
      <div className="absolute left-1/4 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-walnut-700/20 via-transparent to-gold-500/10" />
    </motion.div>
  );
}
