'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, type PropsWithChildren } from 'react';
import { Lighting } from './Lighting';

interface StageProps {
  /** Enable user orbit — off by default on the hero, on in the configurator. */
  interactive?: boolean;
  /** Camera position. */
  camera?: [number, number, number];
  /** Shadow floor intensity. */
  shadowOpacity?: number;
  className?: string;
}

/**
 * Stage — a reusable R3F Canvas preconfigured for luxury product viz.
 *
 * Used by: HeroStage, SofaConfiguratorStage, (future) every product viewer.
 */
export function Stage({
  children,
  interactive = false,
  camera = [3.4, 1.8, 4.8],
  shadowOpacity = 0.55,
  className
}: PropsWithChildren<StageProps>) {
  return (
    <div className={className}>
      <Canvas
        className="r3f-canvas"
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false
        }}
      >
        <color attach="background" args={['#060605']} />
        <fog attach="fog" args={['#060605', 9, 22]} />

        <PerspectiveCamera makeDefault fov={38} position={camera} near={0.1} far={100} />

        <Suspense fallback={null}>
          <Lighting />
          {children}
          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={shadowOpacity}
            scale={14}
            blur={2.6}
            far={4}
            resolution={1024}
            color="#000000"
          />
        </Suspense>

        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={3.6}
            maxDistance={8.5}
            minPolarAngle={Math.PI / 3.6}
            maxPolarAngle={Math.PI / 2.05}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.55}
          />
        )}
      </Canvas>
    </div>
  );
}
