import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useNavigate } from "react-router";
import Button from "../common/Button";
import { BsBookmark } from "react-icons/bs";

const DiaryCard = ({ postData }) => {
  const naigate = useNavigate();
  const {
    postId,
    nickname,
    title,
    image,
    bookmark,
    profileImg,
    commentsCount,
  } = postData;
  return (
    <StDiaryCardContainer>
      <StTitleWrapper>
        <h4 onClick={() => naigate("/detail")}>{title}</h4>
        <div className="writerInfoBox">
          <img src={profileImg} alt="프사" />
          <span>{nickname}</span>
        </div>
      </StTitleWrapper>
      <StImageWrapper>
        <img src={image} alt="그림" />
      </StImageWrapper>
      <StConfigWrapper>
        <div>
          <span>댓글 {commentsCount}</span>
        </div>
        <div>
          <Button size="mini" icon={<BsBookmark />} />
          <Button size="small">수정</Button>
          <Button size="small" fontColor="red">
            삭제
          </Button>
        </div>
      </StConfigWrapper>
    </StDiaryCardContainer>
  );
};

export default DiaryCard;
const StDiaryCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 2rem;
`;
const StTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .writerInfoBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
`;
const StImageWrapper = styled.div`
  width: 100%;
  height: 20rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

const StConfigWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  div:last-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;
