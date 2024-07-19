import { create } from "zustand";

export enum AppTileType {
  Clock = "clock",
}

export interface AppTile {
  type: AppTileType;
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
