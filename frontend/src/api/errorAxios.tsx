import axiosInstance from "./axiosInstance";

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


// 에러 리스트 가져오기
export const getErrorList = async (project: string, solved: boolean) => {
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

export const getErrorDetail = async (errorId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/errors/${errorId}`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getErrorDetail");
  }
};
