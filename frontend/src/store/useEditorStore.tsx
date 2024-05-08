import { create } from "zustand";

interface Store {
  showNote: boolean;
  noteType: string;
  isWriting: boolean;
  setShowNote: () => void;
  setNoteType: (typeName: string) => void;
  setIsWriting: (isWrite: boolean) => void;
}

const useEditorStore = create<Store>()((set) => ({
  showNote: false,
  noteType: "create",
  isWriting: false,
  setShowNote: () => set((state) => ({ showNote: !state.showNote })),
  setNoteType: (typeName) => set(() => ({ noteType: typeName })),
  setIsWriting: (isWrite) => set((isWriting) => ({ isWriting: isWrite })),
}));

export default useEditorStore;
