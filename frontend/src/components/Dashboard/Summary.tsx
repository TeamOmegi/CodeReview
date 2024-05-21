import { useEffect, useState } from "react";
import { getErrorSummary, getNoteSummary } from "../../api/dashboardAxios";
import useErrorStore from "../../store/useErrorStore";

const Summary = () => {
  const [errorSummary, setErrorSummary] = useState<any>(null);
  const [noteSummary, setNoteSummary] = useState<any>(null);
  const { errorList, errorUpdate } = useErrorStore();

  useEffect(() => {
    const getErrorSum = async () => {
      const data = await getErrorSummary();
      setErrorSummary(data);
    };

    const getNoteSum = async () => {
      const data = await getNoteSummary();
      setNoteSummary(data);
    };

    getErrorSum();
    getNoteSum();
  }, []);

  useEffect(() => {
    if (
      errorUpdate.type == "create" &&
      errorList.length > errorSummary?.unsolvedErrorCount
    ) {
      setErrorSummary({
        ...errorSummary,
        unsolvedErrorCount: errorList.length,
        recentlyErrorOccurredAt:
          errorList[errorList.length - 1].time.split("T")[0],
      });
    } else if (errorUpdate.type == "delete") {
      setErrorSummary({
        ...errorSummary,
        solvedErrorCount: errorSummary?.solvedErrorCount + 1,
        unsolvedErrorCount: errorSummary?.unsolvedErrorCount - 1,
      });
    }
  }, [errorUpdate]);

  return (
    <div className="m-1 mr-3 flex h-full w-[35%] flex-col rounded-xl">
      <div className="mb-2 mt-1 flex h-1/2 w-full flex-col rounded-xl bg-white p-1  shadow-md">
        <div className="ml-2 mt-2 box-border flex h-2/6 w-full p-2 text-base font-bold">
          나의 에러 한눈에 보기
        </div>
        <div className="box-border flex h-4/6 px-3 pb-3 ">
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/SmileIcon.svg" alt="SolvedIcon" />
            <div className="mt-2 text-[13px] font-bold">해결 에러</div>

            <div className="mt-1 animate-fade text-xs">
              {errorSummary ? errorSummary?.solvedErrorCount : "-"} 개
            </div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/SadIcon.svg" alt="UnsolvedIcon" />
            <div className="mt-2 text-[13px] font-bold">미해결 에러</div>
            <div className="mt-1 animate-fade text-xs">
              {errorSummary ? errorSummary?.unsolvedErrorCount : "-"} 개
            </div>
          </div>
          <div className=" box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/RecentErrorIcon.svg" alt="RecentErrorIcon" />
            <div className="mt-2 text-[13px] font-bold">최근 에러 발생일</div>
            <div className="mt-1 animate-fade text-xs">
              {(errorSummary &&
                errorSummary?.recentlyErrorOccurredAt?.split("T")[0]) ||
                "-"}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-1 flex h-1/2 w-full flex-col rounded-xl bg-white p-1  shadow-md">
        <div className="ml-2 mt-2 box-border flex h-2/6 w-full p-2 text-base font-bold">
          나의 노트 한눈에 보기
        </div>
        <div className="box-border flex h-4/6 px-3 pb-3">
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/NoteCountIcon.svg" alt="NoteCountIcon" />
            <div className="mt-2 text-[13px] font-bold ">작성한 노트 수</div>
            <div className="mt-1 animate-fade text-xs">
              {noteSummary ? noteSummary.noteCount : "-"} 개
            </div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/MyToAllIcon.svg" alt="MyToAllICon" />
            <div className="mt-2 text-[13px] font-bold">내가 연결한 노트</div>
            <div className="mt-1 animate-fade text-xs">
              {noteSummary ? noteSummary.linkCount : "-"} 개
            </div>
          </div>
          <div className="box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/AllToMyIcon.svg" alt="AllToMyIcon" />
            <div className="mt-2 text-[13px] font-bold">나를 연결한 노트</div>
            <div className="mt-1 animate-fade text-xs">
              {noteSummary ? noteSummary.backlinkCount : "-"} 개
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
