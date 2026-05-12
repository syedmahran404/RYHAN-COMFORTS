'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { ROUTES } from '@/lib/utils/constants';
import { Reveal } from '@/components/motion/Reveal';

/**
 * SignatureCollections — schema-driven category grid.
 * Each tile pulls from CATEGORIES (Phase 2 admin-editable).
 */
export function SignatureCollections() {
  return (
    <section className="relative border-y border-obsidian-600/60 py-28">
      <div className="luxe-container">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="eyebrow">The signature collections</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-cream-50 text-balance">
                Every room, <span className="gold-text italic">redrawn.</span>
              </h2>
            </Reveal>
          </div>
          <Link
            href={ROUTES.collections}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 transition-colors hover:text-gold-100 lg:flex"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 6).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <CollectionTile
                title={c.label}
                subtitle={c.subtitle}
                description={c.description}
                href={`${ROUTES.collections}/${c.slug}`}
                tone={c.heroTone}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const toneBg: Record<string, string> = {
  walnut: 'from-walnut-700/60 via-obsidian-800 to-obsidian-900',
  obsidian: 'from-obsidian-700 via-obsidian-800 to-obsidian-950',
  cream: 'from-cream-500/20 via-obsidian-800 to-obsidian-900',
  bronze: 'from-bronze-700/50 via-obsidian-800 to-obsidian-900'
};

function CollectionTile({
  title,
  subtitle,
  description,
  href,
  tone,
  index
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tone: 'walnut' | 'obsidian' | 'cream' | 'bronze';
  index: number;
}) {
  return (
    <motion.div
      whileHover="hover"
      className="group relative overflow-hidden border border-obsidian-600/70"
    >
      <Link href={href} className="block">
        <div
          className={`relative aspect-[4/5] w-full bg-gradient-to-br ${toneBg[tone]} overflow-hidden`}
        >
          <motion.div
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ProceduralArt tone={tone} seed={index} />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-900/10 to-transparent" />
          <div className="noise-overlay" />

          <div className="absolute inset-x-0 bottom-0 p-7">
            <p className="text-[10px] uppercase tracking-luxe text-gold-300">{subtitle}</p>
            <h3 className="mt-2 font-display text-3xl text-cream-50">{title}</h3>
            <p className="mt-3 line-clamp-2 max-w-[28ch] text-xs leading-relaxed text-cream-200/70">
              {description}
            </p>

            <motion.div
              variants={{ hover: { x: 6 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200"
            >
              Explore
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.div>
          </div>

          <div className="absolute left-6 top-6 font-display text-lg text-gold-300/70">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Pure-CSS procedural art — abstract rendering of the collection's silhouette. */
function ProceduralArt({ tone, seed }: { tone: string; seed: number }) {
  const hue: Record<string, string> = {
    walnut: '#8f6a3c',
    obsidian: '#524f47',
    cream: '#c9b58a',
    bronze: '#b57d34'
  };
  const c = hue[tone] ?? '#8f6a3c';
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#060605" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`r${seed}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor={c} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#060605" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#g${seed})`} />
      <circle cx={200 + seed * 8} cy={260 - seed * 6} r={170} fill={`url(#r${seed})`} />
      {/* Silhouette lines */}
      <g stroke="#c9a24a" strokeOpacity="0.25" fill="none" strokeWidth="1">
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M${20 + i * 30} 500 Q${200 + Math.sin(i + seed) * 80} ${
              320 - i * 14
            } ${400 - i * 10} 500`}
          />
        ))}
      </g>
    </svg>
  );
}
