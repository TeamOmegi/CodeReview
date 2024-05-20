import axiosInstance from "./axiosInstance";

interface Project {
  projectName: string;
  services: Service[];
}

interface Service {
  serviceTypeId: number;
  serviceName: string;
}

interface TokenName {
  name: string;
}

// 다이어그램 정보 가져오기
export const getDiagram = async (projectId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/diagram`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 에러 한눈에 보기
export const getErrorSolved = async (errorId: number): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/errors/${errorId}/solved`);
    return response;
  } catch (error) {
    console.error(error, "Fail getErrorSolved");
  }
};

// 프로젝트 생성하기
export const projectCreate = async (projectData: Project) => {
  try {
    const response = await axiosInstance.post(`/projects`, projectData);
    console.log(response, "Success PjtCreate");
  } catch (error) {
    console.error(error, "Fail projectCreate");
  }
};

// 프로젝트 삭제하기
export const projectDelete = async (projectId: number) => {
  try {
    const response = await axiosInstance.delete(`/projects/${projectId}`);
    console.log(response, "Success projectDelete");
  } catch (error) {
    console.error(error, "Fail projectCreate");
  }
};

// 프로젝트 이름가져오기
export const getProjectNames = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getProjectNames");
  }
};

// 프로젝트내 서비스 종류 가져오기
export const getServices = async (projectId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getServices");
  }
};

// 프로젝트 생성시 서비스 타입종류 가져오기
export const getServicesType = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/services/supported-types`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getServicesType");
  }
};

// 프로젝트 토큰 리스트
export const getProjectTokens = async (projectId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/projects/${projectId}/serviceTokens`,
    );
    return response.data;
  } catch (error) {
    console.error(error, "Fail getProjectTokens");
  }
};

// 서비스 토큰 발급받기.
export const getServiceTokens = async (
  projectId: number,
  serviceId: number,
  nameData: TokenName,
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/projects/${projectId}/services/${serviceId}/tokens`,
      nameData,
    );
    return response.data;
  } catch (error) {
    console.error(error, "Fail getServiceTokens");
  }
};

// 서비스 토큰 삭제
export const deleteServiceTokens = async (
  projectId: number,
  serviceId: number,
): Promise<any> => {
  try {
    const response = await axiosInstance.delete(
      `/projects/${projectId}/services/${serviceId}/tokens`,
    );
    return response.data;
  } catch (error) {
    console.error(error, "Fail deleteServiceTokens");
  }
};
