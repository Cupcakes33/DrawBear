import styled from "styled-components";
import { StContainer } from "../UI/common";
import { AiOutlineArrowUp } from "react-icons/ai";
import Button from "../components/common/Button";
import NavigateBtn from "../components/common/NavigateBtn";
import { useState } from "react";
import InviteSpeechbubble from "./InviteSpeechbubble";
const InviteUserImgData = {
  id: 2,
  nickname: "아이유",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};
const chatData = [
  {
    id: 1,
    nickname: "김철수",
    txt: "ㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzz뭐해",
    profile: "",
    time: "10시30분",
  },
  {
    id: 2,
    nickname: "아이유",
    txt: "ㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzzㅋㅋㅋㅋżzzzzz",
    profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
    time: "10시31분",
  },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "무슨노래 부르는데요?",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "왜요?",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "궁금해서요",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "잔소리요",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "아.. 네",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "좋아하는 노래 있으신가요?",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "ㅋㅋㅋㅋㅋㅋㅋㅋ비밀입니다.",
  //   profile: "",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "ㅋㅋㅋㅋ뭐해",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "노래불러요",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "무슨노래 부르는데요?",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "왜요?",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "궁금해서요",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "잔소리요",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "아.. 네",
  //   profile: "",
  // },
  // {
  //   id: 2,
  //   nickname: "아이유",
  //   txt: "좋아하는 노래 있으신가요?",
  //   profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  // },
  // {
  //   id: 1,
  //   nickname: "김철수",
  //   txt: "ㅋㅋㅋㅋㅋㅋㅋㅋ비밀입니다.",
  //   profile: "",
  // },
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
    <StContainer bgColor="#F8F8F8">
      <ChatHeader>
        <div>
          <NavigateBtn prev link={"/chatlist"} sizeType="header" />
        </div>
        <div>{InviteUserImgData.nickname}</div>
      </ChatHeader>
      <div style={{ height: "500px" }}>
        <InviteSpeechbubble />
      </div>
      <ChatFooter>
        <div>
          <input
            value={chatTxt}
            onChange={chatTxtOnChageHandle}
            placeholder="채팅입력.."
          />
        </div>
        <div>
          <Button
            size="mini"
            color={btnColor}
            icon={<AiOutlineArrowUp />}
            round
          />
        </div>
      </ChatFooter>
    </StContainer>
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
const ChatWrapper = styled.div`
  display: "flex";
`;
