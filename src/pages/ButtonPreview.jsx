import styled from "styled-components";
import Buttons from "../components/common/Button/Buttons";

const ButtonPreview = () => {
  return (
    <>
      <Stdiv>
        <Buttons.AddDiary onClick={() => console.log(1)} />
        <Buttons.AddPost />
        <Buttons.AddComment />
      </Stdiv>
      <Stdiv>
        <Buttons.Medium>아니요</Buttons.Medium>
        <Buttons.Medium type="negative">삭제할래요</Buttons.Medium>
        <Buttons.Small>검색</Buttons.Small>
        <Buttons.Invite>초대하기</Buttons.Invite>
        <Buttons.Invite isInvited>초대 중</Buttons.Invite>
        <Buttons.Bookmark />
        <Buttons.Bookmark isBookmarked />
        <Buttons.Option>수정</Buttons.Option>
        <Buttons.Option negative>삭제</Buttons.Option>
        <Buttons.Navigate prev />
        <Buttons.Navigate />
      </Stdiv>
      <Stdiv style={{ width: "360px", padding: "2.2rem" }}>
        <Buttons.Full type="positive">로그인</Buttons.Full>
      </Stdiv>
      <Stdiv style={{ width: "360px", padding: "2.2rem" }}>
        <Buttons.Full type="negative">네, 탈퇴할게요</Buttons.Full>
      </Stdiv>
    </>
  );
};

export default ButtonPreview;

const Stdiv = styled.div`
  width: 100vh;
  height: 10vh;
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--grayscale_3);
`;
