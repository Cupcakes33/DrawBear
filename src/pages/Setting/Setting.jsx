import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { VscBell } from "react-icons/vsc";
import { BsDot } from "react-icons/bs";
import { StContainer, StSection, StHeader } from "../../UI/common";
import { alarmApi, mypageApi } from "../../apis/axios";
import NavigateBtn from "../../components/common/NavigateBtn";
import Footer from "../../components/common/Footer";
import AlertModal from "../../components/common/modal/AlertModal";
import useDispatchHook from "../../hooks/useDispatchHook";
import { useDispatch } from "react-redux";
import { __TutorialModal } from "../../redux/modules/UISlice";
import { AiOutlineSetting } from "react-icons/ai";
import Buttons from "../../components/common/Button/Buttons";

const Setting = () => {
  const [myProfileData, setMyProfileData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: alarmData } = useQuery(["allAlarm"], alarmApi.read, {
    refetchInterval: 3000,
  });
  const { data } = useQuery(["setting"], mypageApi.read);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    setProfileImg(data?.userInfo.profileImg);
    setMyProfileData(data?.userInfo);
  }, [data]);

  const { openAlertModal } = useDispatchHook();

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    openAlertModal({ bigTxt: "로그아웃되었습니다.", move: "/login" });
  };

  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <h3>더보기</h3>
        <AlarmDiv onClick={() => navigate("/setting/alarm")}>
          {alarmData?.Notifications?.length ? (
            <BsDot className="alarm-dot" />
          ) : null}
          <VscBell className="alarm" />
        </AlarmDiv>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <div onClick={() => navigate("/setting/profileEdit")}>
            <img src={profileImg} alt="myProfileImg" />
            <div className="pencilIcon-box">
              <Buttons.ProfileSetting/>
            </div>
          </div>
          <span>{myProfileData?.nickname}</span>
          <span>{myProfileData?.email}</span>
        </div>
        <ConfigOptionWrapper>
          <ConfigOptionBox onClick={() => navigate("/setting/diaryManage")}>
            일기 설정
            <NavigateBtn />
          </ConfigOptionBox>
          <ConfigOptionBox onClick={() => navigate("/setting/infoEdit")}>
            개인정보 수정
            <NavigateBtn />
          </ConfigOptionBox>
          <AlertModal
            select
            bigTxt={"로그아웃하시겠어요?"}
            smallTxt={"다시 로그인해서 이용할 수 있어요."}
            move={"/login"}
            onClick={onLogoutHandler}
          >
            <ConfigOptionBox className="divInWrapper">로그아웃</ConfigOptionBox>
          </AlertModal>
          <div></div>
          <AlertModal
            bigTxt={"공지사항이 없어요!"}
            smallTxt={"그냥 허전해서 달아놓아보았어요!"}
          >
            <ConfigOptionBox>
              공지사항
              <NavigateBtn link={""} />
            </ConfigOptionBox>
          </AlertModal>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScZLlTNYpVAHXxnPFuSYZytsVJXl9SD_Cv6q48BUD507rxJ9A/viewform"
            rel="noopener noreferrer"
            target="_blank"
          >
            <ConfigOptionBox>
              문의하기
              <NavigateBtn link={""} />
            </ConfigOptionBox>
          </a>
          <ConfigOptionBox onClick={() => dispatch(__TutorialModal(true))}>
            튜토리얼 다시보기
            <NavigateBtn link={""} />
          </ConfigOptionBox>
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
`;

const ConfigOptionBox = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
