'use client';

import { Environment } from '@react-three/drei';

/**
 * Cinematic Lighting rig — a three-point studio setup plus HDR environment.
 *
 * Preset: 'studio' gives crisp walnut/bronze tones under warm rim-light.
 */
export function Lighting() {
  return (
    <>
      {/* Warm key light — mimics walnut showroom spotlights. */}
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.1}
        color={'#f4dcb3'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Cool fill — separates silhouettes. */}
      <directionalLight position={[-6, 4, -2]} intensity={0.55} color={'#6e8ea8'} />

      {/* Rim / hair light — gold edge. */}
      <directionalLight position={[0, 5, -6]} intensity={0.8} color={'#c9a24a'} />

      {/* Gentle fill */}
      <ambientLight intensity={0.12} color={'#fbf7ee'} />

      {/* HDR environment — 'studio' is warm and premium. */}
      <Environment preset="studio" background={false} />
    </>
  );
}
