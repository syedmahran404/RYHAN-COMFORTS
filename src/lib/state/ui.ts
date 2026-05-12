'use client';

import { create } from 'zustand';

/**
 * UI store — cross-cutting ephemeral UI state (menu, command palette, theme).
 */

interface UIState {
  navOpen: boolean;
  commandOpen: boolean;
  cinematicMode: boolean;
  setNavOpen: (v: boolean) => void;
  toggleNav: () => void;
  setCommandOpen: (v: boolean) => void;
  toggleCommand: () => void;
  setCinematicMode: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  navOpen: false,
  commandOpen: false,
  cinematicMode: true,
  setNavOpen: (v) => set({ navOpen: v }),
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
  setCommandOpen: (v) => set({ commandOpen: v }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
  setCinematicMode: (v) => set({ cinematicMode: v })
}));
