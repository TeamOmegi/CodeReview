import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useEditorStore from "../store/useEditorStore";
import NavBar from "../components/Common/NavBar";
import NoteCreate from "../components/SideComponent/NoteCreate";
import NoteEdit from "../components/SideComponent/NoteEdit";
import NoteLink from "../components/SideComponent/NoteLink";

const MainPage = () => {
  const { showNote, noteType, setShowNote, setNoteType } = useEditorStore();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (["/omegi", "/omegi/setting"].includes(location.pathname)) {
      if (showNote) setShowNote();
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   if (noteType === "edit") {
  //     //axios로 데이터 가져오기,
  //     //setContent에 담아주기
  //   }
  // }, [showNote, noteType]);

  return (
    <div className="flex h-svh w-screen overflow-hidden bg-main-100">
      <div className="h-full w-[15%] flex-shrink-0 text-white">
        <NavBar />
      </div>
      <div
        className={`box-border h-full ${showNote ? "w-5/12" : "w-[85%]"} p-5 transition-all duration-1000`}
      >
        <Outlet />
      </div>
      <div
        className={`box-border h-full ${showNote ? "w-5/12 pr-5" : "w-0"} overflow-hidden py-5 transition-all duration-1000`}
      >
        <div className="bg-default">
          {noteType === "create" && <NoteCreate />}
          {noteType === "edit" && <NoteEdit />}
          {noteType === "link" && <NoteLink />}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
