import styled from "styled-components";
import { flex } from "../UI/common";
import noChatListBear from "../assets/images/noChatListBear.webp"; //혜민님 그림 이거 쓰세요
const NoChatList = ({ h3txt = "아직 연결된 다이어리가 없어요" }) => {
  return (
    <>
      <StNoChatContainer>
        <StWrapper>
          <h3>{h3txt}</h3>
          <img src={noChatListBear} alt="다이어리 없을 때 곰돌이 그림" />
        </StWrapper>
      </StNoChatContainer>
    </>
  );
};
export default NoChatList;

const StNoChatContainer = styled.div`
  & div {
    height: 85vh;
    display: flex;
    justify-content: center;
  }
`;
const StWrapper = styled.div`
  ${flex("", "", "column")}
  .addDiary {
    ${flex("", "", "column")}
  }
  & h3 {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  & img {
    width: 10.5rem;
    height: 11.5rem;
  }
`;
