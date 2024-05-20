import useErrorStore from "../../store/useErrorStore";
import { getErrorSolved } from "../../api/projectAxios";
import { useQuestion, useWarnning } from "../../hooks/useComfirm";

interface Error {
  errorId: number;
  serviceId: number;
  projectId: number;
  serviceName: string;
  projectName: string;
  solved: boolean;
  type: string;
  time: string;
}

const ErrorList = () => {
  const { errorList, setErrorDelete, setErrorMap } = useErrorStore();

  const handleSolvedError = async (serviceId: number, errorId: number) => {
    const result = await useQuestion({
      title: "Error Solved",
      fireText: "Error를 완료 상태로 바꾸시겠습니까?",
      resultText: "Error가 완료 처리되었습니다.",
    });

    if (result) {
      const updatedErrorList = errorList.filter(
        (error) => error.errorId != errorId,
      );

      setErrorDelete([...updatedErrorList]);
      await getErrorSolved(errorId);

      setErrorMap(serviceId, "down");
    }

    // 1.  ~~ 에러를 완료하시겠습니까?
    // 2. setErrorList에서 해당 배열지우기
  };

  return (
    <table className="box-border flex h-full w-full flex-col items-center justify-between whitespace-normal">
      <thead className=" flex h-[15%] w-full flex-col">
        <tr className="mr-3 flex h-full w-full items-center justify-start rounded-t-lg bg-primary-200 text-base text-gray-800">
          <td className="flex h-full w-[30%] items-center justify-center font-medium">
            에러 종류
          </td>
          <td className="flex h-full w-[20%] items-center justify-center font-medium">
            프로젝트
          </td>
          <td className="flex h-full w-[20%] items-center justify-center font-medium">
            서비스
          </td>
          <td className="flex h-full w-[20%] items-center justify-center font-medium">
            날짜
          </td>
          <td className="mr-6 flex h-full w-[10%] items-center justify-center font-medium">
            상세
          </td>
        </tr>
      </thead>
      <tbody className="flex h-[85%] w-full flex-col overflow-y-scroll rounded-b-lg bg-primary-50 text-sm scrollbar-webkit">
        {errorList.map((error) => (
          <tr
            key={error.errorId}
            className="flex w-full animate-fade justify-center px-1 py-1"
          >
            <td className="mr-1 flex h-full w-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              {error.type}
            </td>
            <td className="mr-1 flex h-full w-[20%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              {error.projectName}
            </td>
            <td className="whitespace-nowrapoverflow-hidden mr-1 flex h-full w-[20%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              {error.serviceName}
            </td>
            <td className="flex h-full w-[20%] items-center justify-center font-medium">
              {error.time.split("T")[0]}
            </td>
            <td className="flex h-full w-[10%] items-center justify-center font-medium">
              <button
                className="box-border rounded-2xl bg-primary-400 pl-2 pr-2"
                onClick={() =>
                  handleSolvedError(error.serviceId, error.errorId)
                }
              >
                완료
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ErrorList;
