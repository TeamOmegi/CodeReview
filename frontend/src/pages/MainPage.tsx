import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/NavBar";

const MainPage = () => {
  return (
    <div className="flex h-svh w-screen bg-base text-white">
      <NavBar />
      <Outlet />
    </div>
  );
};
export default MainPage;
