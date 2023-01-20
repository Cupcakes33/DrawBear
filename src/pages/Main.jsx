import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import { StContainer, StHeader } from "../UI/common";
import { mainApi } from "../apis/axios";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../redux/modules/UISlice";
import Alert from "../components/common/modal/Alert";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { diaryTypes } = useSelector((state) => state.diarySlice);
  const { isModal } = useSelector((state) => state.UISlice);
  const dispatch = useDispatch();

  const {
    data = [],
    isError,
    isLoading,
    error,
  } = useQuery(["main"], mainApi.read, {
    onError: (error) => {
      const { status } = error?.response.request;
      if (status === 401) {
        dispatch(showModal({ isModal: true, content: "로그인 후 이용해주세요.", move: "/login" }));
      } else if (status === 400)
        return dispatch(showModal({ isModal: true, content: "일기장 조회에 실패했습니다.", move: "/login" }));
    },
  });
  const { diaries } = data;

  const diaryType = useCallback(
    (diaries) => {
      if (diaryTypes.couple === 0) {
        const soloDiary = diaries?.filter((diary) => diary.couple === 0);
        return soloDiary;
      } else if (diaryTypes.couple === 1) {
        const coupleDiary = diaries?.filter((diary) => diary.couple === 1);
        return coupleDiary;
      } else if (diaryTypes.bookmark === 1) {
        const favoriteDiary = diaries?.filter((diary) => diary.bookmark === 1);
        return favoriteDiary;
      }
    },
    [diaryTypes]
  );

  useEffect(() => {
    localStorage.setItem("footerIcons", "solo");
  }, []);

  return (
    <>
      {isModal && <Alert />}
      {isLoading ? (
        <h2>로딩 중...</h2>
      ) : isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <StContainer bgColor="#F8F8F8">
          <StHeader flex>
            <h1>LOGO</h1>
          </StHeader>
          {diaryType(diaries)?.length === 0 ? <NoDiary /> : <DiaryList diaryData={diaryType(diaries)} />}
          <Footer />
        </StContainer>
      )}
    </>
  );
};

export default Main;
