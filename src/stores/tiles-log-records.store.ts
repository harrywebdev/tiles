import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StoreStorageKey } from "./types.ts";
import { AppTile } from "./app-tiles.store.ts";
import { format } from "date-fns";

interface TilesLogRecord {
  tile: AppTile;
  ts: Date;
}

interface TilesLogRecordsStore {
  logRecords: TilesLogRecord[];
  createTileLogRecord: (tileToLog: AppTile) => void;
  getTileLogRecords: (
    tileId: AppTile["id"],
    period: "today" | "all"
  ) => TilesLogRecord[];
}

export const useTilesLogRecordsStore = create<TilesLogRecordsStore>()(
  persist(
    (set, get) => ({
      logRecords: [] as TilesLogRecord[],

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

      getTileLogRecords: (tileId, period) =>
        get().logRecords.reduce(
          tileLogRecordByIdReducer(tileId, period),
          [] as TilesLogRecord[]
        ),
    }),
    {
      name: StoreStorageKey.TilesLogRecordsStore,
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

function tileLogRecordByIdReducer(
  tileId: AppTile["id"],
  period: "today" | "all"
) {
  if (period === "all") {
    return (acc: TilesLogRecord[], logRecord: TilesLogRecord) => {
      if (logRecord.tile.id === tileId) {
        acc.push(logRecord);
      }

      return acc;
    };
  }

  const today = formatDate(new Date());
  return (acc: TilesLogRecord[], logRecord: TilesLogRecord) => {
    if (formatDate(logRecord.ts) === today && logRecord.tile.id === tileId) {
      acc.push(logRecord);
    }

    return acc;
  };
}

function formatDate(fullDate: Date): string {
  return format(fullDate, "yyyy-MM-dd");
}
