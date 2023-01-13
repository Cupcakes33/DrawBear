import { useCallback, useState } from "react";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import { StContainer, StHeader, StSection } from "../UI/common";
import { useQuery } from "@tanstack/react-query";
import { mainApi } from "../apis/axios";

const Main = () => {
  const [isDiaryData, setIsDiaryData] = useState(false);

  const { data, isError, isLoading, error } = useQuery(["main"], mainApi.read);

  const errorHandler = useCallback(() => {
    const { status } = error?.response.request;
    if (status === 401) return <h2>로그인 후 이용 가능한 기능입니다.</h2>;
    else if (status === 404) return <h2>일기장이 존재하지 않습니다.</h2>;
    else return <h2>일기장 조회에 실패했습니다.</h2>;
  }, [error]);

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
          <StSection>{!isDiaryData ? <NoDiary /> : <DiaryList />}</StSection>
          <Footer></Footer>
        </StContainer>
      )}
    </>
  );
};

export default Main;
