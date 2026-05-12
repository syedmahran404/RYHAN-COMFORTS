'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildPBRMaterial } from './MaterialSystem';
import { getMaterial } from '@/lib/data/materials';

interface SofaModelProps {
  upholsteryId: string;
  baseWoodId: string;
  seatCount: number;
  variantId?: string | null;
  /** Slow auto-rotate — used on the hero, disabled in configurator. */
  autoRotate?: boolean;
  /** Pose the sofa slightly — subtle idle breath. */
  idle?: boolean;
}

/**
 * SofaModel — procedural luxury sofa.
 *
 * This is an architectural placeholder that demonstrates:
 *  - Realtime upholstery + wood material switching (PBR)
 *  - Dynamic seating count (modules scale in X)
 *  - Variant (low/high back / chaise) via proportion tweaks
 *  - A clean scene graph ready to be swapped for a GLTF in Phase 2.
 *
 * Swap strategy (Phase 2):
 *   1. Drop a GLTF at /public/models/sofa-atelier.glb
 *   2. Replace this body with <primitive object={gltf.scene} /> + traverse-and-assign
 *      using `buildPBRMaterial` on mesh slots tagged `upholstery_*` / `base_*`.
 */
export function SofaModel({
  upholsteryId,
  baseWoodId,
  seatCount,
  variantId,
  autoRotate = false,
  idle = true
}: SofaModelProps) {
  const group = useRef<THREE.Group>(null);

  const upholsteryMat = useMemo(() => {
    const mat = getMaterial(upholsteryId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [upholsteryId]);

  const woodMat = useMemo(() => {
    const mat = getMaterial(baseWoodId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [baseWoodId]);

  // Variant proportions
  const { backHeight, depth, armHeight } = useMemo(() => {
    switch (variantId) {
      case 'atelier-highback':
        return { backHeight: 1.05, depth: 1.15, armHeight: 0.72 };
      case 'atelier-chaise':
        return { backHeight: 0.72, depth: 1.55, armHeight: 0.55 };
      default:
        return { backHeight: 0.78, depth: 1.15, armHeight: 0.62 };
    }
  }, [variantId]);

  // Seat modules
  const seats = useMemo(
    () => Array.from({ length: Math.max(2, Math.min(6, seatCount)) }, (_, i) => i),
    [seatCount]
  );
  const seatWidth = 0.95;
  const totalWidth = seats.length * seatWidth;
  const halfW = totalWidth / 2;

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.15;
    if (idle) {
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.015 - 0.6; // subtle float + grounded
    }
  });

  if (!upholsteryMat || !woodMat) return null;

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {/* Plinth / base */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.07, 0]}
        material={woodMat}
      >
        <boxGeometry args={[totalWidth + 0.3, 0.14, depth + 0.25]} />
      </mesh>

      {/* Legs */}
      {[-halfW + 0.18, halfW - 0.18].map((x) => (
        <group key={`legs-${x}`}>
          {[-(depth / 2) + 0.18, depth / 2 - 0.18].map((z) => (
            <mesh
              key={`leg-${x}-${z}`}
              position={[x, -0.03, z]}
              castShadow
              material={woodMat}
            >
              <cylinderGeometry args={[0.04, 0.045, 0.18, 16]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Seat cushions */}
      {seats.map((i) => {
        const x = -halfW + i * seatWidth + seatWidth / 2;
        return (
          <mesh
            key={`seat-${i}`}
            castShadow
            receiveShadow
            position={[x, 0.38, 0.02]}
            material={upholsteryMat}
          >
            <boxGeometry args={[seatWidth - 0.05, 0.34, depth - 0.1]} />
          </mesh>
        );
      })}

      {/* Back cushions */}
      {seats.map((i) => {
        const x = -halfW + i * seatWidth + seatWidth / 2;
        return (
          <mesh
            key={`back-${i}`}
            castShadow
            receiveShadow
            position={[x, 0.56 + backHeight / 2, -depth / 2 + 0.28]}
            material={upholsteryMat}
          >
            <boxGeometry args={[seatWidth - 0.08, backHeight, 0.3]} />
          </mesh>
        );
      })}

      {/* Arms */}
      {[-halfW - 0.02, halfW + 0.02].map((x, i) => (
        <mesh
          key={`arm-${i}`}
          castShadow
          receiveShadow
          position={[x, 0.36 + armHeight / 2, 0.02]}
          material={upholsteryMat}
        >
          <boxGeometry args={[0.28, armHeight, depth - 0.05]} />
        </mesh>
      ))}

      {/* Back-top capping rail (subtle luxury detail) */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.56 + backHeight + 0.03, -depth / 2 + 0.28]}
        material={woodMat}
      >
        <boxGeometry args={[totalWidth, 0.04, 0.32]} />
      </mesh>

      {/* Chaise extension */}
      {variantId === 'atelier-chaise' && (
        <mesh
          castShadow
          receiveShadow
          position={[halfW + 0.55, 0.38, 0.02]}
          material={upholsteryMat}
        >
          <boxGeometry args={[1.1, 0.34, depth - 0.1]} />
        </mesh>
      )}
    </group>
  );
}
