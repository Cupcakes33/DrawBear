import { StContainer } from "../UI/common";
import Footer from "../components/common/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../apis/axios";
import { useDispatch } from "react-redux";
import { ErrorModal } from "../redux/modules/UISlice";
import NoChatList from "./NoChatList";
import { useEffect } from "react";
import useDispatchHook from "../hooks/useDispatchHook";

const chatData = [
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   lastChat:
  //     "최근대화 내용 입니다아ㅏ,,,최근대화 내용 입니다아ㅏ,,,최근대화 내용 입니다아ㅏ,,,",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  //   time: "오전10시30분",
  // },
  // {
  //   id: 2,
  //   nickname: "김영희",
  //   lastChat: "최근대화 내용 입니다아ㅏ",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  //   time: "오전10시30분",
  // },
];

const ChatList = () => {
  const { openAlertModal } = useDispatchHook();
  const [chatList, setChatList] = useState([...chatData]);
  // const { data, isLoading, isError, error } = useQuery(
  //   ["chatList"],
  //   chatApi.read,
  //   {
  //     onError: (error) => {
  //       const { status } = error?.response.request;
  //       if (status === 400) {
  //         return dispatch(
  //           ErrorModal({ isModal: true, bigTxt: "채팅 조회에 실패했습니다." })
  //         );
  //       }
  //     },
  //   }
  // );

  useEffect(() => {
    openAlertModal({ bigTxt: "준비중입니다.", move: "/" });
    return;
  }, []);
  return (
    <>
      <StContainer bgColor="#ffffff">
        <ChatHeader>
          <span>채팅</span>
        </ChatHeader>
        {chatList.length === 0 ? (
          <NoChatList h3txt="채팅 목록이 없습니다." />
        ) : (
          <ChatListContainer>
            {/* {chatList?.map((chat) => {
            const { id, lastChat, nickname, profile, time } = chat;
            return chatList.length === 0 ? (
              <NoChatList />
            ) : (
              <ChatContainer key={id}>
                <img src={profile} />
                <div>
                  <ChatNickName>{nickname}</ChatNickName>
                  <ChatLastTxt>{lastChat}</ChatLastTxt>
                </div>
                <ChatTime>{time}</ChatTime>
              </ChatContainer>
            );
          })} */}
          </ChatListContainer>
        )}
        {/* <ChatListContainer> */}
        {/* <NoChatList /> */}

        {/* </ChatListContainer> */}
        <Footer />
      </StContainer>
    </>
  );
};
export default ChatList;
const ChatHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  & span {
    position: absolute;
    left: 6.11%;
    right: 85%;
    top: 40.91%;
    bottom: 21.21%;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 1.7rem;
    line-height: 2.5rem;
    color: #242424;
  }
`;
const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  margin-top: 10rem;
`;
const ChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7rem;
  padding: 0 1rem;
  border-radius: 10px;
  & img {
    width: 4rem;
    height: 4rem;
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
