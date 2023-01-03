import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Canvas from "../components/canvas/Canvas";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
