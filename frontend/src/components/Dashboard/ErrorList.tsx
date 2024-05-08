import React from "react";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  createdAt: string;
}

const ErrorList = () => {
  const errors: Error[] = [
    {
      errorId: 1,
      isSolved: false,
      errorType: "Type Error",
      project: "Project A",
      service: "Service A",
      createdAt: "2021-09-01",
    },
    {
      errorId: 2,
      isSolved: false,
      errorType: "Reference Error",
      project: "Project B",
      service: "Service B",
      createdAt: "2021-09-02",
    },
    {
      errorId: 3,
      isSolved: true,
      errorType: "Syntax Error",
      project: "Project C",
      service: "Service C",
      createdAt: "2021-09-03",
    },
  ];

  return (
    <div className=" flex h-full w-full flex-col bg-slate-500">
      <div className="flex h-1/6 w-full items-center bg-slate-300 text-base">
        <div className="ml-5 flex h-full w-[30%]">에러 종류</div>
        <div className="ml-3 flex h-full w-[30%]">프로젝트</div>
        <div className="ml-5 flex h-full w-[30%]">날짜</div>
        <div className="flex h-full w-[10%]">상세</div>
      </div>
      <div className="flex h-5/6 w-full flex-col bg-slate-200 text-sm">
        {errors.map((error) => (
          <div key={error.errorId} className="box-border flex w-full p-1">
            <div className="ml-5 flex h-full w-[30%]">{error.errorType}</div>
            <div className="flex h-full w-[30%]">{error.project}</div>
            <div className="flex h-full w-[30%]">{error.createdAt}</div>
            <div className="flex h-full w-[10%]">
              <button className="box-border rounded-2xl bg-secondary-200 pl-2 pr-2">
                상세
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorList;
