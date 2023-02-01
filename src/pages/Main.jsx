import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { StContainer, StHeader } from "../UI/common";
import { useSelector } from "react-redux";
import { mainApi } from "../apis/axios";
import styled from "styled-components";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import BookmarkTab from "../components/main/BookmarkTab";
import useDispatchHook from "../hooks/useDispatchHook";
import loadingBear from "../assets/images/loadingBear.webp";
import Loading from "../components/common/Loading";

const Main = () => {
  const { diaryTypes } = useSelector((state) => state.diarySlice);
  const { openAlertModal } = useDispatchHook();
  const queryClient = useQueryClient();

  const {
    data = [],
    isError,
    isLoading,
    error,
  } = useQuery(["main"], mainApi.read, {
    onError: (error) => {
      const { status } = error?.response.request;
      if (status === 400) openAlertModal({ bigTxt: "일기장 조회에 실패했습니다.", move: "/login" });
    },
  });

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
    queryClient.setQueryData(["footerIcons"], "solo");
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <>
          <StContainer bgColor="#F8F8F8">
            <StHeader flex>
              <LogoImg src={loadingBear} alt="로고 곰돌이" />
            </StHeader>
            {diaryType(data?.diaries)?.length === 0 ? (
              <NoDiary />
            ) : diaryTypes.bookmark === 1 ? (
              <BookmarkTab diaryData={diaryType(data?.diaries)} />
            ) : (
              <DiaryList diaryData={diaryType(data?.diaries)} />
            )}
            <Footer />
          </StContainer>
        </>
      )}
    </>
  );
};

export default Main;

const LogoImg = styled.img`
  width: 5.2rem;
  padding-top: 10%;
`;
