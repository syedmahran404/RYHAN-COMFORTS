'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { ROOM_STAGING } from '@/lib/data/imagery';

const CHAPTERS = [
  {
    k: '2000',
    title: 'The first bench',
    body:
      'Azam Pasha cuts the first Ryhan bench — a teak piece for a Jayanagar living room. The atelier is born.',
    img: ROOM_STAGING[5]
  },
  {
    k: '2008',
    title: 'Into export',
    body:
      'Our first commission crosses a border — a Chesterfield for a buyer in Dubai. Moisture-proofed frames become a standard.',
    img: ROOM_STAGING[2]
  },
  {
    k: '2014',
    title: 'The carver joins',
    body:
      'Master carver Aslam joins the atelier. The Royal Carved collection begins with the first Maharaja Throne.',
    img: ROOM_STAGING[3]
  },
  {
    k: '2020',
    title: 'Under 10 weeks',
    body:
      'We reduce turnaround from 14 weeks to 10 without compromising a single cut or stitch.',
    img: ROOM_STAGING[0]
  },
  {
    k: '2026',
    title: 'Live atelier',
    body:
      'We open our live configurator — the same schema-driven system our craftsmen build against.',
    img: ROOM_STAGING[1]
  }
];

export function ScrollStoryteller() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ivory-50"
      style={{ height: `${CHAPTERS.length * 90}svh` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-ivory-paper opacity-60" />
        <div className="noise-overlay" />

        <div className="luxe-container relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: intro + chapter text */}
          <div className="max-w-md">
            <p className="eyebrow">The atelier timeline</p>
            <Reveal>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] text-pewter-800 text-balance">
                Five chapters, <span className="gold-text italic">one hand.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm leading-relaxed text-pewter-500 text-pretty">
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
      className="absolute inset-0 flex flex-col justify-center gap-6"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden shadow-editorial">
        <Image
          src={chapter.img.url}
          alt={chapter.img.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
        <div className="absolute left-4 top-4 glass-dark px-3 py-1.5 font-display text-xs text-walnut-500 tabular-nums">
          {chapter.k}
        </div>
      </div>
      <div>
        <h3 className="font-display text-3xl text-pewter-800">{chapter.title}</h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-pewter-500 text-pretty">
          {chapter.body}
        </p>
      </div>
    </motion.article>
  );
}
