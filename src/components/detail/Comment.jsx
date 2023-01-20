import React from "react";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import * as timeAgo from "timeago.js";
import ko from "timeago.js/lib/lang/ko";

const Comment = ({ comments }) => {
  timeAgo.register("ko", ko);
  const reverseArr = comments.reverse();
  return reverseArr.map((comment) => (
    <StCommentContainer key={`comment${comment.commentId}`}>
      <div className="commenterProfileWrapper">
        <img src={comment.profileImg} alt="프로필이미지" />
        <p>{comment.nickname}</p>
      </div>
      <div className="commentsContentsWrapper">
        <span>{comment.comment}</span>
        <TimeAgo datetime={comment.createdAt} locale="ko" />
      </div>
    </StCommentContainer>
  ));
};

export default Comment;

const StCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  gap: 1rem;

  .commenterProfileWrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    p {
      font-size: 2rem;
      &::after {
        content: " :";
      }
    }
  }

  .commentsContentsWrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
