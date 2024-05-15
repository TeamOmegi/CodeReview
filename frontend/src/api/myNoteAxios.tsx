import axios from "axios";
import { useContentParser } from "../hooks/useContentParser";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

//Note
export interface Note {
  noteId?: number;
  title: string;
  tags: string[];
  content: string;
  type: string;
  visibility: string;
  links: number[];
}

// 노트 전체조회 ("")
export const getAllMyNoteData = async (keyword: string): Promise<any> => {
  try {
    let params = {};
    if (keyword.trim() !== "") {
      params = { keyword: keyword };
    }
    const response = await axios.get(`${BASE_URL}/notes/list`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error, "Fail getNoteData");
  }
};

// 노트 상세조회
export const getNoteData = async (noteId: number): Promise<any> => {
  console.log("전달완료: ", noteId);
  try {
    const response = await axios.get(`${BASE_URL}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error(error, "Fail getNoteData");
  }
};

// 사용자가 사용한 모든 Tag
export const getAllTags = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`);
    console.log(response, "Success AllTags");
    return response.data;
  } catch (error) {
    console.error(error, "Fail AllTags");
  }
};

// 노트 작성
export const noteCreate = async (noteData: Note) => {
  console.log("전달완료: ", noteData);
  console.log("번역완료!", useContentParser(noteData.content));
  try {
    const response = await axios.post(`${BASE_URL}/notes`, noteData);
    console.log(response, "Success NoteCreate");
  } catch (error) {
    console.error(error, "Fail NoteCreate");
  }
};

// 노트 수정
export const noteEdit = async (noteId: number, noteData: Note) => {
  console.log("전달완료:@!@!@ ", noteData);
  try {
    const response = await axios.patch(`${BASE_URL}/notes/${noteId}`, noteData);
    console.log(response, "Success NoteEdit");
  } catch (error) {
    console.error(error, "Fail NoteEdit");
  }
};

// 노트 삭제
export const noteDelete = async (noteId: number) => {
  console.log("전달완료: ", typeof noteId);
  try {
    const response = await axios.delete(`${BASE_URL}/notes/${noteId}`);
    console.log(response, "Success NoteDelete");
  } catch (error) {
    console.error(error, "Fail NoteDelete");
  }
};
