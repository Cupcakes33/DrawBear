import styled from "styled-components";
import { AiOutlineArrowUp } from "react-icons/ai";
import Button from "../components/common/Button";
import NavigateBtn from "../components/common/NavigateBtn";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
import { useSelector } from "react-redux";
import BeforChat from "./BeforChat";
import ChatItem from "./ChatItem";

const Chatting = () => {
  const socket = useRef(null);
  const ref = useRef();
  const { diaryId, userId, invitedNickname } = useSelector(
    (state) => state.chatSlice
  );
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socketData = { message, diaryId, userId };
  const [btnColor, setBtnColor] = useState("button_icon");

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
    socket.current.emit("chat_message", socketData, () => {
      setMessageList((prev) => [...prev, socketData]);
    });
    setMessage("");
  };

  useEffect(() => {
    socket.current = io.connect("https://mylee.site");
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
      <ChatHeader>
        <div>
          <NavigateBtn prev link={"/chatlist"} sizeType="header" />
        </div>
        <div>{invitedNickname}</div>
      </ChatHeader>
      <ChatContent>
        <BeforChat diaryId={diaryId} userId={userId}></BeforChat>
        <ChatWrapper ref={ref}>
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
const ChatHeader = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  & div {
    left: 1rem;
    position: absolute;
  }
  & div:last-child {
    left: 5rem;
    position: absolute;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 1.7rem;
    color: #242424;
  }
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80rem;
  overflow: auto;
`;
const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChatBubble = styled.div`
  display: flex;
  padding: ${(props) => props.padding};
`;
const SpeeckPoint = styled.div`
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
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

// const ChatImg = styled.img`
//   width: 50px;
//   height: 50px;
//   position: absolute;
// `;
const ChatUser = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  padding: ${(props) => props.padding};
`;
const ChatTime = styled.div`
  font-size: 0.1rem;
`;
