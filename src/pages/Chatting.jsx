import styled from "styled-components";
import { AiOutlineArrowUp } from "react-icons/ai";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
import { useSelector } from "react-redux";
import BeforChat from "./BeforChat";
import ChatItem from "./ChatItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { chattingApi } from "../apis/axios";
import { useInView } from "react-intersection-observer";
import { Header } from "../components/common/header/Header";

const Chatting = () => {
  const socket = useRef(null);
  const ref = useRef();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { diaryId, userId, invitedNickname } = JSON.parse(
    localStorage.getItem("chattingId")
  );
  const socketData = {
    message,
    diaryId,
    userId,
  };
  const [btnColor, setBtnColor] = useState("button_icon");
  const [infi, setInfi] = useState({
    diaryId,
    pageParam: 1,
  });
  const { inViewref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const onKeyPressEventHandle = (event) => {
    if (event.key === "Enter") {
      messageSendOnclick();
    }
  };
  const messageOnChangeHandle = (event) => {
    let txt = event.target.value;
    if (txt.length === 0) {
      setBtnColor("button_icon");
    } else {
      setBtnColor("button_primary");
    }
    setMessage(txt);
  };
  const messageSendOnclick = () => {
    if (message.trim().length !== 0) {
      socket.current.emit("chat_message", socketData, () => {
        setMessageList((prev) => [...prev, socketData]);
      });
      setMessage("");
    }
  };

  const { data, error, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["chattings"],
      () => chattingApi.search(infi),

      {
        getNextPageParam: (lastPage) =>
          !lastPage.isLast ? lastPage.nextPage : undefined,
      },
      {
        staleTime: 1000,
      }
    );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    socket.current = io.connect(process.env.REACT_APP_MY_API);
    socket.current.emit("join", diaryId);
    return () => {
      socket.current.disconnect();
    };
  }, []);
  
  useEffect(() => {
    socket.current._callbacks = {};
    socket.current.on("receiveMessage", (message) => {
      setMessageList((prev) => [...prev, message]);
    });
  }, [socket.current]);

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messageList]);

  return (
    <>
      <Header>
        <Header.Back link={"/chatlist"}>{invitedNickname}</Header.Back>
      </Header>
      <ChatContent>
        <ChatWrapper ref={ref}>
          <BeforChat diaryId={diaryId} userId={userId}></BeforChat>

          {messageList.map((msg, index) => {
            const {
              message,
              nickname,
              profileImg,
              time,
              userId: msg_userId,
            } = msg;
            const chatInfo = {
              User: {
                profileImg,
                nickname,
              },
              chat: message,
              createdAt: time,
              msg_userId,
            };
            if (userId === msg_userId) {
              return (
                <ChatItem
                  key={`messageList${index}`}
                  chatInfo={chatInfo}
                  bgcolor="#3CC7A6"
                  rowreverse="row-reverse"
                ></ChatItem>
              );
            } else {
              return (
                <ChatItem
                  key={`messageList${index}`}
                  chatInfo={chatInfo}
                  bgcolor="#ffffff"
                ></ChatItem>
              );
            }
          })}
        </ChatWrapper>
      </ChatContent>
      <ChatFooter>
        <div>
          <input
            value={message}
            onKeyPress={onKeyPressEventHandle}
            onChange={messageOnChangeHandle}
            placeholder="채팅입력.."
          />
        </div>
        <div onClick={messageSendOnclick}>
          <Button
            size="mini"
            color={btnColor}
            icon={<AiOutlineArrowUp />}
            round
          />
        </div>
      </ChatFooter>
    </>
  );
};
export default Chatting;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 7.2rem);
  overflow: auto;
`;
const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 7.2rem);
  padding-bottom: 7.2rem;
`;
const ChatFooter = styled.div`
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  width: 100%;
  height: 7.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  & input {
    background: #fafafa;
    width: 28.4rem;
    height: 3.7rem;
    border: 1px solid #e8e8e8;
    border-radius: 3.3rem;
    padding: 1rem;
  }
`;
