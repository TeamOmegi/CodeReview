import { create } from "zustand";

interface Store {
  showNote: boolean;
  noteType: string;
  setShowNote: () => void;
  setNoteType: (typeName: string) => void;
}

const useEditorStore = create<Store>()((set) => ({
  showNote: false,
  noteType: "create",
  setShowNote: () => set((state) => ({ showNote: !state.showNote })),
  setNoteType: (typeName) => set(() => ({ noteType: typeName })),
}));

export default useEditorStore;
