import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import DiaryDeleteModal from "../../components/Setting/DiaryDeleteModal";
import NavigateBtn from "../../components/common/NavigateBtn";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import { DisplayDiv, StContainer, StHeader, StSection } from "../../UI/common";
import { mainApi } from "../../apis/axios";
import { diaryData } from "../../redux/modules/diarySlice";
import { ErrorModal } from "../../redux/modules/UISlice";

const DiaryManage = () => {
  const dispatch = useDispatch();

  const {
    data = [],
    isError,
    isLoading,
    error,
  } = useQuery(["main"], mainApi.read, {
    onError: (error) => {
      const { status } = error?.response.request;
      if (status === 401) dispatch((ErrorModal({ isModal: true, bigTxt: "로그인 후 이용해주세요.", move: "/login" })));
      else if (status === 400) dispatch((ErrorModal({ isModal: true, bigTxt: "일기장 조회에 실패했습니다.", move: "/login" })));
    },
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <StContainer>
          <StHeader flex justify="flex-start">
            <NavigateBtn prev sizeType="header" link="/setting/" />
            <h3>일기 설정</h3>
          </StHeader>
          <DiaryManagementSection flex derection="column" justify="flex-start">
            {data.diaries?.map((diary) => {
              const { diaryId, diaryName, invitedNickname, invitedProfileImg } = diary;
              return diary.couple === 0 ? (
                <SoloDiary key={`diary_${diaryId}`}>
                  <h1>{diaryName}</h1>
                  <DisplayDiv flex justify="space-between">
                    <div>
                      <span>나만의 그림일기!</span>
                    </div>
                    <div>
                      <DiaryDeleteModal bigTxt={`${diaryName}을(를) 삭제하시겠어요?`}>
                        <Button size="small" onClick={() => dispatch(diaryData(diaryId))}>
                          삭제하기
                        </Button>
                      </DiaryDeleteModal>
                    </div>
                  </DisplayDiv>
                </SoloDiary>
              ) : (
                <CoupleDiary key={`diary_${diaryId}`}>
                  <h1>{diaryName}</h1>
                  <DisplayDiv flex justify="space-between">
                    <div>
                      {invitedNickname === null ? (
                        <span>수락 대기중...</span>
                      ) : (
                        <>
                          <img src={invitedProfileImg} alt="프사" />
                          <span>{invitedNickname}님과 함께써요</span>
                        </>
                      )}
                    </div>
                    <div>
                      <DiaryDeleteModal bigTxt={`${diaryName}을(를) 삭제하시겠어요?`} diaryId={diaryId}>
                        <Button size="small" onClick={() => dispatch(diaryData(diaryId))}>
                          탈퇴하기
                        </Button>
                      </DiaryDeleteModal>
                    </div>
                  </DisplayDiv>
                </CoupleDiary>
              );
            })}
          </DiaryManagementSection>
        </StContainer>
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

const Diary = styled.div`
  width: 100%;
  height: 10.2rem;
  padding: 2rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-bottom: 2rem;
  button {
    color: #ff7070;
  }
`;

const CoupleDiary = styled(Diary)``;

const SoloDiary = styled(Diary)``;
