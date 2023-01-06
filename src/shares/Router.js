import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import FabricCanvas from "../components/FabricCanvas/FabricCanvas";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FabricCanvas />} />
        {/* <Route path="/" element={<Canvas />} /> */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/" element={<Signup />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
