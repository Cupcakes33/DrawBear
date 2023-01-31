import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useNavigate } from "react-router";
import Button from "../common/Button";
import { BsBookmark } from "react-icons/bs";
import ListPageDropdown from "../common/dropdown/ListPageDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../../apis/axios";

const DiaryCard = ({ postData }) => {
  const queryClient = useQueryClient();
  const naigate = useNavigate();
  const {
    postId,
    diaryId,
    nickname,
    title,
    image,
    bookmark,
    profileImg,
    commentsCount,
  } = postData;

  console.log(postData);

  const { mutate: bookmarkMutate } = useMutation({
    mutationFn: () => postsApi.bookmark(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["Allposts"]);
    },
  });

  const bookmarkHandler = (postId) => {
    bookmarkMutate(postId);
  };

  const redirectDetailpage = () => {
    naigate(`/detail/${postId}`);
  };

  return (
    <StDiaryCardContainer>
      <StTitleWrapper>
        <div className="postOptionbox">
          <h4 onClick={redirectDetailpage}>{title}</h4>
          <ListPageDropdown postId={postId} diaryId={diaryId} />
        </div>
        <div className="writerInfoBox">
          <img src={profileImg} alt="프사" />
          <span>{nickname}</span>
        </div>
      </StTitleWrapper>
      <StImageWrapper>
        <img src={image} alt="그림" onClick={redirectDetailpage} />
      </StImageWrapper>
      <StConfigWrapper>
        <div>
          <span>댓글 {commentsCount}</span>
        </div>
        <div>
          <Button
            size="mini"
            icon={<BsBookmark />}
            color={bookmark ? "button_primary" : "button_main"}
            onClick={() => {
              bookmarkHandler(postId);
            }}
          />
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
  .postOptionbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
  }
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
