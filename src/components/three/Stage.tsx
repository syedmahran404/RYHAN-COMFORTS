'use client';

import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  Preload
} from '@react-three/drei';
import { Suspense, useMemo, type PropsWithChildren } from 'react';
import { Lighting } from './Lighting';
import { useConfiguratorStore, type RenderQuality } from '@/lib/state/configurator';

interface StageProps {
  /** Enable user orbit — off by default on the hero, on in the configurator. */
  interactive?: boolean;
  /** Camera position. */
  camera?: [number, number, number];
  /** Shadow floor intensity. */
  shadowOpacity?: number;
  /** Override store-level auto-rotate. */
  autoRotate?: boolean;
  /** Override store-level render quality. */
  quality?: RenderQuality;
  className?: string;
}

/**
 * Stage — a reusable R3F Canvas preconfigured for luxury product viz.
 *
 * Phase 2 adds:
 *   · AdaptiveDpr + AdaptiveEvents → GPU-aware perf tuning
 *   · BakeShadows on high/balanced → shadows frozen after first frame
 *   · Preload → warm the asset cache
 *   · Quality gating → shadow res / dpr / msaa all tuned per-tier
 */
export function Stage({
  children,
  interactive = false,
  camera = [3.4, 1.8, 4.8],
  shadowOpacity = 0.55,
  autoRotate,
  quality,
  className
}: PropsWithChildren<StageProps>) {
  const storeQuality = useConfiguratorStore((s) => s.renderQuality);
  const storeAutoRotate = useConfiguratorStore((s) => s.autoRotate);
  const q: RenderQuality = quality ?? storeQuality;
  const rotate = autoRotate ?? storeAutoRotate;

  const tuning = useMemo(() => {
    switch (q) {
      case 'high':
        return { dpr: [1, 2.25] as [number, number], shadowRes: 2048, msaa: true };
      case 'performance':
        return { dpr: [0.8, 1.2] as [number, number], shadowRes: 512, msaa: false };
      default:
        return { dpr: [1, 1.75] as [number, number], shadowRes: 1024, msaa: true };
    }
  }, [q]);

  return (
    <div className={className}>
      <Canvas
        className="r3f-canvas"
        shadows={q !== 'performance'}
        dpr={tuning.dpr}
        gl={{
          antialias: tuning.msaa,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true
        }}
      >
        <color attach="background" args={['#060605']} />
        <fog attach="fog" args={['#060605', 9, 22]} />

        <PerspectiveCamera makeDefault fov={38} position={camera} near={0.1} far={100} />

        <Suspense fallback={null}>
          <Lighting quality={q} />
          {children}
          {q !== 'performance' && (
            <ContactShadows
              position={[0, -0.6, 0]}
              opacity={shadowOpacity}
              scale={14}
              blur={q === 'high' ? 2.6 : 3.2}
              far={4}
              resolution={tuning.shadowRes}
              color="#000000"
            />
          )}
          <Preload all />
          {q === 'high' && <BakeShadows />}
        </Suspense>

        {interactive && (
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom
            minDistance={3.2}
            maxDistance={9}
            minPolarAngle={Math.PI / 3.6}
            maxPolarAngle={Math.PI / 2.05}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.55}
            autoRotate={rotate}
            autoRotateSpeed={0.6}
          />
        )}

        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
