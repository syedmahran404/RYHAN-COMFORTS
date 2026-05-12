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
  /** Section-independent upholstery for the back. If null → use upholsteryId. */
  backUpholsteryId?: string | null;
  pillowUpholsteryId?: string | null;
  pillowCount?: number;
  armStyleId?: string;
  backStyleId?: string;
  legStyleId?: string;
  seatPatternId?: string;
  /** Dimensions in cm (from catalog.dimensions). Mapped to model units. */
  dimensions?: { w?: number; d?: number; h?: number };
  /** Slow auto-rotate — used on the hero, disabled in configurator. */
  autoRotate?: boolean;
  /** Pose the sofa slightly — subtle idle breath. */
  idle?: boolean;
}

const CM_TO_UNITS = 1 / 80; // 80 cm → 1 unit (keeps visual scale consistent)

/**
 * SofaModel — advanced procedural sofa.
 *
 * Phase 2 supports:
 *   · Dimensions (w/d/h) mapped from cm to scene units
 *   · Independent upholstery for seat vs back vs pillows
 *   · Arm styles (track, rolled, flared, pleated, sled, english, none)
 *   · Back styles (pillow, tight, fluted, button, chesterfield)
 *   · Leg styles (tapered, block, metal-sled, turned, hidden, carved)
 *   · Seat patterns (plain, tufted, channel, diamond) — driven by seam meshes
 *   · Variants (low/high/chaise + style-aware curve / sectional adjustments)
 *
 * The scene graph is intentionally replaceable by a GLTF in Phase 3 —
 * meshes are tagged via userData.slot for traverse-and-rewire.
 */
