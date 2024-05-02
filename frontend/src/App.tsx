import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import "./App.css";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
};

export default App;
