import { create } from "zustand";

interface Store {
  linkTarget: number;
  setLinkTarget: (source: number) => void;
}

const useLinkStore = create<Store>()((set) => ({
  linkTarget: -1,
  setLinkTarget: (target) => set(() => ({ linkTarget: target })),
}));

export default useLinkStore;
