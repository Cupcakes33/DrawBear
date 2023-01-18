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

const AccoutDelete = () => {
  const [isLock, setisLock] = useState(false);
  return (
    <StContainer>
      <StHeader flex justify="flex-start">
        <Back />
        <h3>회원 탈퇴</h3>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={myProfileData.profile} alt="myProfileImg" />
        </div>
        <div className="warning">
          <h3>{myProfileData.name}님</h3>
          <h3>정말 떠나시겠어요? {": ("}</h3>
          <h5>내 프로필 사진, 댓글, 다이어리, 내용 등 모든 활동 정보가 삭제되며, 삭제된 데이터는 복구할 수 없어요.</h5>
        </div>
        <div className="delete-button">
          <button>네, 탈퇴할래요.</button>
        </div>
      </StMypageSection>
      <Footer />
    </StContainer>
  );
};

export default AccoutDelete;

const StMypageSection = styled(StSection)`
  padding-top: 20%;
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
  .warning {
    padding-top: 5%;
    width: 80%;
    word-break: keep-all;
  }
  .delete-button {
    padding-top: 100%;
    width: 80%;
    button {
      width: 100%;
      height: 5.5rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
`;
