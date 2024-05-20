import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import "./App.css";
import { useEffect } from "react";
// import { useAutoAccessToken } from "./api/userAxios";

const App = () => {
  useEffect(() => {
    // useAutoAccessToken();
  }, []);
  return (
    <div>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
};

export default App;
