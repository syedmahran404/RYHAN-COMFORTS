'use client';

import * as THREE from 'three';
import type { Material } from '@/lib/schemas/product';

/**
 * Material System — a thin, cache-aware factory that maps the catalog's
 * PBR hints onto three.js MeshPhysicalMaterial instances.
 *
 * Why: realtime switching in the configurator must be O(1) on the
 * render loop and must never leak GPU memory. We keep a keyed cache
 * and reuse materials across frames/mounts.
 */

const cache = new Map<string, THREE.MeshPhysicalMaterial>();

export function buildPBRMaterial(mat: Material): THREE.MeshPhysicalMaterial {
  const key = mat.id;
  const existing = cache.get(key);
  if (existing) return existing;

  const m = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(mat.color),
    roughness: mat.pbr.roughness,
    metalness: mat.pbr.metalness,
    clearcoat: mat.pbr.clearcoat ?? 0,
    clearcoatRoughness: 0.25,
    sheen: mat.pbr.sheen ?? 0,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color(mat.color).lerp(new THREE.Color('#ffffff'), 0.4)
  });
  m.envMapIntensity = 0.9;

  cache.set(key, m);
  return m;
}

/** Dispose cached materials. Called when R3F root unmounts. */
export function disposeMaterialCache() {
  cache.forEach((m) => m.dispose());
  cache.clear();
}
