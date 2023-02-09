import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import ErrorHandlerModal from "../components/common/modal/ErrorHandlerModal";
import TutorialModal from "../components/main/Tutorial/TutorialModal";
import Loading from "../components/common/Loading"

const Layout = React.lazy(() => import("../components/common/Layout"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Login = React.lazy(() => import("../pages/Login"));
const Write = React.lazy(() => import("../pages/Write"));
const Main = React.lazy(() => import("../pages/Main"));
const CreateDiary = React.lazy(() => import("../pages/CreateDiary"));
const FullList = React.lazy(() => import("../pages/FullList"));
const Invite = React.lazy(() => import("../pages/Invite"));
const Detail = React.lazy(() => import("../pages/Detail"));
const UpdatePost = React.lazy(() => import("../pages/UpdatePost"));
const UpdateDiary = React.lazy(() => import("../pages/UpdateDiary"));
const ButtonPreview = React.lazy(() => import("../pages/ButtonPreview"));
const Setting = React.lazy(() => import("../pages/Setting/Setting"));
const DiaryManage = React.lazy(() => import("../pages/Setting/DiaryManage"));
const MyProfileEdit = React.lazy(() => import("../pages/Setting/MyProfileEdit"));
const MyPassword = React.lazy(() => import("../pages/Setting/MyPassword"));
const AccoutDelete = React.lazy(() => import("../pages/Setting/AccoutDelete"));
const Alarm = React.lazy(() => import("../pages/Setting/Alarm"));
const InfoEdit = React.lazy(() => import("../pages/Setting/InfoEdit"));
const PrivateRoutes = React.lazy(() => import("./PrivateRoutes"));
const Chatting = React.lazy(() => import("../pages/Chatting"));

const ChatList = React.lazy(() => import("../pages/ChatList"));
const NoChatList = React.lazy(() => import("../pages/NoChatList"));
const KakaoLogin = React.lazy(() => import("../components/login/KakaoLogin"));

const Router = () => {
  const { isModal } = useSelector((state) => state.UISlice.errorModal);
  const { tutorialModal } = useSelector((state) => state.UISlice);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/api/auth/login/kakao/callback" element={<KakaoLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Main />} />
              <Route path="/chat" element={<Chatting />} />
              <Route path="/nochatlist" element={<NoChatList />} />
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/new" element={<CreateDiary />} />
              <Route path="/update/:id" element={<UpdateDiary />} />
              <Route path="/write/:id" element={<Write />} />
              <Route path="/list/:id" element={<FullList />} />
              <Route path="/invite/:id" element={<Invite />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/detail/:id/update" element={<UpdatePost />} />
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
        </Layout>
      </Suspense>
      {isModal && <ErrorHandlerModal showModal />}
      {tutorialModal && <TutorialModal showModal />}
    </BrowserRouter >
  );
};

export default Router;
