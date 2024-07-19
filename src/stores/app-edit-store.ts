import { create } from "zustand";

interface AppEditStore {
  isEditing: boolean;
  toggleIsEditing: () => void;
}

export const useAppEditStore = create<AppEditStore>((set) => ({
  isEditing: false,
  toggleIsEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}));
