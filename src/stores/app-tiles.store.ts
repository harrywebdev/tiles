import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export enum AppTileType {
  Clock = "clock",
}

export interface AppTile {
  id: string;
  type: AppTileType;
  label: string;
}

interface AppTilesStore {
  tiles: AppTile[];
  addTile: (tile: AppTile) => void;
  updateTile: (tile: AppTile) => void;
}

export const useAppTilesStore = create<AppTilesStore>((set) => ({
  tiles: [],

  addTile: (newTile) => set((state) => ({ tiles: [...state.tiles, newTile] })),

  updateTile: (updatedTile) =>
    set((state) => ({
      tiles: state.tiles.map((tile) => {
        if (tile.id === updatedTile.id) {
          return updatedTile;
        }

        return tile;
      }),
    })),
}));

export const createClockTile = (tile: Omit<AppTile, "type" | "id">) => {
  return {
    type: AppTileType.Clock,
    id: uuidv4(),
    ...tile,
  };
};
