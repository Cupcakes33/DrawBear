import { StContainer, StSection, StHeader } from "../../UI/common";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import NavigateBtn from "../../components/common/NavigateBtn";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { TiPencil } from "react-icons/ti";

const myProfileData = {
  id: 1,
  name: "김철수",
  email: "abc@naver.com",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};

const Setting = () => {
  const navigate = useNavigate();

  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <h3>설정</h3>
        <VscBell fontSize="1.4em" onClick={() => navigate("/setting/alarm")} />
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <div onClick={() => navigate("/setting/profileEdit")}>
            <img src={myProfileData.profile} alt="myProfileImg" />
            <div className="pencilIcon-box">
              <TiPencil />
            </div>
          </div>
          <span>{myProfileData.name}</span>
          <span>{myProfileData.email}</span>
        </div>
        <ConfigOptionWrapper>
          <div>
            일기 설정
            <NavigateBtn link={"/setting/diaryManage"} />
          </div>
          <div>
            개인정보 수정
            <NavigateBtn link={"/setting/infoEdit"} />
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
        </ConfigOptionWrapper>
      </StMypageSection>
      <Footer />
    </StContainer>
  );
};

export default Setting;

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
    .pencilIcon-box {
      width: 3.4rem;
      height: 3.4rem;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: 17%;
      left: 55%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div {
      cursor: pointer;
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
`;

const ConfigOptionWrapper = styled.div`
  width: 90%;
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
`;
