import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import FabricCanvas from "../components/FabricCanvas/FabricCanvas";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<CreateDiary />} />
        {/* <Route path="/" element={<Canvas />} /> */}
        <Route path="/write" element={<Write />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
