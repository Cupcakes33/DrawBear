import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../../apis/axios";
import Buttons from "../common/Button/Buttons";
import { flex } from "../../UI/common";

const DiaryCard = ({ postData }) => {
  const queryClient = useQueryClient();
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

  const { mutate: bookmarkMutate } = useMutation({
    mutationFn: () => postsApi.bookmark(postId),
    onSuccess: () => {
      const allPosts = queryClient.getQueryData(["Allposts"]);
      const post = allPosts.filter((e) => e.postId === postId)[0];

      queryClient.setQueryData(
        ["Allposts"],
        allPosts.map((e) =>
          e === post ? { ...post, bookmark: !post.bookmark } : e
        )
      );
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
          <Buttons.Bookmark
            isBookmarked={bookmark}
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
  ${flex("space-between", "", "row")}
  .postOptionbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
    h4 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 15rem;
    }
  }
  .writerInfoBox {
    ${flex("space-between", "", "row")}
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
  ${flex("space-between", "", "row")}
  div:last-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;
