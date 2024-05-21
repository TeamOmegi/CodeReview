import axiosInstance from "./axiosInstance";

// ErrorSummary
interface ErrorSummary {
  solvedErrorCount: number;
  unsolvedErrorCount: number;
  recentlyErrorOccurredAt: string;
}

// 에러 한눈에 보기
export const getErrorSummary = async (): Promise<ErrorSummary | undefined> => {
  try {
    const response = await axiosInstance.get(`/errors/summary`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getErrorSummary");
  }
};

// NoteSummary
interface NoteSummary {
  noteCount: number;
  linkCount: number;
  backlinkCount: number;
}

// 노트 한눈에 보기
export const getNoteSummary = async (): Promise<NoteSummary | undefined> => {
  try {
    const response = await axiosInstance.get(`/notes/summary`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getNoteSummary");
  }
};

// ErrorList
interface ErrorItem {
  errorId: number;
  projectId: number;
  serviceId: number;
  error: string;
}

interface RecentErrorListResponse {
  status: number;
  message: string;
  result: ErrorItem[];
}

// 에러 최근 목록
export const getRecentErrorList = async (): Promise<
  ErrorItem[] | undefined
> => {
  try {
    const response =
      await axiosInstance.get<RecentErrorListResponse>("/api/recentErrors");
    return response.data.result;
  } catch (error) {
    // 오류 처리
    console.error("Error occurred while fetching recent error list:", error);
  }
};
