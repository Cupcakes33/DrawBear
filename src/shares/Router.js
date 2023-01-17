import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";
import FullList from "../pages/FullList";
import Invite from "../pages/Invite";
import Mypage from "../pages/Mypage";
import Detail from "../pages/Detail";
import Profile from "../pages/Profile";
import HashTagInput from "../components/common/HashTagInput";
import UpdateDiary from "../pages/UpdateDiary";
import ProfileUpdate from "../pages/ProfileUpdate";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/test" element={<HashTagInput />} />
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<CreateDiary />} />

        <Route path="/update">
          <Route path=":id" element={<UpdateDiary />} />
        </Route>

        <Route path="/write" element={<Write />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list">
          <Route path=":id" element={<FullList />} />
        </Route>
        <Route path="/invite" element={<Invite />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
