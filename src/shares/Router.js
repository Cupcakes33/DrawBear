import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Canvas from "../components/FabricCanvas/Canvas";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";
import FullList from "../pages/FullList";
import Invite from "../pages/Invite";
import Mypage from "../pages/Mypage";
import Detail from "../pages/Detail";
import Profile from "../pages/Profile";
import HashTagInput from "../components/common/HashTagInput";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/test" element={<HashTagInput />} />
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<CreateDiary />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/write" element={<Write />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<FullList />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
