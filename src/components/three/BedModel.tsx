'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildPBRMaterial } from './MaterialSystem';
import { getMaterial } from '@/lib/data/materials';

interface BedModelProps {
  /** Headboard upholstery. */
  upholsteryId: string;
  /** Frame wood. */
  baseWoodId: string;
  /** hb-tufted | hb-fluted | hb-diamond | hb-carved | hb-plain */
  headboardPattern?: string;
  /** bed-carved | bed-hydraulic | bed-storage | bed-floating | bed-upholstered */
  variantId?: string | null;
  /** size-single | size-queen | size-king | size-california */
  sizeId?: string;
  /** light-underglow | light-reading | light-ambient | light-none */
  lightingId?: string;
  autoRotate?: boolean;
  idle?: boolean;
}

const SIZE_SCALES: Record<string, { w: number; d: number }> = {
  'size-single': { w: 1.0, d: 2.1 },
  'size-queen': { w: 1.6, d: 2.15 },
  'size-king': { w: 1.9, d: 2.15 },
  'size-california': { w: 1.9, d: 2.35 }
};

export function BedModel({
  upholsteryId,
  baseWoodId,
  headboardPattern = 'hb-tufted',
  variantId,
  sizeId = 'size-queen',
  lightingId = 'light-none',
  autoRotate = false,
  idle = true
}: BedModelProps) {
  const group = useRef<THREE.Group>(null);

  const upholsteryMat = useMemo(() => {
    const mat = getMaterial(upholsteryId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [upholsteryId]);
  const woodMat = useMemo(() => {
    const mat = getMaterial(baseWoodId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [baseWoodId]);

  const size = SIZE_SCALES[sizeId] ?? SIZE_SCALES['size-queen'];
  const w = size.w;
  const d = size.d;
  const isFloating = variantId === 'bed-floating';

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.15;
    if (idle) group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.015 - 0.5;
  });

  if (!upholsteryMat || !woodMat) return null;

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Plinth */}
      <mesh
        position={[0, isFloating ? 0.14 : 0.08, 0]}
        castShadow
        receiveShadow
        material={woodMat}
      >
        <boxGeometry args={[w, isFloating ? 0.12 : 0.26, d]} />
      </mesh>

      {/* Floating light */}
      {(isFloating || lightingId === 'light-underglow') && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[w * 0.95, 0.02, d * 0.95]} />
          <meshBasicMaterial color="#c9a24a" transparent opacity={0.25} />
        </mesh>
      )}

      {/* Mattress surface */}
      <mesh position={[0, 0.34, 0.06]} castShadow receiveShadow material={upholsteryMat}>
        <boxGeometry args={[w * 0.98, 0.16, d * 0.92]} />
      </mesh>

      {/* Pillow row */}
      {[-w * 0.2, w * 0.2].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.44, -d / 2 + 0.35]}
          castShadow
          material={upholsteryMat}
        >
          <boxGeometry args={[w * 0.28, 0.08, 0.32]} />
        </mesh>
      ))}

      {/* Headboard */}
      <Headboard
        pattern={headboardPattern}
        variantId={variantId}
        width={w}
        material={upholsteryMat}
        woodMat={woodMat}
        depth={d}
      />

      {/* Reading lights */}
      {(lightingId === 'light-reading' || lightingId === 'light-ambient') && (
        <>
          {[-w * 0.4, w * 0.4].map((x, i) => (
            <mesh key={i} position={[x, 1.05, -d / 2 + 0.2]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color="#ffd9a0" />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function Headboard({
  pattern,
  variantId,
  width,
  depth,
  material,
  woodMat
}: {
  pattern: string;
  variantId?: string | null;
  width: number;
  depth: number;
  material: THREE.Material;
  woodMat: THREE.Material;
}) {
  const h = variantId === 'bed-carved' || pattern === 'hb-carved' ? 1.3 : 1.05;
  const y = 0.34 + h / 2 + 0.1;
  const z = -depth / 2 - 0.02;

  const isCarved = pattern === 'hb-carved' || variantId === 'bed-carved';
  const isTufted = pattern === 'hb-tufted' || pattern === 'hb-diamond';
  const isFluted = pattern === 'hb-fluted';

  return (
    <group>
      {/* Panel */}
      <mesh
        position={[0, y, z]}
        castShadow
        receiveShadow
        material={isCarved ? woodMat : material}
      >
        <boxGeometry args={[width + 0.06, h, 0.08]} />
      </mesh>

      {/* Tufting */}
      {isTufted && (
        <>
          {Array.from({ length: pattern === 'hb-diamond' ? 3 : 2 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => {
              const dx = (c / 4 - 0.5) * width * 0.88;
              const dy = (r / (pattern === 'hb-diamond' ? 2 : 1) - 0.5) * h * 0.6;
              return (
                <mesh
                  key={`${c}-${r}`}
                  position={[dx, y + dy, z + 0.05]}
                  material={woodMat}
                >
                  <sphereGeometry args={[0.018, 8, 8]} />
                </mesh>
              );
            })
          )}
        </>
      )}

      {/* Flutes */}
      {isFluted && (
        <>
          {Array.from({ length: 9 }).map((_, i) => {
            const dx = (i / 8 - 0.5) * width * 0.92;
            return (
              <mesh key={i} position={[dx, y, z + 0.05]} material={woodMat}>
                <boxGeometry args={[0.02, h * 0.92, 0.02]} />
              </mesh>
            );
          })}
        </>
      )}

      {/* Carved crown */}
      {isCarved && (
        <mesh position={[0, y + h / 2 + 0.1, z + 0.03]} material={woodMat} castShadow>
          <boxGeometry args={[width * 0.7, 0.18, 0.1]} />
        </mesh>
      )}
    </group>
  );
}
