'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/lib/utils/constants';
import { BRAND } from '@/lib/data/brand';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Badge } from '@/components/ui/Badge';

const HeroStage = dynamic(
  () => import('@/components/three/HeroStage').then((m) => m.HeroStage),
  { ssr: false, loading: () => <div className="h-full w-full" /> }
);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut-grain" />
        <div className="noise-overlay" />
        <div className="vignette" />
      </div>

      <div className="luxe-container grid min-h-[calc(100svh-6rem)] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left: typography + CTAs */}
        <div className="relative z-10 flex flex-col">
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

          <h1 className="mt-8 font-display text-hero font-light leading-[0.92] text-cream-50 text-balance">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="block"
            >
              Crafted for
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="block cinema-text italic"
            >
              the way you live.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="mt-8 max-w-md text-base leading-relaxed text-cream-200/70 text-pretty"
          >
            Sofas, carved beds, mattresses, curtains and heirloom pieces — hand-made in our
            Bengaluru atelier to your exact dimensions, fabric and soul. Nothing ready.
            Everything crafted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link href={ROUTES.configuratorSofa}>
                <Button size="lg">
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
            transition={{ duration: 1.2, delay: 0.9 }}
            className="mt-14 grid max-w-lg grid-cols-3 border-y border-obsidian-600/80 py-6"
          >
            {[
              { k: '25+', v: 'Years crafting' },
              { k: '3 400', v: 'Homes served' },
              { k: '100%', v: 'Made to order' }
            ].map((s) => (
              <div key={s.v} className="px-2 text-left first:pl-0 last:pr-0">
                <p className="font-display text-3xl text-gold-200 tabular-nums">{s.k}</p>
                <p className="mt-1 text-[10px] uppercase tracking-luxe text-cream-200/60">
                  {s.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative h-[56vh] min-h-[420px] lg:h-[78vh]"
        >
          <HeroStage className="h-full w-full" />

          {/* Floating label */}
          <div className="glass-dark pointer-events-none absolute bottom-6 left-6 px-4 py-3">
            <p className="text-[10px] uppercase tracking-luxe text-gold-300">
              Atelier Signature · Live 3D
            </p>
            <p className="mt-1 font-display text-xl text-cream-50">Low-back · 3 seater</p>
          </div>

          <div className="pointer-events-none absolute right-6 top-6">
            <div className="glass px-3 py-2 text-[10px] uppercase tracking-luxe text-cream-100/80">
              PBR · HDR studio
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-cream-100/50">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-px bg-gradient-to-b from-transparent via-gold-300/60 to-transparent"
        />
        <span className="text-[9px] uppercase tracking-luxe">Scroll · The story</span>
      </div>
    </section>
  );
}
