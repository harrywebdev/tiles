import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StoreStorageKey } from "./types.ts";

interface AppEditStore {
  isEditing: boolean;
  toggleIsEditing: () => void;
}

export const useAppEditStore = create<AppEditStore>()(
  persist(
    (set, get) => ({
      isEditing: false,
      toggleIsEditing: () => set({ isEditing: !get().isEditing }),
    }),
    {
      name: StoreStorageKey.AppEditStore,
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
