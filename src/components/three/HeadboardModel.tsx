'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildPBRMaterial } from './MaterialSystem';
import { getMaterial } from '@/lib/data/materials';

interface HeadboardModelProps {
  upholsteryId: string;
  baseWoodId: string;
  /** hb-carved | hb-fluted | hb-tufted | hb-upholstered | hb-wall-mounted */
  variantId?: string | null;
  /** pattern-* */
  patternId?: string;
  dimensions?: { w?: number; d?: number; h?: number };
  autoRotate?: boolean;
  idle?: boolean;
}

export function HeadboardModel({
  upholsteryId,
  baseWoodId,
  variantId,
  patternId,
  dimensions,
  autoRotate = false,
  idle = true
}: HeadboardModelProps) {
  const group = useRef<THREE.Group>(null);

  const upholsteryMat = useMemo(() => {
    const mat = getMaterial(upholsteryId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [upholsteryId]);
  const woodMat = useMemo(() => {
    const mat = getMaterial(baseWoodId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [baseWoodId]);

  const w = Math.max(1.4, Math.min(3.2, (dimensions?.w ?? 180) / 80));
  const h = Math.max(0.9, Math.min(2.2, (dimensions?.h ?? 130) / 80));

  const isCarved = variantId === 'hb-carved';
  const isFluted = variantId === 'hb-fluted';

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.15;
    if (idle) group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.015 - 0.3;
  });

  if (!upholsteryMat || !woodMat) return null;

  return (
    <group ref={group}>
      {/* Frame */}
      <mesh material={isCarved ? woodMat : upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[w, h, 0.12]} />
      </mesh>

      {/* Inner panel bevel */}
      {!isCarved && (
        <mesh position={[0, 0, 0.07]} material={upholsteryMat}>
          <boxGeometry args={[w * 0.95, h * 0.92, 0.02]} />
        </mesh>
      )}

      {/* Flutes */}
      {isFluted &&
        Array.from({ length: 12 }).map((_, i) => {
          const dx = (i / 11 - 0.5) * w * 0.95;
          return (
            <mesh key={i} position={[dx, 0, 0.08]} material={woodMat}>
              <boxGeometry args={[0.025, h * 0.92, 0.03]} />
            </mesh>
          );
        })}

      {/* Tufting */}
      {patternId?.includes('tufted') &&
        Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            const dx = (c / 5 - 0.5) * w * 0.82;
            const dy = (r / 2 - 0.5) * h * 0.7;
            return (
              <mesh key={`${r}-${c}`} position={[dx, dy, 0.08]} material={woodMat}>
                <sphereGeometry args={[0.018, 8, 8]} />
              </mesh>
            );
          })
        )}

      {/* Carved crown */}
      {isCarved && (
        <mesh position={[0, h / 2 + 0.12, 0.05]} material={woodMat} castShadow>
          <boxGeometry args={[w * 0.7, 0.22, 0.12]} />
        </mesh>
      )}

      {/* Wall-mount brackets */}
      {variantId === 'hb-wall-mounted' &&
        [-w / 2 + 0.15, w / 2 - 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0, -0.08]} material={woodMat}>
            <boxGeometry args={[0.08, 0.08, 0.06]} />
          </mesh>
        ))}
    </group>
  );
}
