'use client';

import { Environment } from '@react-three/drei';
import type { RenderQuality } from '@/lib/state/configurator';

interface LightingProps {
  /** Quality tier — reduces lights & env on low end. */
  quality?: RenderQuality;
  /** HDR preset. */
  preset?: 'studio' | 'apartment' | 'warehouse' | 'sunset' | 'night';
}

/**
 * Cinematic Lighting rig — three-point studio setup plus HDR environment.
 *
 * Phase 2: quality-gated. 'performance' drops env intensity + skips rim light.
 */
export function Lighting({ quality = 'balanced', preset = 'studio' }: LightingProps) {
  const isPerf = quality === 'performance';
  const isHigh = quality === 'high';

  return (
    <>
      {/* Warm key light — mimics walnut showroom spotlights. */}
      <directionalLight
        position={[5, 6, 4]}
        intensity={isHigh ? 2.3 : 2.1}
        color={'#f4dcb3'}
        castShadow={!isPerf}
        shadow-mapSize={[isHigh ? 2048 : 1024, isHigh ? 2048 : 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Cool fill — separates silhouettes. */}
      <directionalLight position={[-6, 4, -2]} intensity={0.55} color={'#6e8ea8'} />

      {/* Rim / hair light — gold edge. */}
      {!isPerf && (
        <directionalLight position={[0, 5, -6]} intensity={0.8} color={'#c9a24a'} />
      )}

      {/* Gentle fill */}
      <ambientLight intensity={0.12} color={'#fbf7ee'} />

      {/* HDR environment — warm and premium. */}
      <Environment preset={preset} background={false} />
    </>
  );
}
