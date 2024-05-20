import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

interface Project {
  projectId: number;
  name: string;
}

export const getProjectList = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects`);
    return response.data.response.projects;
  } catch (error) {
    console.error(error, "Fail getProjectList");
  }
};

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

// 에러 리스트 가져오기
export const getErrorList = async (
  project: string,
  service: string,
  solved: boolean,
) => {
  try {
    const params = { project: project, solved: solved };
    if (solved !== null) {
      params.solved = solved;
    }
    const response = await axiosInstance.get(`/errors`, { params });
    console.log(response.data.response);
    return response.data.response;
  } catch (error) {
    console.error("Error getErrorList", error);
  }
};

// 에러 상세 조회
interface ErrorDetail {
  type: string;
  summary: string;
  log: string;
  trace: string[];
  time: string;
  projectId: number;
  serviceId: number;
  noteId: number;
}

export const getErrorDetail = async (errorId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/errors/${errorId}`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getErrorDetail");
  }
};
