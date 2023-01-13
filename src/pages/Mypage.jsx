import { StContainer, StSection, StHeader } from "../UI/common";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import ToggleBtn from "../components/common/ToggleBtn";
import { useState } from "react";

const myProfileData = {
  id: 1,
  name: "김철수",
  email: "abc@naver.com",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};

const Mypage = () => {
  const [isLock, setisLock] = useState(false);
  return (
    <StContainer>
      <StHeader flex justify="flex-start">
        <h3>마이페이지</h3>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={myProfileData.profile} alt="myProfileImg" />
          <span>{myProfileData.name}</span>
          <span>{myProfileData.email}</span>
        </div>
        <div className="configOptionWrapper">
          <div>알림 설정</div>
          <div>개인정보 설정</div>
          <div>
            암호 잠금 설정
            <ToggleBtn
              isChecked={isLock}
              ToggleBtnChangehandler={() => {
                setisLock(!isLock);
              }}
            />
          </div>

          <div>공지사항</div>
          <div>문의하기</div>
        </div>
      </StMypageSection>

      <Footer />
    </StContainer>
  );
};

export default Mypage;

const StMypageSection = styled(StSection)`
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
    }
    span {
      font-size: 14px;
      font-weight: 600;
      &:last-child {
        font-size: 12px;
        font-weight: 400;
        color: #d9d9d9;
      }
    }
  }
  .configOptionWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
