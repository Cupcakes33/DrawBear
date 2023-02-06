import { StContainer } from "../UI/common";
import Footer from "../components/common/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { alarmApi, mypageApi } from "../apis/axios";
import { useDispatch } from "react-redux";
import NoChatList from "./NoChatList";
import useDispatchHook from "../hooks/useDispatchHook";
import NavigateBtn from "../components/common/NavigateBtn";
import { viewChatList } from "../redux/modules/chatSlice";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const userInfo = useQuery(["read"], mypageApi.read, {
    onSuccess: (success) => {
      setUserId(success.userInfo.userId);
    },
  });
  const { data } = useQuery(["chatlist"], alarmApi.chatlist, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (success) => {
      setChatList([...success.diaries]);
    },
  });
  const chattingOnclickHandle = (userId, diaryId) => {
    dispatch(viewChatList({ userId, diaryId }));
    navigate("/chat");
  };
  return (
    <>
      <StContainer bgColor="#ffffff">
        <ChatHeader>
          <ChatWarrper>
            <div>
              <NavigateBtn prev link={"/"} sizeType="header" />
            </div>
            <div>채팅</div>
          </ChatWarrper>
        </ChatHeader>
        <ChatContent>
          {chatList.length === 0 ? (
            <NoChatList h3txt="채팅 목록이 없습니다." />
          ) : (
            <>
              {chatList.map((chat, index) => {
                const {
                  invitedNickname,
                  lastChat,
                  invitedProfileImg,
                  diaryId,
                  time,
                } = chat;
                return (
                  <ChatContainer
                    key={index}
                    onClick={() => chattingOnclickHandle(userId, diaryId)}
                  >
                    <ChatWrapper>
                      <div>
                        <img src={invitedProfileImg} alt="" />
                      </div>
                      <div>
                        <ChatNickName>{invitedNickname}</ChatNickName>
                        <ChatLastTxt>{lastChat}</ChatLastTxt>
                      </div>
                      <ChatTime>
                        {time ? (
                          new Date(time).toLocaleString().substr(12, 7)
                        ) : (
                          <></>
                        )}
                      </ChatTime>
                    </ChatWrapper>
                  </ChatContainer>
                );
              })}
            </>
          )}
        </ChatContent>
        <Footer />
      </StContainer>
    </>
  );
};
export default ChatList;
const ChatHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 7.2rem;
`;
const ChatWarrper = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  left: 1rem;
  top: 50%;
  transform: translate(0, -50%);
`;
const ChatContent = styled.div`
  width: 100%;
  height: calc(100vh - 6rem);
  overflow-x: hidden;
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 8rem;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;
const ChatWrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 50%;
  & img {
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;
const ChatTime = styled.div`
  font-size: 1rem;
`;
const ChatNickName = styled.div`
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 2.5rem;
  color: #242424;
`;
const ChatLastTxt = styled.div`
  text-align: left;
  width: 22rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #242424;
`;
