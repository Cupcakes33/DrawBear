import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { mainApi } from "../apis/axios";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import BookmarkTab from "../components/main/BookmarkTab";
import useDispatchHook from "../hooks/useDispatchHook";
import LogoHeader from "../components/common/header/LogoHeader";

const Main = () => {
  const { diaryTypes } = useSelector((state) => state.diarySlice);
  const { openAlertModal } = useDispatchHook();

  const { data = [], isLoading } = useQuery(["main"], mainApi.read, {
    onError: (error) => {
      const { status } = error?.response.request;
      if (status === 400)
        openAlertModal({
          bigTxt: "다이어리 조회에 실패했습니다.",
          move: "/login",
        });
      else if (status === 404)
        openAlertModal({
          bigTxt: "다이어리 조회에 실패했습니다.",
          move: "/login",
        });
    },
  });

  const diaryType = (diaries) => {
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
  };

  return (
    <>
      <LogoHeader />
      {diaryType(data?.diaries)?.length === 0 ? (
        <NoDiary />
      ) : diaryTypes.bookmark ? (
        <BookmarkTab diaryData={diaryType(data?.diaries)} />
      ) : (
        <DiaryList diaryData={diaryType(data?.diaries)} />
      )}
      <Footer />
    </>
  );
};

export default Main;
