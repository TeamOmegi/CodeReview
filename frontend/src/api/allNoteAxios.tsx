import axios from "axios";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

// AllNoteList
interface User {
  userId: number;
  profileImageUrl: string;
  username: string;
}

interface Note {
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  user: User;
}

export const getAllNoteList = async (keyword: string): Promise<any> => {
  try {
    let params = {};
    if (keyword.trim() !== "") {
      params = { keyword: keyword };
    }
    const response = await axios.get(`${BASE_URL}/notes/others`, {
      params,
    });
    console.log(response.data.response, "Success getAllNoteList");
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getAllNoteList");
  }
};

// AllNoteDetail
interface ErrorInfo {
  errorId: number;
  errorType: string;
  summary: string;
  solved: boolean;
}

interface NoteDetail {
  user: User;
  noteId: number;
  title: string;
  content: string;
  type: "ERROR" | "NORMAL";
  backlinkCount: number;
  createdAt: string;
  error: ErrorInfo;
}

export const getAllNoteDetail = async (noteId: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/notes/others/${noteId}`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getAllNoteDetail");
  }
};
