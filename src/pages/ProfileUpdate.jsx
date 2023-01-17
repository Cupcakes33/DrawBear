import { StContainer, StSection, StHeader } from "../UI/common";
import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import ToggleBtn from "../components/common/ToggleBtn";
import NavigateBtn from "../components/common/NavigateBtn";

const myProfileData = {
  id: 1,
  name: "김철수",
  email: "abc@naver.com",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};

const ProfileUpdate = () => {
  const [isLock, setisLock] = useState(false);
  return (
    <StContainer>
      <StHeader flex justify="flex-start">
        <h3>마이페이지</h3>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={myProfileData.profile} alt="myProfileImg" />
        </div>
        <div>
          <span>{myProfileData.email}</span>
        </div>
        <div className="nickName-box">
          <span>닉네임</span>
          <input />
        </div>
      </StMypageSection>
      <Footer />
    </StContainer>
  );
};

export default ProfileUpdate;

const StMypageSection = styled(StSection)`
  padding-top: 20%;
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .nickName-box {
    padding: 10%;
    display: grid;
    width: 90%;
    gap: 1rem;
  }
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
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
