import React from "react";

const Summary = () => {
  return (
    <div className="m-1 mr-3 flex h-full w-2/5 flex-col rounded-xl">
      {/* 나의 에러 한눈에 보기 */}
      <div className="mb-2 mt-1 flex h-1/2 w-full flex-col rounded-xl bg-white p-1  shadow-md">
        <div className="ml-2 mt-2 box-border flex h-2/6 w-full p-2 text-base font-bold">
          나의 에러 한눈에 보기
        </div>
        <div className="box-border flex h-4/6 px-3 pb-3">
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img
              className="h-12 w-12"
              src="/icons/TempIcon.png"
              alt="TempIcon"
            />
            <div className="mt-2 text-sm">해결 에러</div>
            <div className="text-base">10</div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img
              className="h-12 w-12"
              src="/icons/TempIcon.png"
              alt="TempIcon"
            />
            <div className="mt-2 text-sm">미해결 에러</div>
            <div className="text-base">10</div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img
              className="h-12 w-12"
              src="/icons/TempIcon.png"
              alt="TempIcon"
            />
            <div className="mt-2 text-sm">최근 에러 발생일</div>
            <div className="text-base">10</div>
          </div>
        </div>
      </div>
      {/* 나의 노트 한눈에 보기 */}
      <div className="mb-2 mt-1 flex h-1/2 w-full flex-col rounded-xl bg-white p-1  shadow-md">
        <div className="ml-2 mt-2 box-border flex h-2/6 w-full p-2 text-base font-bold">
          나의 노트 한눈에 보기
        </div>
        <div className="box-border flex h-4/6 px-3 pb-3">
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img
              className="h-12 w-12"
              src="/icons/TempIcon.png"
              alt="TempIcon"
            />
            <div className="mt-2 text-sm">작성한 노트 수</div>
            <div className="text-base">10</div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img
              className="h-12 w-12"
              src="/icons/TempIcon.png"
              alt="TempIcon"
            />
            <div className="mt-2 text-sm">내가 연결한 노트</div>
            <div className="text-base">10</div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img
              className="h-12 w-12"
              src="/icons/TempIcon.png"
              alt="TempIcon"
            />
            <div className="mt-2 text-sm">나에게 연결된 노트</div>
            <div className="text-base">10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
