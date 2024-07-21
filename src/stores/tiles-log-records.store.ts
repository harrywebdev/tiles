import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StoreStorageKey } from "./types.ts";
import { AppTile } from "./app-tiles.store.ts";

interface TilesLogRecord {
  tile: AppTile;
  ts: Date;
}

interface TilesLogRecordsStore {
  logRecords: TilesLogRecord[];
  createTileLogRecord: (tileToLog: AppTile) => void;
}

export const useTilesLogRecordsStore = create<TilesLogRecordsStore>()(
  persist(
    (set, get) => ({
      logRecords: [],

      createTileLogRecord: (tile) =>
        set({
          logRecords: [
            ...get().logRecords,
            {
              tile: tile,
              ts: new Date(),
            },
          ],
        }),
    }),
    {
      name: StoreStorageKey.TilesLogRecordsStore,
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
