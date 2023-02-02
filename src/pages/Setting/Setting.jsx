import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { VscBell } from "react-icons/vsc";
import { BsDot } from "react-icons/bs";
import { StContainer, StSection, StHeader } from "../../UI/common";
import { mypageApi } from "../../apis/axios";
import NavigateBtn from "../../components/common/NavigateBtn";
import Footer from "../../components/common/Footer";

const Setting = () => {
  const [myProfileData, setMyProfileData] = useState({});
  const navigate = useNavigate();

  const { data } = useQuery(["setting"], mypageApi.read);
  const [profileImg, setProfileImg] = useState("");
  useEffect(() => {
    setProfileImg(data?.userInfo.profileImg);
    setMyProfileData(data?.userInfo);
  }, [data]);

  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <h3>더보기</h3>
        <AlarmDiv onClick={() => navigate("/setting/alarm")}>
          <BsDot className="alarm-dot" />
          <VscBell className="alarm" />
        </AlarmDiv>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <div onClick={() => navigate("/setting/profileEdit")}>
            <img src={profileImg} alt="myProfileImg" />
            <div className="pencilIcon-box">
              <TiPencil />
            </div>
          </div>
          <span>{myProfileData?.nickname}</span>
          <span>{myProfileData?.email}</span>
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

const AlarmDiv = styled.div`
  cursor: pointer;
  .alarm {
    font-size: 2.5rem;
  }
  .alarm-dot {
    font-size: 3rem;
    color: red;
    position: fixed;
    top: 0.2%;
    right: calc(50% - 17.2rem);
  }
`;

const StMypageSection = styled(StSection)`
  background-color: var(--main_bg);
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
      top: 14rem;
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
