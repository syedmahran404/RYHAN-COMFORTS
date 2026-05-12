'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Product } from '@/lib/schemas/product';
import { computeQuote, defaultSelection, type Quote, type Selection } from '@/lib/pricing/engine';

/**
 * Configurator store — the central nervous system of the live 3D experience.
 *
 * Responsibilities:
 *  - Hold the active product + selection
 *  - Derive the live quote
 *  - Broadcast changes to 3D, pricing, UI
 *  - Dehydrate to a quote payload for future /api/quote submissions
 */

interface ConfiguratorState {
  product: Product | null;
  selection: Selection;
  quote: Quote | null;
  /** Ephemeral UI state. */
  activeGroupId: string | null;
  /** Smooth price displayed by the HUD (interpolates toward quote.total). */
  displayPrice: number;

  setProduct: (product: Product) => void;
  setOption: (groupId: string, value: string | number) => void;
  setActiveGroup: (groupId: string | null) => void;
  setDisplayPrice: (value: number) => void;
  reset: () => void;
  dehydrate: () => DehydratedQuote | null;
}

export interface DehydratedQuote {
  productId: string;
  slug: string;
  selection: Selection;
  total: number;
  capturedAt: string;
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  subscribeWithSelector((set, get) => ({
    product: null,
    selection: {},
    quote: null,
    activeGroupId: null,
    displayPrice: 0,

    setProduct: (product) => {
      const selection = defaultSelection(product);
      const quote = computeQuote(product, selection);
      set({
        product,
        selection,
        quote,
        activeGroupId: product.groups[0]?.id ?? null,
        displayPrice: quote.total
      });
    },

    setOption: (groupId, value) => {
      const { product, selection } = get();
      if (!product) return;
      const next: Selection = { ...selection, [groupId]: value };
      const quote = computeQuote(product, next);
      set({ selection: next, quote });
    },

    setActiveGroup: (groupId) => set({ activeGroupId: groupId }),

    setDisplayPrice: (value) => set({ displayPrice: value }),

    reset: () => {
      const { product } = get();
      if (!product) return set({ selection: {}, quote: null, displayPrice: 0 });
      const selection = defaultSelection(product);
      const quote = computeQuote(product, selection);
      set({ selection, quote, displayPrice: quote.total });
    },

    dehydrate: () => {
      const { product, selection, quote } = get();
      if (!product || !quote) return null;
      return {
        productId: product.id,
        slug: product.slug,
        selection,
        total: quote.total,
        capturedAt: new Date().toISOString()
      };
    }
  }))
);

/** Narrow selectors used by the 3D engine for performant updates. */
export const selectUpholsteryId = (s: ConfiguratorState) =>
  (s.selection['upholstery'] as string) ?? s.product?.defaultMaterials['upholstery'] ?? null;

export const selectBaseId = (s: ConfiguratorState) =>
  (s.selection['base'] as string) ?? s.product?.defaultMaterials['base'] ?? null;

export const selectSeating = (s: ConfiguratorState) =>
  (s.selection['seating'] as number) ?? 3;

export const selectModelId = (s: ConfiguratorState) =>
  (s.selection['model'] as string) ?? null;
