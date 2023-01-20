import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes"
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";
import FullList from "../pages/FullList";
import Invite from "../pages/Invite";
import Detail from "../pages/Detail";
import HashTagInput from "../components/common/HashTagInput";
import UpdateDiary from "../pages/UpdateDiary";
import ButtonPreview from "../pages/ButtonPreview";
import Setting from "../pages/Setting/Setting";
import DiaryManage from "../pages/Setting/DiaryManage";
import MyProfileEdit from "../pages/Setting/MyProfileEdit";
import MyPassword from "../pages/Setting/MyPassword";
import AccoutDelete from "../pages/Setting/AccoutDelete";
import Alarm from "../pages/Setting/Alarm";
import InfoEdit from "../pages/Setting/InfoEdit";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/test" element={<HashTagInput />} />
          <Route path="/" element={<Main />} />
          <Route path="/new" element={<CreateDiary />} />
          <Route path="/update">
            <Route path=":id" element={<UpdateDiary />} />
          </Route>
          <Route path="/write">
            <Route path=":id" element={<Write />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list">
            <Route path=":id" element={<FullList />} />
          </Route>
          <Route path="/invite" element={<Invite />} />
          <Route path="/detail">
            <Route path=":id" element={<Detail />} />
          </Route>
        </Route>
        <Route path="/invite" element={<Invite />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/buttonpreview" element={<ButtonPreview />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/setting/diaryManage" element={<DiaryManage />} />
        <Route path="/setting/profileEdit" element={<MyProfileEdit />} />
        <Route path="/setting/infoEdit/" element={<InfoEdit />} />
        <Route path="/setting/infoEdit/password" element={<MyPassword />} />
        <Route path="/setting/delete" element={<AccoutDelete />} />
        <Route path="/setting/alarm" element={<Alarm />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
