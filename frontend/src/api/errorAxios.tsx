import axios from "axios";

const BASE_URL = "";

interface ErrorItem {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string; // 에러 발생 시간의 형식에 따라 수정해야 합니다.
  pastNoteCount: number;
}

interface ErrorListResponse {
  status: number;
  message: string;
  result: ErrorItem[];
}

// 에러 리스트 가져오기
export const getErrorList = async (
  project: string,
  service: string,
  solved: boolean | undefined,
  errorType: string | undefined,
): Promise<any> => {
  try {
    const response = await axios.get<ErrorListResponse>(`${BASE_URL}/errors`, {
      params: {
        project,
        service,
        solved,
        errorType,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error, "Fail getErrorList");
  }
};

// 에러 상세 조회
interface ErrorDetail {
  traces: string[]; // 추후 수정
  summary: string;
  log: string;
  noteId: number; // 작성된 노트가 없는 경우 -1
}

interface ErrorDetailResponse {
  status: number;
  message: string;
  result: ErrorDetail;
}

export const getErrorDetail = async (errorId: number): Promise<any> => {
  try {
    const response = await axios.get<ErrorDetailResponse>(
      `${BASE_URL}/errors/${errorId}`,
    );
    return response.data.result;
  } catch (error) {
    console.error(error, "Fail getErrorDetail");
  }
};
