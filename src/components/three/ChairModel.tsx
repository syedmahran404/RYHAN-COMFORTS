'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildPBRMaterial } from './MaterialSystem';
import { getMaterial } from '@/lib/data/materials';

interface ChairModelProps {
  upholsteryId: string;
  baseWoodId: string;
  armStyleId?: string;
  backStyleId?: string;
  legStyleId?: string;
  variantId?: string | null;
  dimensions?: { w?: number; d?: number; h?: number };
  autoRotate?: boolean;
  idle?: boolean;
}

/**
 * ChairModel — procedural luxury chair.
 * Variant-aware (wingback, throne, egg, swivel, recliner).
 */
export function ChairModel({
  upholsteryId,
  baseWoodId,
  armStyleId = 'arm-rolled',
  backStyleId = 'back-pillow',
  legStyleId = 'leg-tapered',
  variantId,
  dimensions,
  autoRotate = false,
  idle = true
}: ChairModelProps) {
  const group = useRef<THREE.Group>(null);

  const upholsteryMat = useMemo(() => {
    const mat = getMaterial(upholsteryId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [upholsteryId]);
  const woodMat = useMemo(() => {
    const mat = getMaterial(baseWoodId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [baseWoodId]);

  const scale = useMemo(() => {
    if (!dimensions) return { x: 1, y: 1, z: 1 };
    return {
      x: Math.max(0.9, Math.min(1.25, (dimensions.w ?? 82) / 82)),
      y: Math.max(0.9, Math.min(1.25, (dimensions.h ?? 92) / 92)),
      z: Math.max(0.9, Math.min(1.25, (dimensions.d ?? 84) / 84))
    };
  }, [dimensions]);

  const isWing =
    variantId === 'chair-wing' ||
    variantId === 'chair-throne' ||
    variantId === 'chair-maharani' ||
    variantId === 'chair-nord-high';
  const isEgg = variantId === 'chair-egg' || variantId === 'chair-kidney';

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.18;
    if (idle) group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.015 - 0.45;
  });

  if (!upholsteryMat || !woodMat) return null;

  const w = 0.85 * scale.x;
  const d = 0.82 * scale.z;
  const h = 1.2 * scale.y;

  return (
    <group ref={group} position={[0, -0.45, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow material={upholsteryMat}>
        <boxGeometry args={[w, 0.32, d]} />
      </mesh>

      {/* Back */}
      {isEgg ? (
        <mesh
          position={[0, 0.38 + 0.5, -d / 2 + 0.15]}
          castShadow
          receiveShadow
          material={upholsteryMat}
        >
          <sphereGeometry args={[0.55, 24, 24, 0, Math.PI]} />
        </mesh>
      ) : (
        <mesh
          position={[0, 0.38 + (isWing ? 0.55 : 0.4), -d / 2 + 0.18]}
          castShadow
          receiveShadow
          material={upholsteryMat}
        >
          <boxGeometry args={[w * 0.96, isWing ? 1.1 : 0.78, 0.22]} />
        </mesh>
      )}

      {/* Wings for wingback */}
      {isWing && !isEgg && (
        <>
          {[-w / 2 + 0.06, w / 2 - 0.06].map((x, i) => (
            <mesh
              key={i}
              position={[x, 0.38 + 0.7, -d / 2 + 0.35]}
              rotation={[0, i === 0 ? 0.3 : -0.3, 0]}
              castShadow
              material={upholsteryMat}
            >
              <boxGeometry args={[0.12, 0.9, 0.5]} />
            </mesh>
          ))}
        </>
      )}

      {/* Arms */}
      {armStyleId !== 'arm-none' && (
        <>
          {[-w / 2 - 0.02, w / 2 + 0.02].map((x, i) => (
            <mesh
              key={i}
              position={[x, 0.5, 0]}
              castShadow
              material={upholsteryMat}
            >
              <boxGeometry args={[0.15, 0.22, d * 0.8]} />
            </mesh>
          ))}
        </>
      )}

      {/* Legs */}
      {legStyleId !== 'leg-hidden' &&
        [
          [-w / 2 + 0.08, -d / 2 + 0.08],
          [w / 2 - 0.08, -d / 2 + 0.08],
          [-w / 2 + 0.08, d / 2 - 0.08],
          [w / 2 - 0.08, d / 2 - 0.08]
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.12, z]} castShadow material={woodMat}>
            <cylinderGeometry args={[0.04, 0.05, 0.24, 16]} />
          </mesh>
        ))}

      {/* Carved crown for throne chairs */}
      {(variantId === 'chair-throne' || variantId === 'chair-maharani') && (
        <mesh
          position={[0, 0.38 + h + 0.1, -d / 2 + 0.25]}
          castShadow
          material={woodMat}
        >
          <boxGeometry args={[w * 0.8, 0.28, 0.14]} />
        </mesh>
      )}
    </group>
  );
}
