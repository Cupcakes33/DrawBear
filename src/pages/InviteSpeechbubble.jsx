import styled from "styled-components";
const userData = {
  id: 2,
  nickname: "아이유",
  txt: "1234566789101112131415161718192021222324252627282930",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  time: "10시31분",
};
const InviteSpeechbubble = ({ bgcolor, rowreverse }) => {
  return (
    <StSpeechContainer rowreverse={rowreverse}>
      <div>
        <img src={userData.profile} />
      </div>
      <div className="chatWrappper">
        <div className="chatnickname">{userData.nickname}</div>
        <ChatContext
          bgcolor={bgcolor}
          btrr="0.5rem"
          bbrr="0.5rem"
          bblr="0.5rem"
          maxWidth="19rem"
          boxShadow=".2rem .2rem #e8e8e8"
          wordBreak="break-word"
        >
          {userData.txt}
        </ChatContext>
      </div>
      <ChatTime fontsize="1rem" padding="10rem 0rem 0rem 0rem">
        {userData.time}
      </ChatTime>
    </StSpeechContainer>
  );
};
export default InviteSpeechbubble;

const StSpeechContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: ${(props) => props.rowreverse};
  gap: 1rem;
  & img {
    width: 5rem;
    height: 5rem;
  }
  & .chatWrappper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const ChatTime = styled.div`
  font-size: ${(props) => props.fontsize};
  padding: ${(props) => props.padding};
`;

const ChatContext = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.bgcolor};
  border-top-right-radius: ${(props) => props.btrr};
  border-bottom-right-radius: ${(props) => props.bbrr};
  border-top-left-radius: ${(props) => props.btlr};
  border-bottom-left-radius: ${(props) => props.bblr};
  max-width: ${(props) => props.maxWidth};
  box-shadow: ${(props) => props.boxShadow};
  word-break: ${(props) => props.wordBreak};
`;
