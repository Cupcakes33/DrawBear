import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import { StContainer, StHeader } from "../UI/common";
import { mainApi } from "../apis/axios";
import { useSelector } from "react-redux";

const Main = () => {
  const { diaryTypes } = useSelector((state) => state.diarySlice);
  const queryClient = useQueryClient();

  const diaryData = queryClient?.getQueryData(["main"])?.diaries;

  const { data, isError, isLoading, error } = useQuery(["main"], mainApi.read);

  const errorHandler = useCallback(() => {
    const { status } = error?.response.request;
    if (status === 401) return <h2>로그인 후 이용 가능한 기능입니다.</h2>;
    else if (status === 400) return <h2>일기장 조회에 실패했습니다.</h2>;
  }, [error]);

  const diaryType = useCallback(
    (diaryData) => {
      if (diaryTypes.couple === 0) {
        const soloDiary = diaryData.filter((diary) => diary.couple === 0);
        return soloDiary;
      } else if (diaryTypes.couple === 1) {
        const coupleDiary = diaryData.filter((diary) => diary.couple === 1);
        return coupleDiary;
      } else if (diaryTypes.bookmark === 1) {
        const favoriteDiary = diaryData.filter((diary) => diary.bookmark === 1);
        return favoriteDiary;
      }
    },
    [diaryTypes, diaryData]
  );

  return (
    <>
      {isLoading ? (
        <h2>로딩 중...</h2>
      ) : isError ? (
        errorHandler()
      ) : (
        <StContainer>
          <StHeader flexCenter>
            <h1>LOGO</h1>
          </StHeader>
          <>{diaryType(diaryData) === [] ? <NoDiary /> : <DiaryList diaryData={diaryType(diaryData)} />}</>
          <Footer></Footer>
        </StContainer>
      )}
    </>
  );
};

export default Main;
