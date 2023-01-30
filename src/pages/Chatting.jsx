import styled from "styled-components";
import { StContainer } from "../UI/common";
import { AiOutlineArrowUp } from "react-icons/ai";
import Button from "../components/common/Button";
import NavigateBtn from "../components/common/NavigateBtn";
import { useState } from "react";
const InviteUserImgData = {
  id: 2,
  nickname: "이수",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};
const chatData = [
  {
    id: 1,
    nickname: "김철수",
    txt: "ㅋㅋㅋㅋ뭐해",
    profile: "",
  },
  {
    id: 2,
    nickname: "이수",
    txt: "노래불러요",
    profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  },
  {
    id: 1,
    nickname: "김철수",
    txt: "무슨노래 좋아하시는데요?",
    profile: "",
  },
  {
    id: 1,
    nickname: "김철수",
    txt: "힙합? 가요? 발라드?",
    profile: "",
  },
];
const Chatting = () => {
  const [chatTxt, setChatTxt] = useState("");
  const [btnColor, setBtnColor] = useState("button_icon");
  const chatTxtOnChageHandle = (event) => {
    let txt = event.target.value;
    if (txt.length === 0) {
      setBtnColor("button_icon");
    } else {
      setBtnColor("button_primary");
    }
    setChatTxt(txt);
  };
  return (
    <>
      <StContainer bgColor="#F8F8F8">
        <ChatHeader>
          <div>
            <NavigateBtn prev link={"/chatlist"} sizeType="header" />
          </div>
          <div>{InviteUserImgData.nickname}</div>
        </ChatHeader>
        {chatData.map((chatinfo) => {
          console.log(chatinfo);
          const { id, nickname, txt, profile } = chatinfo;
          return <ChatContent></ChatContent>;
        })}
        <ChatFooter>
          <div>
            <input
              value={chatTxt}
              onChange={chatTxtOnChageHandle}
              placeholder="채팅입력.."
            />
          </div>
          <Button
            size="mini"
            color={btnColor}
            icon={<AiOutlineArrowUp />}
            round
          />
        </ChatFooter>
      </StContainer>
    </>
  );
};
export default Chatting;
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
const ChatFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
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

const ChatContent = styled.div`
  & div {
    top: 100px;
  }
`;
const ChatImg = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
`;
