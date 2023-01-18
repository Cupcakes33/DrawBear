import { StContainer, StSection, StHeader } from "../UI/common";
import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import ToggleBtn from "../components/common/ToggleBtn";
import NavigateBtn from "../components/common/NavigateBtn";
import Back from "../components/header/Back";

const myProfileData = {
  id: 1,
  name: "김철수",
  email: "abc@naver.com",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};

const MyPassword = () => {
  const [isLock, setisLock] = useState(false);
  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <div>
          <NavigateBtn prev sizeType="header" />
          <h3>비밀번호 변경</h3>
        </div>
        <div>
          <h3>완료</h3>
        </div>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="PW-box current">
          <span>기존 비밀번호</span>
          <input />
        </div>
        <div className="PW-box changing">
          <span>새로 변경할 비밀번호</span>
          <input />
          <input />
        </div>
      </StMypageSection>
      <Footer />
    </StContainer>
  );
};

export default MyPassword;

const StMypageSection = styled(StSection)`
  padding-top: 20%;
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .PW-box {
    display: grid;
    width: 90%;
    gap: 1rem;
  }
  .current {
    padding: 10%;
  }
  .changing {
    padding: 10%;
    margin-top: -4rem;
  }

  span {
    font-size: 1.7rem;
    font-weight: 700;
  }
  input {
    height: 4.3rem;
    padding: 0 1rem;
  }
`;
