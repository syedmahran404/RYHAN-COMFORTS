'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/lib/utils/constants';
import { BRAND } from '@/lib/data/brand';
import { HERO_IMAGES } from '@/lib/data/imagery';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Badge } from '@/components/ui/Badge';

/**
 * Hero — editorial cinematic landing.
 *
 * Design direction: image-led (Restoration Hardware / Roche Bobois / Bentley Home),
 * NOT 3D-dominant. Real luxury interior photography provides emotional anchor.
 * Typography is oversized, serif, airy.
 *
 * Parallax: hero image scales + drifts subtly as the user scrolls; the
 * typography rises; a small inset shows a secondary lifestyle frame.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.0, 0.35]);

  const mainImage = HERO_IMAGES[0];
  const insetImage = HERO_IMAGES[1];

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-20">
      {/* Cinematic backdrop image */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Soft ivory wash that keeps text readable over any image */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 bg-ivory-100/40"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ivory-100/85 via-ivory-100/55 to-ivory-100/95" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ivory-100/90 via-transparent to-transparent" />

      <div className="luxe-container grid min-h-[calc(100svh-5rem)] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Left: editorial typography */}
        <motion.div style={{ y: textY }} className="relative z-10 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge>
              <Sparkles className="h-3 w-3" />
              Bespoke · Made-to-order since {BRAND.founded}
            </Badge>
          </motion.div>

          <h1 className="mt-10 font-display text-hero font-light leading-[0.92] text-pewter-800 text-balance">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="block"
            >
              A quiet
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="block cinema-text italic"
            >
              luxury,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="block"
            >
              crafted for you.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-8 max-w-md text-base leading-relaxed text-pewter-500 text-pretty"
          >
            Sofas, carved beds, mattresses, curtains and heirloom pieces — hand-made in our
            Bengaluru atelier to your exact dimensions, fabric and soul. Nothing ready.
            Everything crafted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link href={ROUTES.configuratorSofa}>
                <Button size="lg" variant="primary">
                  Begin your atelier
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <Link href={ROUTES.collections}>
              <Button size="lg" variant="outline">
                Explore collections
              </Button>
            </Link>
          </motion.div>

          {/* Stat ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-14 grid max-w-lg grid-cols-3 border-y border-pewter-300/70 py-6"
          >
            {[
              { k: '25+', v: 'Years crafting' },
              { k: '3 400', v: 'Homes served' },
              { k: '100%', v: 'Made to order' }
            ].map((s) => (
              <div key={s.v} className="px-2 text-left first:pl-0 last:pr-0">
                <p className="font-display text-3xl text-walnut-500 tabular-nums">{s.k}</p>
                <p className="mt-1 text-[10px] uppercase tracking-luxe text-pewter-400">{s.v}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: image composition with overlay frames */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative hidden h-[78vh] lg:block"
        >
          {/* Primary image frame */}
          <div className="relative h-full w-full overflow-hidden shadow-editorial">
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* Bottom floating spec label */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="glass-dark px-4 py-3">
                <p className="text-[10px] uppercase tracking-luxe text-walnut-500">
                  Atelier Signature · 2026
                </p>
                <p className="mt-1 font-display text-xl text-pewter-800">Low-back · 3 seater</p>
              </div>
              <div className="glass-dark px-3 py-2 text-[10px] uppercase tracking-luxe text-pewter-600">
                Studio · Bengaluru
              </div>
            </div>
          </div>

          {/* Inset frame — creates editorial depth */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="absolute -left-10 bottom-12 hidden h-[38%] w-[42%] overflow-hidden shadow-editorial xl:block"
          >
            <Image
              src={insetImage.url}
              alt={insetImage.alt}
              fill
              sizes="(min-width: 1280px) 22vw, 0"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 img-overlay-bottom">
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-luxe text-ivory-100">Lifestyle</p>
                <p className="font-display text-base text-ivory-50">Atelier in light</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: secondary image below stack */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative aspect-[4/3] w-full overflow-hidden lg:hidden"
      >
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 text-pewter-500 lg:flex">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-px bg-gradient-to-b from-transparent via-champagne-300 to-transparent"
        />
        <span className="text-[9px] uppercase tracking-luxe">Scroll · The story</span>
      </div>
    </section>
  );
}
