import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Main from "../pages/Main";
import CreateDiary from "../pages/CreateDiary";
import FullList from "../pages/FullList";
import Invite from "../pages/Invite";
import Detail from "../pages/Detail";

import UpdatePost from "../pages/UpdatePost";
import UpdateDiary from "../pages/UpdateDiary";
import ButtonPreview from "../pages/ButtonPreview";
import Setting from "../pages/Setting/Setting";
import DiaryManage from "../pages/Setting/DiaryManage";
import MyProfileEdit from "../pages/Setting/MyProfileEdit";
import MyPassword from "../pages/Setting/MyPassword";
import AccoutDelete from "../pages/Setting/AccoutDelete";
import Alarm from "../pages/Setting/Alarm";
import InfoEdit from "../pages/Setting/InfoEdit";
import PrivateRoutes from "./PrivateRoutes";
import Chatting from "../pages/Chatting";
import { useSelector } from "react-redux";
import ErrorHandlerModal from "../components/common/modal/ErrorHandlerModal";
import ChatList from "../pages/ChatList";
import NoChatList from "../pages/NoChatList";
import KakaoLogin from "../components/socialLogin/KakaoLogin";
import NaverLogin from "../components/socialLogin/NaverLogin";


const Router = () => {
  const { isModal } = useSelector((state) => state.UISlice.errorModal);

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/api/auth/login/kakao/callback" element={<KakaoLogin />} />
        <Route path="/api/auth/login/naver/callback" element={<NaverLogin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Main />} />
          <Route path="/chat" element={<Chatting />} />
          <Route path="/nochatlist" element={<NoChatList />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/new" element={<CreateDiary />} />
          <Route path="/update">
            <Route path=":id" element={<UpdateDiary />} />
          </Route>
          <Route path="/write">
            <Route path=":id" element={<Write />} />
          </Route>

          <Route path="/list">
            <Route path=":id" element={<FullList />} />
          </Route>
          <Route path="/invite">
            <Route path=":id" element={<Invite />} />
          </Route>
          <Route path="/detail">
            <Route path=":id" element={<Detail />} />
            <Route path=":id/update" element={<UpdatePost />} />
          </Route>
          <Route path="/buttonpreview" element={<ButtonPreview />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/diaryManage" element={<DiaryManage />} />
          <Route path="/setting/profileEdit" element={<MyProfileEdit />} />
          <Route path="/setting/infoEdit/" element={<InfoEdit />} />
          <Route path="/setting/infoEdit/password" element={<MyPassword />} />
          <Route path="/setting/delete" element={<AccoutDelete />} />
          <Route path="/setting/alarm" element={<Alarm />} />
        </Route>
        
      </Routes>
      {isModal && <ErrorHandlerModal showModal />}
    </BrowserRouter>
  );
};

export default Router;
