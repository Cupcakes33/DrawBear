import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { StSection } from "../../UI/common";
import { mainApi } from "../../apis/axios";
import DiaryManageCard from "../../components/Setting/DiaryManageCard";
import useDispatchHook from "../../hooks/useDispatchHook";
import Loading from "../../components/common/Loading";
import { Header } from "../../components/common/header/Header";

const DiaryManage = () => {
  const { openAlertModal } = useDispatchHook();

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <>
          <Header>
            <Header.Back link="/setting/">일기 설정</Header.Back>
          </Header>
          <DiaryManagementSection flex derection="column" justify="flex-start">
            <DiaryManageCard data={data} />
          </DiaryManagementSection>
        </>
      )}
    </>
  );
};

export default DiaryManage;

const DiaryManagementSection = styled(StSection)`
  position: absolute;
  margin-top: 1.5rem;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  span {
    margin-left: 0.8rem;
    font-weight: 700;
  }
`;