export function SofaModel({
  upholsteryId,
  baseWoodId,
  seatCount,
  variantId,
  backUpholsteryId,
  pillowUpholsteryId,
  pillowCount = 2,
  armStyleId = 'arm-track',
  backStyleId = 'back-pillow',
  legStyleId = 'leg-tapered',
  seatPatternId = 'seat-plain',
  dimensions,
  autoRotate = false,
  idle = true
}: SofaModelProps) {
  const group = useRef<THREE.Group>(null);

  const upholsteryMat = useMemo(() => {
    const mat = getMaterial(upholsteryId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [upholsteryId]);

  const backMat = useMemo(() => {
    const id = backUpholsteryId ?? upholsteryId;
    const mat = getMaterial(id);
    return mat ? buildPBRMaterial(mat) : upholsteryMat;
  }, [backUpholsteryId, upholsteryId, upholsteryMat]);

  const pillowMat = useMemo(() => {
    const id = pillowUpholsteryId ?? upholsteryId;
    const mat = getMaterial(id);
    return mat ? buildPBRMaterial(mat) : upholsteryMat;
  }, [pillowUpholsteryId, upholsteryId, upholsteryMat]);

  const woodMat = useMemo(() => {
    const mat = getMaterial(baseWoodId);
    return mat ? buildPBRMaterial(mat) : undefined;
  }, [baseWoodId]);

  // Variant proportions — each sub-model ID tweaks the silhouette
  const proportion = useMemo(() => variantProportions(variantId), [variantId]);

  // Dimensional scale factors (non-uniform; X = seat count × width, Y = height, Z = depth)
  const scale = useMemo(() => {
    if (!dimensions) return { x: 1, y: 1, z: 1 };
    const targetW = (dimensions.w ?? 240) * CM_TO_UNITS;
    const targetD = (dimensions.d ?? 98) * CM_TO_UNITS;
    const targetH = (dimensions.h ?? 84) * CM_TO_UNITS;
    return {
      // X is driven by seat count; only scale overall mild envelope
      x: Math.max(0.9, Math.min(1.25, targetW / (3 * 0.95))),
      z: Math.max(0.9, Math.min(1.4, targetD / 1.15)),
      y: Math.max(0.9, Math.min(1.25, targetH / 0.95))
    };
  }, [dimensions]);

  // Seat modules
  const seats = useMemo(
    () => Array.from({ length: Math.max(2, Math.min(6, seatCount)) }, (_, i) => i),
    [seatCount]
  );
  const seatWidth = 0.95 * scale.x;
  const depth = proportion.depth * scale.z;
  const backHeight = proportion.backHeight * scale.y;
  const armHeight = proportion.armHeight * scale.y;
  const totalWidth = seats.length * seatWidth;
  const halfW = totalWidth / 2;

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.15;
    if (idle) {
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.015 - 0.6;
    }
  });

  if (!upholsteryMat || !woodMat || !backMat || !pillowMat) return null;

  // ─────── Curved-style wrap: rotate modules around an arc ────────
  const isCurved = proportion.curveRadius > 0;

  return (
    <group ref={group} position={[0, -0.6, 0]} userData={{ type: 'sofa-root' }}>
      {/* Plinth / base — hidden for 'hidden' leg style */}
      {legStyleId !== 'leg-hidden' && (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0.07, 0]}
          material={woodMat}
          userData={{ slot: 'base' }}
        >
          <boxGeometry args={[totalWidth + 0.3, 0.14, depth + 0.25]} />
        </mesh>
      )}

      {/* Legs — rendered per style */}
      <LegCluster
        style={legStyleId}
        width={totalWidth}
        depth={depth}
        woodMat={woodMat}
      />

      {/* Seat cushions */}
      {seats.map((i) => {
        const x = -halfW + i * seatWidth + seatWidth / 2;
        const zRot = isCurved ? curveRotationFor(i, seats.length, proportion.curveRadius) : 0;
        return (
          <group key={`seat-${i}`} rotation={[0, zRot, 0]} position={[x, 0.38, 0.02]}>
            <mesh castShadow receiveShadow material={upholsteryMat} userData={{ slot: 'seat' }}>
              <boxGeometry args={[seatWidth - 0.05, 0.34, depth - 0.1]} />
            </mesh>
            {/* Seat pattern — seam accents on top face */}
            <SeamAccents
              pattern={seatPatternId}
              width={seatWidth - 0.1}
              depth={depth - 0.15}
              y={0.18}
            />
          </group>
        );
      })}

      {/* Back */}
      {seats.map((i) => {
        const x = -halfW + i * seatWidth + seatWidth / 2;
        return (
          <BackModule
            key={`back-${i}`}
            x={x}
            depth={depth}
            width={seatWidth - 0.08}
            backHeight={backHeight}
            style={backStyleId}
            material={backMat}
            woodMat={woodMat}
          />
        );
      })}

      {/* Arms */}
      <ArmModule side="left" x={-halfW - 0.02} depth={depth} armHeight={armHeight} style={armStyleId} material={upholsteryMat} woodMat={woodMat} />
      <ArmModule side="right" x={halfW + 0.02} depth={depth} armHeight={armHeight} style={armStyleId} material={upholsteryMat} woodMat={woodMat} />

      {/* Back-top capping rail */}
      {backStyleId !== 'back-pillow' && backStyleId !== 'back-chesterfield' && (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0.56 + backHeight + 0.03, -depth / 2 + 0.28]}
          material={woodMat}
          userData={{ slot: 'rail' }}
        >
          <boxGeometry args={[totalWidth, 0.04, 0.32]} />
        </mesh>
      )}

      {/* Chaise extension */}
      {variantId === 'atelier-chaise' && (
        <mesh
          castShadow
          receiveShadow
          position={[halfW + 0.55, 0.38, 0.02]}
          material={upholsteryMat}
          userData={{ slot: 'chaise' }}
        >
          <boxGeometry args={[1.1, 0.34, depth - 0.1]} />
        </mesh>
      )}

      {/* Pillows */}
      <Pillows
        count={pillowCount}
        totalWidth={totalWidth}
        depth={depth}
        material={pillowMat}
      />

      {/* Carved crown for royal-carved / maharaja / imperial */}
      {(variantId === 'royal-maharaja' || variantId === 'royal-imperial' || variantId === 'royal-throne') && (
        <mesh
          castShadow
          position={[0, 0.56 + backHeight + 0.22, -depth / 2 + 0.22]}
          material={woodMat}
          userData={{ slot: 'crown' }}
        >
          <boxGeometry args={[totalWidth * 0.9, 0.38, 0.16]} />
        </mesh>
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────

function variantProportions(variantId?: string | null) {
  switch (variantId) {
    case 'atelier-highback':
    case 'flat-floor':
    case 'nord-3s':
      return { backHeight: 1.05, depth: 1.15, armHeight: 0.72, curveRadius: 0 };
    case 'atelier-chaise':
    case 'nord-daybed':
      return { backHeight: 0.72, depth: 1.55, armHeight: 0.55, curveRadius: 0 };
    case 'chester-classic':
    case 'chester-wing':
    case 'chester-deep':
      return { backHeight: 0.95, depth: 1.1, armHeight: 0.88, curveRadius: 0 };
    case 'milano-curved':
    case 'milano-low':
    case 'milano-executive':
      return { backHeight: 0.74, depth: 1.25, armHeight: 0.5, curveRadius: 0 };
    case 'royal-throne':
    case 'royal-maharaja':
    case 'royal-imperial':
      return { backHeight: 1.15, depth: 1.05, armHeight: 0.88, curveRadius: 0 };
    case 'majlis-low':
    case 'majlis-diwan':
    case 'majlis-carved':
      return { backHeight: 0.68, depth: 1.35, armHeight: 0.5, curveRadius: 0 };
    case 'curve-kidney':
      return { backHeight: 0.78, depth: 1.2, armHeight: 0.55, curveRadius: 0.08 };
    case 'curve-crescent':
      return { backHeight: 0.82, depth: 1.2, armHeight: 0.55, curveRadius: 0.18 };
    case 'curve-semi':
      return { backHeight: 0.85, depth: 1.2, armHeight: 0.55, curveRadius: 0.28 };
    case 'flat-platform':
    case 'flat-island':
      return { backHeight: 0.5, depth: 1.25, armHeight: 0.42, curveRadius: 0 };
    case 'sect-u':
    case 'sect-l':
    case 'sect-island':
    case 'l-left':
    case 'l-right':
    case 'l-deep':
      return { backHeight: 0.82, depth: 1.2, armHeight: 0.62, curveRadius: 0 };
    case 'mod-3':
    case 'mod-5':
    case 'mod-7':
      return { backHeight: 0.78, depth: 1.15, armHeight: 0.55, curveRadius: 0 };
    default:
      return { backHeight: 0.78, depth: 1.15, armHeight: 0.62, curveRadius: 0 };
  }
}

function curveRotationFor(i: number, total: number, radius: number) {
  const center = (total - 1) / 2;
  return (i - center) * radius;
}

// ─────────────────────────────────────────────────────────────────────
// MODULES
// ─────────────────────────────────────────────────────────────────────

function LegCluster({
  style,
  width,
  depth,
  woodMat
}: {
  style: string;
  width: number;
  depth: number;
  woodMat: THREE.Material;
}) {
  if (style === 'leg-hidden') return null;

  const positions: Array<[number, number]> = [
    [-width / 2 + 0.18, -depth / 2 + 0.18],
    [width / 2 - 0.18, -depth / 2 + 0.18],
    [-width / 2 + 0.18, depth / 2 - 0.18],
    [width / 2 - 0.18, depth / 2 - 0.18]
  ];

  if (style === 'leg-metal-sled') {
    return (
      <>
        {[-depth / 2 + 0.18, depth / 2 - 0.18].map((z, i) => (
          <mesh
            key={`sled-${i}`}
            position={[0, -0.05, z]}
            castShadow
            material={woodMat}
            userData={{ slot: 'legs' }}
          >
            <boxGeometry args={[width, 0.03, 0.05]} />
          </mesh>
        ))}
      </>
    );
  }

  return (
    <>
      {positions.map(([x, z], i) => {
        switch (style) {
          case 'leg-block':
            return (
              <mesh key={i} position={[x, -0.03, z]} castShadow material={woodMat} userData={{ slot: 'legs' }}>
                <boxGeometry args={[0.11, 0.2, 0.11]} />
              </mesh>
            );
          case 'leg-turned':
            return (
              <mesh key={i} position={[x, -0.03, z]} castShadow material={woodMat} userData={{ slot: 'legs' }}>
                <cylinderGeometry args={[0.055, 0.04, 0.22, 16]} />
              </mesh>
            );
          case 'leg-carved':
            return (
              <group key={i} position={[x, -0.03, z]}>
                <mesh castShadow material={woodMat} userData={{ slot: 'legs' }}>
                  <cylinderGeometry args={[0.06, 0.09, 0.22, 16]} />
                </mesh>
                <mesh position={[0, 0.12, 0]} castShadow material={woodMat}>
                  <boxGeometry args={[0.13, 0.05, 0.13]} />
                </mesh>
              </group>
            );
          default:
            return (
              <mesh key={i} position={[x, -0.03, z]} castShadow material={woodMat} userData={{ slot: 'legs' }}>
                <cylinderGeometry args={[0.04, 0.055, 0.22, 16]} />
              </mesh>
            );
        }
      })}
    </>
  );
}

function ArmModule({
  side,
  x,
  depth,
  armHeight,
  style,
  material,
  woodMat
}: {
  side: 'left' | 'right';
  x: number;
  depth: number;
  armHeight: number;
  style: string;
  material: THREE.Material;
  woodMat: THREE.Material;
}) {
  if (style === 'arm-none') return null;

  const yBase = 0.36 + armHeight / 2;

  if (style === 'arm-sled') {
    return (
      <group>
        <mesh position={[x, yBase, 0.02]} castShadow receiveShadow material={material} userData={{ slot: 'arm' }}>
          <boxGeometry args={[0.22, armHeight, depth - 0.05]} />
        </mesh>
        {/* sled under-rail */}
        <mesh position={[x, 0, 0.02]} castShadow material={woodMat}>
          <boxGeometry args={[0.03, 0.05, depth - 0.05]} />
        </mesh>
      </group>
    );
  }

  if (style === 'arm-rolled' || style === 'arm-english') {
    const radius = style === 'arm-english' ? 0.22 : 0.18;
    return (
      <group position={[x, yBase, 0.02]}>
        <mesh castShadow receiveShadow material={material} userData={{ slot: 'arm' }}>
          <boxGeometry args={[0.28, armHeight, depth - 0.05]} />
        </mesh>
        {/* rolled top */}
        <mesh
          castShadow
          material={material}
          position={[0, armHeight / 2, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[radius, radius, depth - 0.05, 18]} />
        </mesh>
      </group>
    );
  }

  if (style === 'arm-flared') {
    return (
      <mesh
        position={[x, yBase, 0.02]}
        rotation={[0, 0, side === 'left' ? 0.18 : -0.18]}
        castShadow
        receiveShadow
        material={material}
        userData={{ slot: 'arm' }}
      >
        <boxGeometry args={[0.28, armHeight, depth - 0.05]} />
      </mesh>
    );
  }

  if (style === 'arm-pleated') {
    return (
      <group position={[x, yBase, 0.02]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[0, 0, -depth / 2 + 0.08 + i * ((depth - 0.2) / 4)]}
            castShadow
            material={material}
            userData={{ slot: 'arm' }}
          >
            <boxGeometry args={[0.3, armHeight * 0.98, 0.04]} />
          </mesh>
        ))}
      </group>
    );
  }

  // track (default)
  return (
    <mesh
      position={[x, yBase, 0.02]}
      castShadow
      receiveShadow
      material={material}
      userData={{ slot: 'arm' }}
    >
      <boxGeometry args={[0.28, armHeight, depth - 0.05]} />
    </mesh>
  );
}

