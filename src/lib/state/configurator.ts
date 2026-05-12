'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Product } from '@/lib/schemas/product';
import {
  computeQuote,
  defaultSelection,
  type DimensionsSelection,
  type Quote,
  type Selection
} from '@/lib/pricing/engine';

/**
 * Configurator store — the central nervous system of the live 3D experience.
 *
 * Phase 2 extends Phase 1:
 *   · dimensions    — live resize slider (w/d/h) feeds pricing + 3D
 *   · activeSection — drives the sectioned panel / tab UI
 *   · renderQuality — 'high' / 'balanced' / 'performance'
 *   · getSectionGroups() — derives groups grouped by section
 *
 * Every field used by 3D is a narrow selector so updates are O(1).
 */

export type RenderQuality = 'high' | 'balanced' | 'performance';

interface ConfiguratorState {
  product: Product | null;
  selection: Selection;
  dimensions: DimensionsSelection;
  quote: Quote | null;

  activeGroupId: string | null;
  activeSectionId: string | null;
  displayPrice: number;

  /** 3D viewer quality — user-toggled or device-derived. */
  renderQuality: RenderQuality;
  /** Auto-rotate the viewer. */
  autoRotate: boolean;

  setProduct: (product: Product) => void;
  setOption: (groupId: string, value: string | number) => void;
  setDimension: (axis: 'w' | 'd' | 'h', value: number) => void;
  setActiveGroup: (groupId: string | null) => void;
  setActiveSection: (sectionId: string | null) => void;
  setDisplayPrice: (value: number) => void;
  setRenderQuality: (q: RenderQuality) => void;
  setAutoRotate: (v: boolean) => void;
  reset: () => void;
  dehydrate: () => DehydratedQuote | null;
}

export interface DehydratedQuote {
  productId: string;
  slug: string;
  selection: Selection;
  dimensions: DimensionsSelection;
  total: number;
  capturedAt: string;
}

const initialDimensionsFor = (product: Product): DimensionsSelection =>
  product.dimensions
    ? { w: product.dimensions.w, d: product.dimensions.d, h: product.dimensions.h }
    : {};

export const useConfiguratorStore = create<ConfiguratorState>()(
  subscribeWithSelector((set, get) => ({
    product: null,
    selection: {},
    dimensions: {},
    quote: null,
    activeGroupId: null,
    activeSectionId: null,
    displayPrice: 0,
    renderQuality: 'balanced',
    autoRotate: false,

    setProduct: (product) => {
      const selection = defaultSelection(product);
      const dimensions = initialDimensionsFor(product);
      const quote = computeQuote(product, selection, dimensions);
      set({
        product,
        selection,
        dimensions,
        quote,
        activeGroupId: product.groups[0]?.id ?? null,
        activeSectionId:
          product.sections?.sort((a, b) => a.order - b.order)[0]?.id ??
          product.groups[0]?.section ??
          null,
        displayPrice: quote.total
      });
    },

    setOption: (groupId, value) => {
      const { product, selection, dimensions } = get();
      if (!product) return;
      const next: Selection = { ...selection, [groupId]: value };
      const quote = computeQuote(product, next, dimensions);
      set({ selection: next, quote });
    },

    setDimension: (axis, value) => {
      const { product, selection, dimensions } = get();
      if (!product) return;
      const next: DimensionsSelection = { ...dimensions, [axis]: value };
      const quote = computeQuote(product, selection, next);
      set({ dimensions: next, quote });
    },

    setActiveGroup: (groupId) => set({ activeGroupId: groupId }),
    setActiveSection: (sectionId) => set({ activeSectionId: sectionId }),
    setDisplayPrice: (value) => set({ displayPrice: value }),
    setRenderQuality: (q) => set({ renderQuality: q }),
    setAutoRotate: (v) => set({ autoRotate: v }),

    reset: () => {
      const { product } = get();
      if (!product) return set({ selection: {}, quote: null, displayPrice: 0, dimensions: {} });
      const selection = defaultSelection(product);
      const dimensions = initialDimensionsFor(product);
      const quote = computeQuote(product, selection, dimensions);
      set({ selection, dimensions, quote, displayPrice: quote.total });
    },

    dehydrate: () => {
      const { product, selection, dimensions, quote } = get();
      if (!product || !quote) return null;
      return {
        productId: product.id,
        slug: product.slug,
        selection,
        dimensions,
        total: quote.total,
        capturedAt: new Date().toISOString()
      };
    }
  }))
);

// ─────────────────────────────────────────────────────────────────────
// NARROW SELECTORS — used by the 3D engine for performant updates.
// ─────────────────────────────────────────────────────────────────────

export const selectUpholsteryId = (s: ConfiguratorState) =>
  (s.selection['upholstery'] as string) ?? s.product?.defaultMaterials['upholstery'] ?? null;

export const selectBackUpholsteryId = (s: ConfiguratorState) =>
  (s.selection['back-upholstery'] as string) ??
  (s.selection['upholstery'] as string) ??
  s.product?.defaultMaterials['upholstery'] ??
  null;

export const selectPillowUpholsteryId = (s: ConfiguratorState) =>
  (s.selection['pillow-upholstery'] as string) ??
  (s.selection['upholstery'] as string) ??
  s.product?.defaultMaterials['upholstery'] ??
  null;

export const selectBaseId = (s: ConfiguratorState) =>
  (s.selection['base'] as string) ?? s.product?.defaultMaterials['base'] ?? null;

export const selectSeating = (s: ConfiguratorState) => (s.selection['seating'] as number) ?? 3;

export const selectModelId = (s: ConfiguratorState) => (s.selection['model'] as string) ?? null;

export const selectBackStyle = (s: ConfiguratorState) =>
  (s.selection['back-style'] as string) ?? 'back-pillow';

export const selectArmStyle = (s: ConfiguratorState) =>
  (s.selection['arm-style'] as string) ?? 'arm-track';

export const selectLegStyle = (s: ConfiguratorState) =>
  (s.selection['leg-style'] as string) ?? 'leg-tapered';

export const selectPillowCount = (s: ConfiguratorState) =>
  (s.selection['pillow-count'] as number) ?? 2;

export const selectSeatPattern = (s: ConfiguratorState) =>
  (s.selection['seat-pattern'] as string) ?? 'seat-plain';

export const selectHeadboardPattern = (s: ConfiguratorState) =>
  (s.selection['headboard-pattern'] as string) ?? 'hb-tufted';

export const selectLighting = (s: ConfiguratorState) =>
  (s.selection['lighting'] as string) ?? 'light-none';

export const selectStorageType = (s: ConfiguratorState) =>
  (s.selection['storage-type'] as string) ?? 'storage-none';

export const selectMattressCore = (s: ConfiguratorState) =>
  (s.selection['core'] as string) ?? 'core-pocket-spring';

export const selectCurtainFold = (s: ConfiguratorState) =>
  (s.selection['fold'] as string) ?? 'fold-pinch';

export const selectCurtainTransparency = (s: ConfiguratorState) =>
  (s.selection['transparency'] as string) ?? 'trans-opaque';
