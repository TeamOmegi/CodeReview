import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorDetail } from "../api/errorAxios";
import Header from "../components/Common/Header.tsx";
import ErrorDetailDropdown from "../components/Error/ErrorDetailDropdown.tsx";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

interface ErrorLog {
  type: string;
  trace: string[];
  summary: string;
  log: string;
  noteId: number;
  time: string;
  serviceId: number;
  projectId: number;
}

interface Props {
  noteId: number;
}

// [UPDATED] 변경
// 중요!!!
// 인터페이스 ErrorDetail 형식 수정함

const ErrorDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error: Error | undefined = location.state?.error;
  const [errorDetail, setErrorDetail] = useState<Error | null>(null);
  const [errorLog, setErrorLog] = useState<ErrorLog | null>(null);

  useEffect(() => {
    const getErrorLog = async () => {
      try {
        if (error) {
          const errorLog = await getErrorDetail(error.errorId);
          setErrorDetail(error);
          setErrorLog(errorLog);
        }
      } catch (error) {
        console.error("Failed to fetch error detail:", error);
      }
    };
    getErrorLog();
  }, [error]);

  const handleNoteClick = ({ noteId }: Props) => {
    if (noteId !== -1) {
      navigate(`/note/${noteId}`); // 관련 노트의 상세 페이지로 이동
    }
  };

  const handelBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-default box-border flex h-full w-full flex-col px-8 pb-8 pt-12">
      {/* 제목 */}
      <div className="mb-5 box-border flex h-fit w-full flex-col justify-between">
        <div className="box-border flex h-fit w-full items-start">
          <img
            className="mr-3 mt-2 aspect-square h-10 opacity-30 hover:cursor-pointer"
            alt="Dropdown_Icon"
            src={"/icons/PageBackIcon2.png"}
            onClick={handelBackButtonClick}
          />
          <Header title={errorLog?.type || "java.lang.ArrayIndexOutOfBounds"} />
        </div>
        <div className="box-border flex h-fit w-full justify-between px-5 pt-2">
          <div className="flex h-fit w-fit">
            <div className="mr-3 flex h-fit w-fit items-center justify-center rounded-xl bg-[#98B9E8FF] px-5 py-2 text-white shadow-md">
              {error?.project}
            </div>
            <div className="mr-3 flex h-fit w-fit items-center justify-center rounded-xl bg-[#BBB7EA] px-5 py-2 text-white shadow-md">
              {error?.service}
            </div>
            <div className="flex h-fit w-fit rounded-xl bg-gray-200 px-3 py-2 text-gray-800 shadow-md">
              {errorDetail?.time.split("T")[0] +
                " " +
                errorDetail?.time.split("T")[1]}
            </div>
          </div>
          {/* <div className="flex h-fit w-fit">
            <div className="mr-3 box-border flex h-fit w-fit items-center justify-center rounded-xl bg-fuchsia-100 px-5 py-2">
              관련 노트 보기
            </div>
            <div className="box-border flex h-fit w-fit items-center justify-center rounded-xl bg-fuchsia-100 px-5 py-2">
              노트 작성
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll scrollbar-webkit">
        {/* 로그 Trace */}
        <div className="mb-7 box-border flex h-fit w-full flex-col justify-between">
          <div className="my-1 ml-2 flex items-center justify-start text-lg font-bold text-gray-600">
            Trace
          </div>
          {errorLog?.trace.map((span) => <ErrorDetailDropdown span={span} />)}
        </div>

        {/* 로그 요약 */}
        <div className="mb-7 box-border flex h-fit w-full flex-col justify-between">
          <div className="my-2 ml-2 flex items-center justify-start text-lg font-bold text-gray-600">
            Summary
          </div>
          <div className="w-full rounded-md border-[1px] border-gray-200 bg-gray-100 p-4 shadow-md">
            <pre>{errorLog?.summary.replace(/step\./g, "\nstep.")}</pre>
          </div>
        </div>

        {/* 로그 원문 */}
        <div className="box-border flex h-fit w-full flex-col justify-between pb-7">
          <div className="my-2 ml-2 flex items-center justify-start text-lg font-bold text-gray-600">
            Log
          </div>
          <div className="w-full rounded-md bg-gray-200 p-4 shadow-md">
            {errorLog?.log}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDetailPage;
