import { createBrowserRouter } from "react-router-dom";
import DashBoardPage from "../pages/DashBoardPage";
import AllNoteListPage from "../pages/AllNoteListPage";
import AllNoteDetailPage from "../pages/AllNoteDetailPage";
import MyNotePage from "../pages/MyNotePage";
import ErrorListPage from "../pages/ErrorListPage";
import SettingPage from "../pages/SettingPage";
import NoteGraph from "../components/MyNote/NoteGraph/NoteGraph";
import NoteList from "../components/MyNote/NoteList/NoteList";
import MainPage from "../pages/MainPage";
import IndexPage from "../pages/IndexPage";
import MyNoteDetailPage from "../pages/MyNoteDetailPage";
import LoginPage from "../pages/LoginPage";
import ErrorDetailPage from "../pages/ErrorDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
  {
    path: "/omegi",
    element: <MainPage />,
    children: [
      {
        path: "",
        element: <DashBoardPage />,
      },
      {
        path: "allNote",
        element: <AllNoteListPage />,
      },
      {
        path: "allNote/:noteId",
        element: <AllNoteDetailPage />,
      },
      {
        path: "myNote",
        element: <MyNotePage />,
        children: [
          {
            path: "graph",
            element: <NoteGraph />,
          },
          {
            path: "list",
            element: <NoteList />,
          },
        ],
      },
      {
        path: "myNote/:noteId",
        element: <MyNoteDetailPage />,
      },
      {
        path: "error",
        element: <ErrorListPage />,
      },
      {
        path: "error/:errorId",
        element: <ErrorDetailPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
]);

export default router;
