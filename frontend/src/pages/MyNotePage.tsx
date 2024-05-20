import React, { useState } from "react";
import NoteGraph from "../components/MyNote/NoteGraph/NoteGraph";
import NoteList from "../components/MyNote/NoteList/NoteList";
import ToggleContainer from "../components/MyNote/NoteList/ToggleContainer";
import Header from "../components/Common/Header";

const MyNotePage = () => {
  const [viewType, setViewType] = useState("list");

  return (
    <div className="bg-default box-border flex h-full w-full flex-col justify-between px-8 pb-8 pt-12">
      <div className="flex h-[18%] w-full flex-col justify-start">
        <Header title="📌 내 노트" />
        <div className="box-border flex items-end px-3 pt-1">
          <ToggleContainer setViewType={setViewType} viewType={viewType} />
        </div>
      </div>
      <div className="mx-1 flex h-[82%] w-full items-center justify-center">
        {viewType === "list" ? (
          <div className="border-1 flex h-full w-full items-center justify-center rounded-lg border-primary-100 text-black">
            <NoteList />
          </div>
        ) : (
          <div className="border-1 flex h-full w-full items-center justify-center rounded-lg border-primary-100 bg-main-100 text-white">
            <NoteGraph />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNotePage;
