import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorList } from "../../api/errorAxios";
import { ErrorMark, SolvedErrorMark } from "./ErrorMark.tsx";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

interface Props {
  selectedProject: string;
}

// [UPDATED] 수정 사항 있음
// html 수정 다수
// 로직은 변경 없었던 듯
// 복불 될것 같음
// TODO 확인 필요

const ErrorList = ({ selectedProject }: Props) => {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState<Error[]>([]);

  const handleErrorClick = (error: Error) => {
    navigate(`/omegi/error/${error.errorId}`, { state: { error } }); // 에러 정보를 상태로 함께 전달
  };

  useEffect(() => {
    console.log("ERRORLIST", selectedProject);
    if (selectedProject === null || selectedProject === "") return;
    const getErrors = async () => {
      try {
        const response = await getErrorList(selectedProject, "", false);
        setErrorList(response.errors);
      } catch (error) {
        console.error("Failed to fetch error list:", error);
      }
    };

    getErrors();
  }, [selectedProject]);

  // 에러 타입의 마지막 . 뒷부분만 가져오기
  const getLastErrorType = (errorType: string) => {
    const lastIndex = errorType.lastIndexOf(".");
    if (lastIndex !== -1) {
      return errorType.substring(lastIndex + 1);
    } else {
      return "..." + "." + errorType;
    }
  };

  return (
    <table className="box-border flex h-full w-full flex-col items-center justify-between whitespace-normal">
      <thead className="box-border flex h-[5%] w-full items-center rounded-full bg-gradient-to-r from-[#98B9E8FF] to-[#BBB7EA] shadow-md">
        <tr className="mx-5 flex h-full w-full items-center justify-between">
          <td className="box-border flex h-full w-[7%] items-center justify-center whitespace-normal font-medium text-white">
            해결
          </td>
          <td className="box-border flex h-full w-[30%] items-center justify-center font-medium text-white">
            에러 종류
          </td>
          <td className="box-border flex h-full w-[17%] items-center justify-center font-medium text-white">
            서비스
          </td>
          <td className="box-border flex h-full w-[17%] items-center justify-center font-medium text-white">
            프로젝트
          </td>
          <td className="box-border flex h-full w-[10%] items-center justify-center font-medium text-white">
            날짜
          </td>
          {/* <td className="box-border flex h-full w-[7%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap font-medium text-white">
            연결된 노트
          </td> */}
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="box-border h-[94%] w-full divide-y divide-gray-200 overflow-y-scroll whitespace-pre-wrap scrollbar-webkit">
        {errorList.map((error) => (
          <tr
            key={error.errorId}
            className="mx-3 box-border flex h-[51px] w-full cursor-pointer items-center  justify-between whitespace-pre-wrap p-2 py-2 font-light text-gray-800 hover:bg-amber-100"
            onClick={() => handleErrorClick(error)}
          >
            <td className="box-border flex h-full w-[7%] items-center justify-center  overflow-hidden text-ellipsis whitespace-nowrap">
              {error.isSolved ? <SolvedErrorMark /> : <ErrorMark />}
            </td>
            <td className="box-border flex h-full w-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              ..{getLastErrorType(error.errorType)}
            </td>

            <td className="box-border flex h-full w-[17%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="flex h-fit w-full items-center justify-center rounded-xl bg-[#E3E1F57A] px-5 py-1 shadow-md ">
                {error.service}
              </div>
            </td>
            <td className="box-border flex h-full w-[17%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="flex h-fit w-full items-center justify-center rounded-xl bg-gray-100 px-5 py-1 shadow-md">
                {error.project}
              </div>
            </td>
            <td className="box-border flex h-full w-[10%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {error.time.split("T")[0]}
            </td>
            {/* <td className="box-border flex h-full w-[7%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap text-gray-400">
              {error.pastNoteCount}개
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ErrorList;
