'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildPBRMaterial } from './MaterialSystem';
import { getMaterial } from '@/lib/data/materials';

interface MattressModelProps {
  coreId?: string;
  /** mat-spring | mat-memory | mat-orthopedic | mat-hybrid | mat-hotel */
  variantId?: string | null;
  /** size-single | size-queen | size-king | size-california */
  sizeId?: string;
  /** thickness-6 | thickness-8 | thickness-10 | thickness-12 */
  thicknessId?: string;
  autoRotate?: boolean;
  idle?: boolean;
}

const SIZE_SCALES: Record<string, { w: number; d: number }> = {
  'size-single': { w: 1.0, d: 2.1 },
  'size-queen': { w: 1.6, d: 2.15 },
  'size-king': { w: 1.9, d: 2.15 },
  'size-california': { w: 1.9, d: 2.35 }
};

const THICKNESS: Record<string, number> = {
  'thickness-6': 0.18,
  'thickness-8': 0.24,
  'thickness-10': 0.3,
  'thickness-12': 0.36
};

export function MattressModel({
  coreId = 'core-pocket-spring',
  variantId,
  sizeId = 'size-queen',
  thicknessId = 'thickness-8',
  autoRotate = false,
  idle = true
}: MattressModelProps) {
  const group = useRef<THREE.Group>(null);

  const coreMat = useMemo(() => {
    const mat = getMaterial(coreId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [coreId]);

  const topMat = useMemo(() => {
    const mat = getMaterial('linen-ivory');
    return mat ? buildPBRMaterial(mat) : undefined;
  }, []);

  const size = SIZE_SCALES[sizeId] ?? SIZE_SCALES['size-queen'];
  const t = THICKNESS[thicknessId] ?? 0.24;

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.15;
    if (idle) group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.015 - 0.2;
  });

  if (!coreMat || !topMat) return null;

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Core */}
      <mesh position={[0, t / 2, 0]} castShadow receiveShadow material={coreMat}>
        <boxGeometry args={[size.w, t * 0.82, size.d]} />
      </mesh>
      {/* Top cover */}
      <mesh position={[0, t - 0.03, 0]} receiveShadow material={topMat}>
        <boxGeometry args={[size.w * 1.001, 0.05, size.d * 1.001]} />
      </mesh>

      {/* Pillow-top bumps */}
      {variantId === 'mat-hotel' &&
        Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            const dx = (c / 6 - 0.5) * size.w * 0.9;
            const dz = (r / 4 - 0.5) * size.d * 0.9;
            return (
              <mesh key={`${r}-${c}`} position={[dx, t + 0.005, dz]} material={topMat}>
                <sphereGeometry args={[0.03, 10, 10]} />
              </mesh>
            );
          })
        )}

      {/* Side quilting — long horizontal rail */}
      <mesh position={[0, t / 2, size.d / 2 + 0.001]} material={topMat}>
        <planeGeometry args={[size.w, t * 0.95]} />
      </mesh>
    </group>
  );
}
