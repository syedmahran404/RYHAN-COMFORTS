'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { RotateCcw, Sparkles, Image as ImageIcon, Box } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useConfiguratorStore } from '@/lib/state/configurator';
import { resolveProductImage, ROOM_STAGING } from '@/lib/data/imagery';
import { getMaterial } from '@/lib/data/materials';
import { cn } from '@/lib/utils/cn';
import { EASE } from '@/lib/utils/constants';

const ConfiguratorStage = dynamic(
  () => import('./ConfiguratorStage').then((m) => m.ConfiguratorStage),
  { ssr: false, loading: () => <div className="h-full w-full" /> }
);

/**
 * ProductHero — image-primary configurator stage.
 *
 * Primary display: editorial product photography with live fabric-tint
 * overlay so colour swaps feel real. Secondary: a compact 3D preview
 * toggle. Tertiary: a lifestyle shot showing the piece in a room.
 *
 * This is a radical shift from the old 3D-only viewer: it makes the
 * configurator feel like a catalogue, not a prototype.
 */
export function ProductHero() {
  const product = useConfiguratorStore((s) => s.product);
  const selection = useConfiguratorStore((s) => s.selection);
  const [mode, setMode] = useState<'image' | '3d' | 'room'>('image');

  const fabricId = useMemo(
    () => (selection['upholstery'] as string) ?? product?.defaultMaterials['upholstery'],
    [selection, product]
  );
  const fabric = fabricId ? getMaterial(fabricId) : null;

  if (!product) return null;

  const productImg = resolveProductImage(product.slug, product.category);
  const roomImg = ROOM_STAGING[product.slug.length % ROOM_STAGING.length];

  return (
    <div className="relative h-full w-full bg-ivory-50">
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === 'image' && (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE.silk }}
              className="absolute inset-0"
            >
              <Image
                src={productImg.url}
                alt={`${product.name} — ${productImg.alt}`}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              {/* Fabric tint overlay — live colour response */}
              {fabric && (
                <motion.div
                  key={fabric.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: fabricTintStrength(fabric.kind) }}
                  transition={{ duration: 0.8, ease: EASE.silk }}
                  style={{ backgroundColor: fabric.color }}
                  className={cn(
                    'absolute inset-0 pointer-events-none',
                    mixBlendFor(fabric.kind)
                  )}
                />
              )}
              {/* Light vignette to lift texture */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory-100/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-pewter-800/10 via-transparent to-ivory-100/20" />

              {/* Spec badge, bottom left */}
              <div className="absolute bottom-5 left-5 glass-dark px-4 py-3">
                <p className="text-[10px] uppercase tracking-luxe text-walnut-500">
                  {product.style?.replace(/-/g, ' ') ?? product.category} · Atelier edition
                </p>
                <p className="mt-1 font-display text-xl text-pewter-800">{product.name}</p>
                {fabric && (
                  <p className="mt-1 text-[10px] uppercase tracking-luxe text-pewter-500">
                    {fabric.name}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {mode === '3d' && (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE.silk }}
              className="absolute inset-0 bg-gradient-to-br from-ivory-50 via-ivory-100 to-porcelain-300"
            >
              <ConfiguratorStage className="h-full w-full" />
              <div className="pointer-events-none absolute inset-0 bg-cinema-vignette opacity-50" />
              <div className="pointer-events-none absolute bottom-4 left-4 glass-dark px-3 py-2 text-[10px] uppercase tracking-luxe text-walnut-500">
                Live 3D · PBR · HDR
              </div>
            </motion.div>
          )}

          {mode === 'room' && (
            <motion.div
              key="room"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE.silk }}
              className="absolute inset-0"
            >
              <Image
                src={roomImg.url}
                alt={roomImg.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory-100/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 glass-dark px-4 py-3">
                <p className="text-[10px] uppercase tracking-luxe text-walnut-500">
                  Room staging · Lifestyle preview
                </p>
                <p className="mt-1 font-display text-xl text-pewter-800">{roomImg.alt}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode toggle (top-right) */}
      <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-1 glass-dark p-1">
        <ModeButton
          Icon={ImageIcon}
          label="Product"
          active={mode === 'image'}
          onClick={() => setMode('image')}
        />
        <ModeButton
          Icon={Box}
          label="3D"
          active={mode === '3d'}
          onClick={() => setMode('3d')}
        />
        <ModeButton
          Icon={Sparkles}
          label="Room"
          active={mode === 'room'}
          onClick={() => setMode('room')}
        />
      </div>

      {/* Recenter hint */}
      {mode === '3d' && (
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1 glass-dark px-3 py-2 text-[9px] uppercase tracking-luxe text-pewter-600">
          <RotateCcw className="h-3 w-3" />
          Drag to rotate · Scroll to zoom
        </div>
      )}
    </div>
  );
}

function ModeButton({
  Icon,
  label,
  active,
  onClick
}: {
  Icon: typeof ImageIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex items-center gap-2 px-2.5 py-1.5 text-[9px] uppercase tracking-luxe transition-colors',
        active
          ? 'bg-pewter-800 text-ivory-50'
          : 'text-pewter-600 hover:text-walnut-500'
      )}
    >
      <Icon className="h-3 w-3" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

/** How strongly the fabric tint overlays the base image. */
function fabricTintStrength(kind: string): number {
  switch (kind) {
    case 'velvet':
      return 0.55;
    case 'leather':
      return 0.45;
    case 'rexine':
      return 0.5;
    case 'suede':
      return 0.5;
    case 'boucle':
      return 0.4;
    case 'linen':
      return 0.4;
    case 'cotton':
      return 0.42;
    default:
      return 0.42;
  }
}

/** Blend mode per fabric kind — keeps texture visible. */
function mixBlendFor(kind: string): string {
  switch (kind) {
    case 'velvet':
    case 'leather':
      return 'mix-blend-multiply';
    case 'suede':
    case 'rexine':
      return 'mix-blend-multiply';
    case 'boucle':
    case 'linen':
    case 'cotton':
      return 'mix-blend-soft-light';
    default:
      return 'mix-blend-multiply';
  }
}
