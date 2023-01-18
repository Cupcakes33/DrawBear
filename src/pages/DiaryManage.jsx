import styled from "styled-components";
import NavigateBtn from "../components/common/NavigateBtn";
import { DisplayDiv, StContainer, StHeader, StSection } from "../UI/common";
import Button from "../components/common/Button";

const DiaryManage = () => {
  return (
    <>
      <StContainer>
        <StHeader flex justify="flex-start">
          <NavigateBtn prev sizeType="header" />
          <h3>일기 설정</h3>
        </StHeader>
        <DiaryManagementSection flex derection="column" justify="flex-start">
          <CoupleDiary>
            <h1>D조 3조팀 다여리</h1>
            <DisplayDiv flex justify="space-between">
              <div>
                <img src="" alt="프사" />
                <span>{"닉네임"}님과 함께써요</span>
              </div>
              <div>
                <Button size="small">탈퇴하기</Button>
              </div>
            </DisplayDiv>
          </CoupleDiary>
          <SoloDiary>
            <h1>데일리 그림일기</h1>
            <DisplayDiv flex justify="space-between">
              <div>
                <span>나만의 그림일기!</span>
              </div>
              <div>
                <Button size="small">삭제하기</Button>
              </div>
            </DisplayDiv>
          </SoloDiary>
        </DiaryManagementSection>
      </StContainer>
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
