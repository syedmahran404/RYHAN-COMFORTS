'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { ROOM_STAGING } from '@/lib/data/imagery';

/**
 * RoomStaging — "in their homes" lifestyle section.
 *
 * A generous editorial layout showing Ryhan pieces in real interiors.
 * Uses parallax — the image drifts slowly while text rises.
 */
export function RoomStaging() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const left = ROOM_STAGING[3];
  const right = ROOM_STAGING[4];

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory-100 py-28">
      <div className="luxe-container">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow">In their homes</p>
          <Reveal>
            <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
              Imagine it already{' '}
              <span className="gold-text italic">yours.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm leading-relaxed text-pewter-500 text-pretty">
              Lived-in rooms with Ryhan Comforts pieces at the centre. Every commission starts
              with a consultation — drawn to your room, your light, your architecture.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <motion.div
              style={{ y: imgY }}
              className="relative aspect-[5/4] w-full overflow-hidden shadow-editorial zoom-frame"
            >
              <Image
                src={left.url}
                alt={left.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 img-overlay-bottom" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-ivory-50">
                <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                  Bedroom · Indiranagar
                </p>
                <p className="mt-2 font-display text-3xl">The Oracle Fluted headboard</p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid h-full grid-rows-2 gap-6">
              <div className="relative overflow-hidden shadow-editorial zoom-frame">
                <Image
                  src={right.url}
                  alt={right.alt}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 img-overlay-bottom" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory-50">
                  <p className="text-[10px] uppercase tracking-luxe text-champagne-200">
                    Reading room · Koramangala
                  </p>
                  <p className="mt-1 font-display text-xl">Lune Lounge · bouclé cream</p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-pewter-800 p-8 text-ivory-50">
                <p className="eyebrow-dark">A private consultation</p>
                <p className="mt-6 font-display text-3xl leading-[1.05] text-ivory-50 text-balance">
                  Tell us about your room.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ivory-100/75 text-pretty">
                  We begin every commission with an in-home visit or a video walk-through —
                  measuring light, scale, and the way you actually live.
                </p>
                <a
                  href="tel:+917204556776"
                  className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-champagne-200 transition-colors hover:text-champagne-100"
                >
                  Book your consultation →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
