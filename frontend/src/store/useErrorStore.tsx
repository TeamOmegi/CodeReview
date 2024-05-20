import { create } from "zustand";

interface Error {
  errorId: number;
  serviceId: number;
  projectId: number;
  solved: boolean;
  serviceName?: string;
  projectName?: string;
  type: string;
  time: string;
}

interface Store {
  errorList: Error[];
  isNewError: boolean;
  errorMap: Map<number, number>;
  errorUpdate: {
    type: string;
    toggle: boolean;
  };
  setErrorCreate: (error: Error) => void;
  setErrorDelete: (errorArr: Error[]) => void;
  setIsNewError: (isError: boolean) => void;
  setErrorMap: (serviceId: number, type: string) => void;
}

const useErrorStore = create<Store>()((set) => ({
  errorList: [],
  isNewError: false,
  errorMap: new Map(),
  errorUpdate: {
    type: "",
    toggle: false,
  },
  setErrorCreate: (error) =>
    set((state) => ({
      errorList: [error, ...state.errorList],
      errorUpdate: { type: "create", toggle: !state.errorUpdate.toggle },
    })),
  setErrorDelete: (errorArr) =>
    set((state) => ({
      errorList: [...errorArr],
      errorUpdate: { type: "delete", toggle: !state.errorUpdate.toggle },
    })),
  setIsNewError: (isError) => set(() => ({ isNewError: isError })),
  setErrorMap: (serviceId, type) =>
    set((state) => {
      let errorCount = state.errorMap.get(serviceId) || 0;
      if (type === "up") {
        errorCount += 1;
      } else if (type === "down") {
        errorCount -= 1;
        if (errorCount == 0) {
          const updatedErrorMap = new Map(state.errorMap);
          updatedErrorMap.delete(serviceId);
          return { errorMap: updatedErrorMap };
        }
      }
      const updatedErrorMap = new Map(state.errorMap).set(
        serviceId,
        errorCount,
      );
      return { errorMap: updatedErrorMap };
    }),
}));

export default useErrorStore;
