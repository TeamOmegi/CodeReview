import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useEditorStore from "../store/useEditorStore";
import NavBar from "../components/Common/NavBar";
import NoteCreate from "../components/SideComponent/NoteCreate";
import NoteEdit from "../components/SideComponent/NoteEdit";
import NoteLink from "../components/SideComponent/NoteLink";
import useErrorStore from "../store/useErrorStore";
interface Error {
  errorId: number;
  serviceId: number;
  projectId: number;
  solved: boolean;
  type: string;
  time: string;
}
const MainPage = () => {
  const { showNote, noteType, setShowNote } = useEditorStore();
  const { setErrorCreate, setIsNewError, setErrorMap } = useErrorStore();
  const location = useLocation();

  useEffect(() => {
    //SSE연결 로직
    const eventSource = new EventSource(
      "https://k10a308.p.ssafy.io/api/errors/real-time/subscription",
    );

    eventSource.addEventListener("REAL_TIME_ERROR", (event) => {
      const errorData: Error = JSON.parse(event.data); // 서버에서 받은 데이터 파싱
      setErrorCreate(errorData);
      setErrorMap(errorData.serviceId, "up");
      handleNewError();
    });

    eventSource.onerror = () => {
      eventSource.close(); //연결 끊기
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (
      ["/omegi", "/omegi/setting", "/omegi/", "/omegi/setting/"].includes(
        location.pathname,
      ) ||
      /^\/omegi\/myNote\/\d+$/.test(location.pathname)
    ) {
      if (showNote) setShowNote();
    }

    if (location.pathname === "/omegi/" || location.pathname === "/omegi") {
      setIsNewError(false);
    }
  }, [location.pathname]);

  const handleNewError = () => {
    console.log("비상!! 비상!!", location.pathname);
    if (location.pathname === "/omegi/" || location.pathname === "/omegi") {
      setIsNewError(false);
    } else {
      setIsNewError(true);
    }
  };

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
