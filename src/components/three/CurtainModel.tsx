'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildPBRMaterial } from './MaterialSystem';
import { getMaterial } from '@/lib/data/materials';

interface CurtainModelProps {
  fabricId: string;
  baseWoodId?: string;
  /** curtain-sheer | curtain-drape | curtain-velvet | curtain-blackout | curtain-motorized */
  variantId?: string | null;
  /** trans-sheer | trans-translucent | trans-opaque | trans-blackout */
  transparencyId?: string;
  /** fold-pinch | fold-goblet | fold-wave | fold-eyelet */
  foldId?: string;
  /** rod-bronze | rod-gold | rod-black | rod-motorized */
  rodId?: string;
  autoRotate?: boolean;
}

const TRANSPARENCY_OPACITY: Record<string, number> = {
  'trans-sheer': 0.35,
  'trans-translucent': 0.65,
  'trans-opaque': 0.9,
  'trans-blackout': 1.0
};

export function CurtainModel({
  fabricId,
  baseWoodId = 'brushed-bronze',
  variantId,
  transparencyId = 'trans-opaque',
  foldId = 'fold-pinch',
  rodId = 'rod-bronze',
  autoRotate = false
}: CurtainModelProps) {
  const group = useRef<THREE.Group>(null);

  const fabricMat = useMemo(() => {
    const mat = getMaterial(fabricId);
    if (!mat) return undefined;
    const m = buildPBRMaterial(mat);
    const opacity = TRANSPARENCY_OPACITY[transparencyId] ?? 0.85;
    if (opacity < 0.95) {
      m.transparent = true;
      m.opacity = opacity;
    } else {
      m.transparent = false;
      m.opacity = 1;
    }
    return m;
  }, [fabricId, transparencyId]);

  const rodMat = useMemo(() => {
    const id =
      rodId === 'rod-gold'
        ? 'antique-gold'
        : rodId === 'rod-black'
          ? 'matte-black'
          : rodId === 'rod-motorized'
            ? 'matte-black'
            : 'brushed-bronze';
    const mat = getMaterial(id);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [rodId]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.1;
  });

  if (!fabricMat || !rodMat) return null;

  const foldCount =
    foldId === 'fold-wave' ? 14 : foldId === 'fold-goblet' ? 9 : foldId === 'fold-eyelet' ? 7 : 11;
  const panelWidth = 3.4;
  const panelHeight = 3.6;

  return (
    <group ref={group} position={[0, -1.3, 0]}>
      {/* Rod */}
      <mesh
        position={[0, panelHeight + 0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        material={rodMat}
      >
        <cylinderGeometry args={[0.04, 0.04, panelWidth + 0.6, 18]} />
      </mesh>
      {/* Finials */}
      {[-panelWidth / 2 - 0.25, panelWidth / 2 + 0.25].map((x, i) => (
        <mesh key={i} position={[x, panelHeight + 0.1, 0]} material={rodMat}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      ))}

      {/* Curtain folds */}
      {Array.from({ length: foldCount }).map((_, i) => {
        const x = (i / (foldCount - 1) - 0.5) * panelWidth;
        const depthOffset = Math.sin((i / (foldCount - 1)) * Math.PI * 2) * 0.08;
        return (
          <mesh
            key={i}
            position={[x, panelHeight / 2, depthOffset]}
            rotation={[0, Math.sin(i * 0.3) * 0.04, 0]}
            castShadow
            receiveShadow
            material={fabricMat}
          >
            <boxGeometry args={[panelWidth / foldCount + 0.02, panelHeight, 0.04]} />
          </mesh>
        );
      })}
    </group>
  );
}
