import React, { useState } from "react";
import ErrorList from "../components/Dashboard/ErrorList";
import Summary from "../components/Dashboard/Summary";
import LogTree from "../components/Dashboard/LogTree";

interface Project {
  id: number;
  name: string;
}

const DashBoardPage = () => {
  return (
    <div className="bg-default">
      <div className="flex h-full w-full flex-col items-center justify-center text-xl text-black">
        <div className="box-border h-[60%] w-full rounded-xl p-3">
          <div className="flex h-full w-full">
            <Summary />
            {/* 로그 트리 */}
            <LogTree />
          </div>
        </div>
        <div className="box-border h-[40%] w-full flex-col rounded-xl px-3 pb-3">
          <div className="box-border flex h-full w-full flex-col rounded-xl bg-white p-3 shadow-md">
            <div className="h-1/6 w-full text-base font-bold">에러 리스트</div>
            <div className="h-5/6 w-full">
              <ErrorList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
