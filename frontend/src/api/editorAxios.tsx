import axios from "axios";

const BASE_URL = "";

//Note Create
export interface Note {
  title: string;
  tag: string[];
  content: string;
}

// 노트 수정 정보얻기
export const getNoteData = async (noteId: number): Promise<any> => {
  console.log("전달완료: ", noteId);
  try {
    const response = await axios.get(`${BASE_URL}/xx/xx/${noteId}`);
    return response.data;
  } catch (error) {
    console.error(error, "Fail getNoteData");
  }
};

// 노드 작성
export const noteCreate = async (noteData: Note) => {
  console.log("전달완료: ", noteData);
  try {
    const response = await axios.post(`${BASE_URL}/xx/xx`, noteData);
    console.log(response, "Success NoteCreate");
  } catch (error) {
    console.error(error, "Fail NoteCreate");
  }
};
