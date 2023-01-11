import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import FabricCanvas from "../components/FabricCanvas/FabricCanvas";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";
import FullList from "../pages/FullList";
import Header from "../UI/Header";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<CreateDiary />} />
        {/* <Route path="/" element={<Canvas />} /> */}

        <Route path="/write" element={<Write />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<FullList />} />
        <Route path="/detail" element={<Detail />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
