import styled from "styled-components";

const ChatItem = ({ chatInfo, bgcolor, rowreverse }) => {
  return (
    <StSpeechContainer rowreverse={rowreverse}>
      <ChatImg>
        {bgcolor === "#3CC7A6" ? <></> : <img src={chatInfo.User.profileImg} />}
      </ChatImg>
      <div className="chatWrappper">
        {bgcolor === "#3CC7A6" ? (
          <></>
        ) : (
          <div className="chatnickname">{chatInfo.User.nickname}</div>
        )}
        <ChatContext
          bgcolor={bgcolor}
          btrr="0.5rem"
          bbrr="0.5rem"
          bblr="0.5rem"
          maxWidth="19rem"
          boxShadow=".2rem .2rem #e8e8e8"
          wordBreak="break-word"
        >
          {chatInfo.chat}
        </ChatContext>
      </div>
      <div>
        {bgcolor === "#3CC7A6" ? (
          <></>
        ) : (
          <ChatTime fontsize="1rem" padding="10rem 0rem 0rem 0rem">
            {new Date(chatInfo.createdAt).toLocaleString().substr(12, 7)}
          </ChatTime>
        )}
      </div>
    </StSpeechContainer>
  );
};
export default ChatItem;

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
const ChatImg = styled.div`
  width: 50px;
  height: 50px;
  & img {
    border-radius: 50%;
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
