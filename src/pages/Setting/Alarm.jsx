import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { alarmApi } from "../../apis/axios";
import Buttons from "../../components/common/Button/Buttons";
import Loading from "../../components/common/Loading";
import NavigateBtn from "../../components/common/NavigateBtn";
import { StContainer, StHeader, StSection } from "../../UI/common";

const Alarm = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery(["Allalarm"], alarmApi.read);
  useEffect(() => {}, [data]);
  return (
    <>
      {isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <StContainer>
          <StHeader flex justify="flex-start">
            <NavigateBtn prev sizeType="header" link="/setting" />
            <h3>알림</h3>
          </StHeader>
          {data.Notifications?.map((alarmdata) => {
            const {
              audienceId,
              audienceNickname,
              code,
              confirm,
              createdAt,
              diaryId,
              diaryName,
              nickname,
              notificationId,
            } = alarmdata;
            return (
              <AlarmContainer>
                <AlarmTxtContainer>
                  <div className="AlarmTxtContainer">
                    {audienceNickname}님이 {nickname} 님께 공유다이어리에
                    초대하셨습니다.
                  </div>
                  <div className="time_container">1분전</div>
                </AlarmTxtContainer>
                <AlarmBtnContainer>
                  <Buttons.Option>수락</Buttons.Option>
                  <Buttons.Option negative>거절</Buttons.Option>
                </AlarmBtnContainer>
              </AlarmContainer>
            );
          })}
        </StContainer>
      )}
    </>
  );
};

export default Alarm;
const AlarmTxtContainer = styled.div`
  display: flex;
  align-items: center;
  & .AlarmTxtContainer {
    font-size: 1.4rem;
    padding: 2rem 1rem 0rem 2rem;
    max-width: 31rem;
  }
  & .time_container {
    font-size: 0.1rem;
    color: #b3b3b3;
    position: absolute;
    right: 2rem;
  }
`;
const AlarmBtnContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  gap: 2rem;
`;
const AlarmContainer = styled.div`
  width: 100%;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  &:hover {
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.36);
  }
`;
