import { StContainer, StSection, StHeader } from "../UI/common";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import NavigateBtn from "../components/common/NavigateBtn";
import { VscBell } from "react-icons/vsc";

const myProfileData = {
  id: 1,
  name: "김철수",
  email: "abc@naver.com",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};

const Mypage = () => {
  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <h3>설정</h3>
        <VscBell fontSize="1.4em" />
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={myProfileData.profile} alt="myProfileImg" />
          <span>{myProfileData.name}</span>
          <span>{myProfileData.email}</span>
        </div>
        <div className="configOptionWrapper">
          <div>
            일기 설정
            <NavigateBtn link={""} />
          </div>
          <div>
            개인정보 수정
            <NavigateBtn link={"/profile"} />
          </div>
          <div></div>
          <div>
            공지사항
            <NavigateBtn link={""} />
          </div>
          <div>
            문의하기
            <NavigateBtn link={""} />
          </div>
        </div>
      </StMypageSection>
      <Footer />
    </StContainer>
  );
};

export default Mypage;

const StMypageSection = styled(StSection)`
  padding-top: 20%;
  overflow-x: hidden;
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    img {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
    }
    span {
      font-size: 2.8rem;
      font-weight: 600;
      &:last-child {
        font-size: 1.7rem;
        font-weight: 400;
        color: #8c8c8c;
      }
    }
  }
  .configOptionWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    div {
      font-size: 1.7rem;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
