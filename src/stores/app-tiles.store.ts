import { create } from "zustand";

export interface AppTile {
  label: string;
}

interface AppTilesStore {
  tiles: AppTile[];
  addTile: (tile: AppTile) => void;
}

export const useAppTilesStore = create<AppTilesStore>((set) => ({
  tiles: [],
  addTile: (newTile) => set((state) => ({ tiles: [...state.tiles, newTile] })),
}));
