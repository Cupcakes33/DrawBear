import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StContainer, StHeader, StSection } from "../UI/common";

const Invite = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <StHeader flexCenter>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </button>
        <h3>같이 쓰는 멤버 초대</h3>
      </StHeader>
      <StSection>
        <input></input>
      </StSection>
    </StContainer>
  );
};

export default Invite;

const StInviteSection = styled(StSection)`

`;
