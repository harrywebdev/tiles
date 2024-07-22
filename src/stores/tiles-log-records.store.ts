import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StoreStorageKey } from "./types.ts";
import { AppTile } from "./app-tiles.store.ts";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

interface TilesLogRecord {
  id: string;
  tile: AppTile;
  ts: Date;
}

interface TilesLogRecordsStore {
  logRecords: TilesLogRecord[];
  createTileLogRecord: (tileToLog: AppTile) => void;
  deleteTileLogRecord: (tileLogToDelete: TilesLogRecord) => void;
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
              id: uuidv4(),
              tile: tile,
              ts: new Date(),
            },
          ],
        }),

      deleteTileLogRecord: (tileLogRecordToDelete) => {
        set({
          logRecords: get().logRecords.filter(
            (lr) => lr.id !== tileLogRecordToDelete.id
          ),
        });
      },

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
