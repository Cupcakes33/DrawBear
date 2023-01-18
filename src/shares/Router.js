import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";
import FullList from "../pages/FullList";
import Invite from "../pages/Invite";
import Setting from "../pages/Setting";
import Detail from "../pages/Detail";
import InfoEdit from "../pages/InfoEdit";
import HashTagInput from "../components/common/HashTagInput";
import UpdateDiary from "../pages/UpdateDiary";
import MyProfileEdit from "../pages/MyProfileEdit";
import MyPassword from "../pages/MyPassword";
import AccoutDelete from "../pages/AccoutDelete";

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
        <Route path="/detail" element={<Detail />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/setting/profileEdit" element={<MyProfileEdit />} />
        <Route path="/setting/infoEdit" element={<InfoEdit />} />
        <Route path="/setting/password" element={<MyPassword />} />
        <Route path="/setting/delete" element={<AccoutDelete />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
