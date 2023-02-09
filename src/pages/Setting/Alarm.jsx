import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import * as timeAgo from "timeago.js";
import ko from "timeago.js/lib/lang/ko";
import { alarmApi } from "../../apis/axios";
import Buttons from "../../components/common/Button/Buttons";
import NavigateBtn from "../../components/common/NavigateBtn";
import { useNavigate } from "react-router-dom";
import {Header} from "../../components/common/header/Header";

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
  const alarmMoveOnClickHandle = (code, notificationId, diaryId, postId) => {
    if (code === 4) {
      queryClient.setQueryData(["footerIcons"], "couple");
      navigate("/");
      alarmDeleteMutate(notificationId);
    } else if (code === 2) {
      queryClient.setQueryData(["footerIcons"], "couple");
      navigate(`/list/${diaryId}`);
      alarmDeleteMutate(notificationId);
    } else if (code === 3) {
      navigate(`/detail/${postId}`);
      alarmDeleteMutate(notificationId);
    }
  };
  useEffect(() => {}, [data]);
  return (
    <>
      {isError ? (
        <h2>{`${error?.response.status} ERROR`}</h2>
      ) : (
        <>
          <Header flex justify="flex-start">
            <NavigateBtn prev sizeType="header" link="/setting" />
            <h3>알림</h3>
          </Header>
          {data.Notifications?.map((alarmdata, index) => {
            const {
              audienceNickname,
              code,
              comment,
              createdAt,
              diaryId,
              postId,
              nickname,
              notificationId,
            } = alarmdata;
            return (
              <>
                {code === 1 ? (
                  <AlarmContainer key={index}>
                    <AlarmTxtContainer>
                      <div className="txt_container">
                        {audienceNickname}님이 {nickname} 님께 공유다이어리에
                        초대하셨습니다.
                      </div>
                      <div className="time_container">
                        <TimeAgo datetime={createdAt} locale="ko" />
                      </div>
                    </AlarmTxtContainer>
                    <AlarmBtnContainer>
                      <Buttons.Option
                        onClick={() =>
                          diaryJoinOnclickHandle(diaryId, notificationId)
                        }
                      >
                        수락
                      </Buttons.Option>
                      <Buttons.Option
                        onClick={() => diaryCancelOnclickHandle(notificationId)}
                        negative
                      >
                        거절
                      </Buttons.Option>
                    </AlarmBtnContainer>
                  </AlarmContainer>
                ) : (
                  <AlarmContainer key={index}>
                    <AlarmTxtContainer
                      onClick={() =>
                        alarmMoveOnClickHandle(
                          code,
                          notificationId,
                          diaryId,
                          postId
                        )
                      }
                    >
                      <div className="txt_container_n_btn">
                        {code === 2 && (
                          <>{audienceNickname}님이 다이어리를 작성했습니다.</>
                        )}
                        {code === 3 && (
                          <>
                            {audienceNickname}님이 {comment} 라는 댓글을
                            작성했습니다.
                          </>
                        )}
                        {code === 4 && (
                          <>
                            {audienceNickname}님이 공유다이어리를 수락
                            하셨습니다.
                          </>
                        )}
                      </div>
                      <div className="time_container n_btn">
                        <TimeAgo datetime={createdAt} locale="ko" />
                      </div>
                    </AlarmTxtContainer>
                  </AlarmContainer>
                )}
              </>
              //초대: 1
              // 상대방 일기씀: 2
              // 댓글: 3
              // 초대 수락: 4
            );
          })}
        </>
      )}
    </>
  );
};

export default Alarm;
const AlarmTxtContainer = styled.div`
  display: flex;
  align-items: center;
  & .txt_container {
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
  & .txt_container_n_btn {
    font-size: 1.4rem;
    padding: 2rem;
    max-width: 31rem;
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
  border-radius: 0.5rem;
  background-color: var(--white);
  margin: 2rem 0rem;
  &:hover {
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.36);
  }
`;
