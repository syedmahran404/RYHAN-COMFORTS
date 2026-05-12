'use client';

import * as THREE from 'three';
import type { Material } from '@/lib/schemas/product';

/**
 * Material System — a thin, cache-aware factory that maps the catalog's
 * PBR hints onto three.js MeshPhysicalMaterial instances.
 *
 * Phase 2 adds:
 *   · Per-kind micro-tuning (velvet gets sheen-boost, leather gets clearcoat, ...)
 *   · Procedural repeating normal-map for woven fabrics (via noise canvas)
 *   · Runtime disposal for Hot-Swap safety
 *
 * Why: realtime switching in the configurator must be O(1) on the
 * render loop and must never leak GPU memory. We keep a keyed cache.
 */

const cache = new Map<string, THREE.MeshPhysicalMaterial>();
let fabricNormal: THREE.Texture | null = null;
let leatherNormal: THREE.Texture | null = null;
let woodNormal: THREE.Texture | null = null;

// ─────────────────────────────────────────────────────────────────────
// PROCEDURAL NORMAL MAPS
// ─────────────────────────────────────────────────────────────────────

function makeNoiseTexture(
  size: number,
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  repeat: [number, number] = [6, 4]
): THREE.Texture {
  if (typeof document === 'undefined') {
    // SSR — return a dummy 1×1 texture
    const t = new THREE.DataTexture(new Uint8Array([128, 128, 255, 255]), 1, 1);
    t.needsUpdate = true;
    return t;
  }
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.anisotropy = 8;
  return tex;
}

function ensureFabricNormal(): THREE.Texture {
  if (fabricNormal) return fabricNormal;
  fabricNormal = makeNoiseTexture(
    256,
    (ctx, s) => {
      // Woven fabric — crosshatch with subtle noise
      const img = ctx.createImageData(s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const i = (y * s + x) * 4;
          const wave = Math.sin(x * 0.6) * 0.15 + Math.sin(y * 0.55) * 0.15;
          const noise = (Math.random() - 0.5) * 0.12;
          const n = 128 + (wave + noise) * 60;
          img.data[i] = n;
          img.data[i + 1] = n;
          img.data[i + 2] = 255;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    },
    [8, 6]
  );
  return fabricNormal;
}

function ensureLeatherNormal(): THREE.Texture {
  if (leatherNormal) return leatherNormal;
  leatherNormal = makeNoiseTexture(
    256,
    (ctx, s) => {
      // Leather grain — large irregular cells
      const img = ctx.createImageData(s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const i = (y * s + x) * 4;
          const cell =
            Math.sin(x * 0.04 + Math.sin(y * 0.07) * 2) *
            Math.cos(y * 0.05 + Math.sin(x * 0.06) * 2);
          const noise = (Math.random() - 0.5) * 0.15;
          const n = 128 + (cell * 0.5 + noise) * 50;
          img.data[i] = n;
          img.data[i + 1] = n;
          img.data[i + 2] = 255;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    },
    [3, 2]
  );
  return leatherNormal;
}

function ensureWoodNormal(): THREE.Texture {
  if (woodNormal) return woodNormal;
  woodNormal = makeNoiseTexture(
    256,
    (ctx, s) => {
      // Wood grain — long horizontal fibres
      const img = ctx.createImageData(s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const i = (y * s + x) * 4;
          const grain = Math.sin(y * 0.6 + Math.sin(x * 0.02) * 4) * 0.25;
          const noise = (Math.random() - 0.5) * 0.08;
          const n = 128 + (grain + noise) * 50;
          img.data[i] = n;
          img.data[i + 1] = n;
          img.data[i + 2] = 255;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    },
    [2, 6]
  );
  return woodNormal;
}

// ─────────────────────────────────────────────────────────────────────
// FACTORY
// ─────────────────────────────────────────────────────────────────────

/**
 * Build (or retrieve from cache) a PBR material for a catalog entry.
 */
export function buildPBRMaterial(mat: Material): THREE.MeshPhysicalMaterial {
  const cached = cache.get(mat.id);
  if (cached) return cached;

  const color = new THREE.Color(mat.color);
  const m = new THREE.MeshPhysicalMaterial({
    color,
    roughness: mat.pbr.roughness,
    metalness: mat.pbr.metalness,
    clearcoat: mat.pbr.clearcoat ?? 0,
    clearcoatRoughness: 0.25,
    sheen: mat.pbr.sheen ?? 0,
    sheenRoughness: 0.6,
    sheenColor: color.clone().lerp(new THREE.Color('#ffffff'), 0.4)
  });
  m.envMapIntensity = 0.9;

  // Kind-aware micro-tuning + procedural normals
  switch (mat.kind) {
    case 'velvet':
      m.sheen = Math.max(0.55, mat.pbr.sheen ?? 0.55);
      m.sheenRoughness = 0.35;
      m.normalMap = ensureFabricNormal();
      m.normalScale = new THREE.Vector2(0.18, 0.18);
      break;
    case 'suede':
      m.normalMap = ensureFabricNormal();
      m.normalScale = new THREE.Vector2(0.28, 0.28);
      m.sheen = 0.35;
      break;
    case 'linen':
    case 'cotton':
    case 'fabric':
      m.normalMap = ensureFabricNormal();
      m.normalScale = new THREE.Vector2(0.22, 0.22);
      break;
    case 'boucle':
      m.normalMap = ensureFabricNormal();
      m.normalScale = new THREE.Vector2(0.45, 0.45);
      break;
    case 'leather':
      m.normalMap = ensureLeatherNormal();
      m.normalScale = new THREE.Vector2(0.3, 0.3);
      m.clearcoat = Math.max(0.2, mat.pbr.clearcoat ?? 0.2);
      break;
    case 'rexine':
      m.normalMap = ensureLeatherNormal();
      m.normalScale = new THREE.Vector2(0.18, 0.18);
      m.clearcoat = Math.max(0.25, mat.pbr.clearcoat ?? 0.2);
      break;
    case 'wood':
      m.normalMap = ensureWoodNormal();
      m.normalScale = new THREE.Vector2(0.12, 0.3);
      m.clearcoat = Math.max(0.1, mat.pbr.clearcoat ?? 0.1);
      m.clearcoatRoughness = 0.35;
      break;
    case 'metal':
      // No normal map — keep metal clean
      break;
    default:
      break;
  }

  cache.set(mat.id, m);
  return m;
}

/** Dispose cached materials — called when the R3F root unmounts. */
export function disposeMaterialCache() {
  cache.forEach((m) => m.dispose());
  cache.clear();
  fabricNormal?.dispose();
  leatherNormal?.dispose();
  woodNormal?.dispose();
  fabricNormal = leatherNormal = woodNormal = null;
}
