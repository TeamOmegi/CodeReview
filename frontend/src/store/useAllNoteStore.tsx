import { create } from "zustand";
import { useContentParser } from "../hooks/useContentParser";

interface AllNote {
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  user: {
    userId: number;
    profileImageUrl: string;
    username: string;
  };
  imageUrl: string;
}

interface Store {
  allNoteList: AllNote[];
  setAllNoteCreate: (note: AllNote) => void;
  setAllNoteList: (notes: AllNote[]) => void;
  setAllNoteDelete: (index: number) => void;
}

const useALLNoteStore = create<Store>()((set) => ({
  allNoteList: [],
  setAllNoteList: (notes) =>
    set(() => {
      if (notes.length === 0) return { noteList: [...notes] };
      notes.map((note) => {
        note.content = useContentParser(note.content);
        return note;
      });
      return { allNoteList: [...notes] };
    }),
  setAllNoteCreate: (note) =>
    set((state) => ({ allNoteList: [note, ...state.allNoteList] })),
  setAllNoteDelete: (index) =>
    set((state) => {
      const notes = [...state.allNoteList];
      if (index < notes.length) notes.splice(index, 1);
      return { allNoteList: notes };
    }),
}));

export default useALLNoteStore;
