import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { VscBell } from "react-icons/vsc";
import { BsDot } from "react-icons/bs";
import { StSection, flex } from "../../UI/common";
import { alarmApi, mypageApi } from "../../apis/axios";
import Footer from "../../components/common/Footer";
import Buttons from "../../components/common/Button/Buttons";
import { Header } from "../../components/common/header/Header";
import SettingMenu from "../../components/Setting/SettingMenu";

const Setting = () => {
  const [myProfileData, setMyProfileData] = useState({});
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

  return (
    <>
      <Header>
        <Header.SpaceBetween>
          <Header.Back notBack>더보기</Header.Back>
          <Header.OnClickBtn color="#242424" onClick={() => navigate("/setting/alarm")}>
            <AlarmDiv>
              {alarmData?.Notifications?.length ? <BsDot className="alarm-dot" /> : null}
              <VscBell className="alarm" />
            </AlarmDiv>
          </Header.OnClickBtn>
        </Header.SpaceBetween>
      </Header>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <div onClick={() => navigate("/setting/profileEdit")}>
            <img src={profileImg} alt="myProfileImg" />
            <div className="pencilIcon-box">
              <Buttons.ProfileSetting />
            </div>
          </div>
          <span>{myProfileData?.nickname}</span>
          <span>{myProfileData?.email}</span>
        </div>
        <SettingMenu />
      </StMypageSection>
      <Footer />
    </>
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
      ${flex}
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
