import axiosInstance from "./axiosInstance";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

//Note
export interface Note {
  title: string;
  tags: string[];
  content: string;
  type: string;
  visibility: string;
  links?: number[];
  createdAt?: string;
  imageUrl: string;
}

// 노트 전체조회 ("")
export const getAllMyNoteData = async (keyword: string): Promise<any> => {
  try {
    let params = {};
    if (keyword.trim() !== "") {
      params = { keyword: keyword };
    }
    const response = await axiosInstance.get(`/notes/list`, {
      params,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error, "Fail getNoteData");
  }
};

// 노트 상세조회
export const getNoteData = async (noteId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error(error, "Fail getNoteData");
  }
};

// 사용자가 사용한 모든 Tag
export const getAllTags = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/tags`);
    //console.log(response, "Success AllTags");
    return response.data;
  } catch (error) {
    console.error(error, "Fail AllTags");
  }
};

// 노트 작성
export const noteCreate = async (noteData: Note) => {
  try {
    const response = await axiosInstance.post(`/notes`, noteData);
    // console.log(response, "Success NoteCreate");
  } catch (error) {
    console.error(error, "Fail NoteCreate");
  }
};

// 노트 수정
export const noteEdit = async (noteId: number, noteData: Note) => {
  try {
    const response = await axiosInstance.patch(`/notes/${noteId}`, noteData);
    // console.log(response, "Success NoteEdit");
  } catch (error) {
    console.error(error, "Fail NoteEdit");
  }
};

// 노트 삭제
export const noteDelete = async (noteId: number) => {
  try {
    const response = await axiosInstance.delete(`/notes/${noteId}`);
    //console.log(response, "Success NoteDelete");
  } catch (error) {
    console.error(error, "Fail NoteDelete");
  }
};
