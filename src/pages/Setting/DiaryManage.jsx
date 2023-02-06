import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { StHeader, StSection } from "../../UI/common";
import { mainApi } from "../../apis/axios";
import DiaryManageCard from "../../components/Setting/DiaryManageCard";
import useDispatchHook from "../../hooks/useDispatchHook";
import NavigateBtn from "../../components/common/NavigateBtn";
import Loading from "../../components/common/Loading";

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
          <StHeader flex justify="flex-start">
            <NavigateBtn prev sizeType="header" link="/setting/" />
            <h3>일기 설정</h3>
          </StHeader>
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
  margin-top: 2.1rem;
  overflow-x: hidden;
  span {
    margin-left: 0.8rem;
    font-weight: 700;
  }
`;
