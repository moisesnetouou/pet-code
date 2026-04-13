"use client";

import { create } from "zustand";

interface UIState {
  petDialogOpen: boolean;
  openPetDialog: () => void;
  closePetDialog: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  petDialogOpen: false,
  openPetDialog: () => set({ petDialogOpen: true }),
  closePetDialog: () => set({ petDialogOpen: false }),
}));