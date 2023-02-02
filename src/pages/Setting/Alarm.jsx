import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import * as timeAgo from "timeago.js";
import ko from "timeago.js/lib/lang/ko";
import { alarmApi } from "../../apis/axios";
import Buttons from "../../components/common/Button/Buttons";
import NavigateBtn from "../../components/common/NavigateBtn";
import { StContainer, StHeader } from "../../UI/common";
import { useNavigate } from "react-router-dom";

const Alarm = () => {
  timeAgo.register("ko", ko);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data = [], isError, error } = useQuery(["Allalarm"], alarmApi.read);
  const { mutate: alarmAddMutate } = useMutation(alarmApi.patch, {
    onSuccess: () => {
      queryClient.setQueryData(["footerIcons"], "couple");
      navigate("/");
    },
  });
  const { mutate: alarmDeleteMutate } = useMutation(alarmApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allalarm"] });
    },
  });
  const diaryJoinOnclickHandle = (diaryId, notificationId) => {
    const diaryjoinData = { diaryId, notificationId };
    alarmAddMutate(diaryjoinData);
  };
  const diaryCancelOnclickHandle = (notificationId) => {
    alarmDeleteMutate(notificationId);
  };

  useEffect(() => {}, [data]);
  return (
    <>
      {isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <StContainer bgColor="#f8f8f8">
          <StHeader flex justify="flex-start">
            <NavigateBtn prev sizeType="header" link="/setting" />
            <h3>알림</h3>
          </StHeader>
          {data.Notifications?.map((alarmdata, index) => {
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
              <AlarmContainer key={index}>
                <AlarmTxtContainer>
                  <div className="AlarmTxtContainer">
                    {audienceNickname}님이 {nickname} 님께 공유다이어리에 초대하셨습니다.
                  </div>
                  <div className="time_container">
                    <TimeAgo datetime={createdAt} locale="ko" />
                  </div>
                </AlarmTxtContainer>
                <AlarmBtnContainer>
                  <Buttons.Option onClick={() => diaryJoinOnclickHandle(diaryId, notificationId)}>수락</Buttons.Option>
                  <Buttons.Option onClick={() => diaryCancelOnclickHandle(notificationId)} negative>
                    거절
                  </Buttons.Option>
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
  background-color: var(--white);
  margin: 2rem 0rem;
  &:hover {
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.36);
  }
`;