function BackModule({
  x,
  depth,
  width,
  backHeight,
  style,
  material,
  woodMat
}: {
  x: number;
  depth: number;
  width: number;
  backHeight: number;
  style: string;
  material: THREE.Material;
  woodMat: THREE.Material;
}) {
  const y = 0.56 + backHeight / 2;
  const z = -depth / 2 + 0.28;

  const base = (
    <mesh position={[x, y, z]} castShadow receiveShadow material={material} userData={{ slot: 'back' }}>
      <boxGeometry args={[width, backHeight, 0.3]} />
    </mesh>
  );

  if (style === 'back-fluted') {
    return (
      <group>
        {base}
        {[-0.3, -0.15, 0, 0.15, 0.3].map((dx, i) => (
          <mesh key={i} position={[x + dx * (width / 0.6) * 0.3, y, z + 0.16]} material={material}>
            <boxGeometry args={[0.02, backHeight * 0.9, 0.02]} />
          </mesh>
        ))}
      </group>
    );
  }

  if (style === 'back-button' || style === 'back-chesterfield') {
    const cols = style === 'back-chesterfield' ? 4 : 3;
    const rows = style === 'back-chesterfield' ? 3 : 2;
    const buttons: JSX.Element[] = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const bx = (c / (cols - 1 || 1) - 0.5) * (width * 0.7);
        const by = (r / (rows - 1 || 1) - 0.5) * (backHeight * 0.7);
        buttons.push(
          <mesh key={`${c}-${r}`} position={[x + bx, y + by, z + 0.16]} material={woodMat}>
            <sphereGeometry args={[0.015, 8, 8]} />
          </mesh>
        );
      }
    }
    return (
      <group>
        {base}
        {buttons}
      </group>
    );
  }

  return base;
}

