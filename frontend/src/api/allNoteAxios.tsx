import axiosInstance from "./axiosInstance";


// AllNoteList

export const getAllNoteList = async (keyword: string): Promise<any> => {
  try {
    let params = {};
    if (keyword.trim() !== "") {
      params = { keyword: keyword };
    }

    const response = await axiosInstance.get(`/notes/others`, {
      params,
    });

    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getAllNoteList");
  }
};

// AllNoteDetail
export const getAllNoteDetail = async (noteId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/notes/others/${noteId}`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getAllNoteDetail");
  }
};
