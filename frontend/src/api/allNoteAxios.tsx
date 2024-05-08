import axios from "axios";

const BASE_URL = "";

// AllNoteList
interface User {
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
    const response = await axios.get(
      `${BASE_URL}/allNote/others?keyword=${keyword}`,
    );
    return response.data.result;
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
    const response = await axios.get(`${BASE_URL}/allNote/${noteId}`);
    return response.data.result;
  } catch (error) {
    console.error(error, "Fail getAllNoteDetail");
  }
};