function SeamAccents({
  pattern,
  width,
  depth,
  y
}: {
  pattern: string;
  width: number;
  depth: number;
  y: number;
}) {
  if (pattern === 'seat-plain') return null;

  // Subtle dark seam lines — rendered as thin planes
  const mat = (
    <meshBasicMaterial color="#0a0907" transparent opacity={0.28} />
  );

  if (pattern === 'seat-channel') {
    const lines = Array.from({ length: 4 }, (_, i) => i);
    return (
      <group>
        {lines.map((i) => {
          const dz = (i / (lines.length - 1) - 0.5) * depth * 0.9;
          return (
            <mesh key={i} position={[0, y, dz]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[width * 0.95, 0.008]} />
              {mat}
            </mesh>
          );
        })}
      </group>
    );
  }

  if (pattern === 'seat-diamond' || pattern === 'seat-tufted') {
    const pts = pattern === 'seat-diamond' ? [3, 3] : [2, 2];
    const out: JSX.Element[] = [];
    for (let c = 0; c < pts[0]; c++) {
      for (let r = 0; r < pts[1]; r++) {
        const dx = (c / (pts[0] - 1 || 1) - 0.5) * width * 0.75;
        const dz = (r / (pts[1] - 1 || 1) - 0.5) * depth * 0.75;
        out.push(
          <mesh key={`${c}-${r}`} position={[dx, y, dz]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            {mat}
          </mesh>
        );
      }
    }
    return <group>{out}</group>;
  }

  return null;
}

function Pillows({
  count,
  totalWidth,
  depth,
  material
}: {
  count: number;
  totalWidth: number;
  depth: number;
  material: THREE.Material;
}) {
  const n = Math.max(0, Math.min(8, count));
  const spots: Array<[number, number, number]> = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n - 0.5;
    spots.push([t * totalWidth * 0.85, 0.6, -depth / 2 + 0.5]);
  }
  return (
    <>
      {spots.map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          rotation={[0.15, (i % 2 === 0 ? 0.12 : -0.12), 0]}
          castShadow
          material={material}
          userData={{ slot: 'pillow' }}
        >
          <boxGeometry args={[0.32, 0.12, 0.32]} />
        </mesh>
      ))}
    </>
  );
}
