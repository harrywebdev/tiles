import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createJSONStorage, persist } from "zustand/middleware";
import { StoreStorageKey } from "./types.ts";

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

export const useAppTilesStore = create<AppTilesStore>()(
  persist(
    (set, get) => ({
      tiles: [],

      addTile: (newTile) => set({ tiles: [...get().tiles, newTile] }),

      updateTile: (updatedTile) =>
        set({
          tiles: get().tiles.map((tile) => {
            if (tile.id === updatedTile.id) {
              return updatedTile;
            }

            return tile;
          }),
        }),
    }),
    {
      name: StoreStorageKey.AppTilesStore,
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const createClockTile = (tile: Omit<AppTile, "type" | "id">) => {
  return {
    type: AppTileType.Clock,
    id: uuidv4(),
    ...tile,
  };
};
