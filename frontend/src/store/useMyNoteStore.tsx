import { create } from "zustand";
import { useContentParser } from "../hooks/useContentParser";

export interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  type: string;
  visibility: string;
  createdAt: string;
  imageUrl: string;
}

interface Store {
  noteList: MyNote[];
  setNoteList: (notes: MyNote[]) => void;
  setNoteCreate: (note: MyNote) => void;
  setNoteDelete: (index: number) => void;
}

const useMyNoteStore = create<Store>()((set) => ({
  noteList: [],
  setNoteList: (notes) =>
    set(() => {
      if (notes.length === 0) return { noteList: [...notes] };
      notes.map((note) => {
        note.content = useContentParser(note.content);
        return note;
      });
      return { noteList: [...notes] };
    }),
  setNoteCreate: (note) =>
    set((state) => ({ noteList: [note, ...state.noteList] })),
  setNoteDelete: (index) =>
    set((state) => {
      const notes = [...state.noteList];
      if (index < notes.length) notes.splice(index, 1);
      return { noteList: [...notes] };
    }),
}));

export default useMyNoteStore;
