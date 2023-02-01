import styled from "styled-components";
import NavigateBtn from "../../components/common/NavigateBtn";
import { StContainer, StHeader, StSection } from "../../UI/common";

const Alarm = () => {
  return (
    <>
      <StContainer>
        <StHeader flex justify="flex-start">
          <NavigateBtn prev sizeType="header" link="/setting" />
          <h3>알림</h3>
        </StHeader>
        <AlarmListSection flex derection="column" justify="flex-start">
          <AlarmCard>
            <div>
              <h4>{"닉네임"} 님이 내 게시글에 댓글을 달았어요</h4>
              <span>날짜</span>
            </div>
          </AlarmCard>
          <AlarmCard>
            <div>
              <h4>{"닉네임"} 님이 내 게시글에 댓글을 달았어요</h4>
              <span>날짜</span>
            </div>
          </AlarmCard>
        </AlarmListSection>
      </StContainer>
    </>
  );
};

export default Alarm;

const AlarmListSection = styled(StSection)`
  margin-top: 2.1rem;
  overflow-x: hidden;
  span {
    margin-left: 0.8rem;
    font-weight: 700;
  }
`;

const AlarmCard = styled.div`
  width: 100%;
  height: 6rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  span {
    font-size: 1.2rem;
    color: #b1b1b1;
  }
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
  }
`;
