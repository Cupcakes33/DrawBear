import { useRef, useState, memo } from "react";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import * as timeAgo from "timeago.js";
import ko from "timeago.js/lib/lang/ko";
import Button from "../common/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TfiPencil, TfiTrash } from "react-icons/tfi";

const Comment = memo(({ comments }) => {
  timeAgo.register("ko", ko);
  const [commentId, setCommentId] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);

  return comments.map((comment) => (
    <StCommentContainer key={`comment${comment.commentId}`}>
      <img src={comment.profileImg} alt="프로필이미지" />
      <div>
        <StCommentNicknameBox>
          <p>{comment.nickname}</p>
          <TimeAgo datetime={comment.createdAt} locale="ko" />
        </StCommentNicknameBox>

        <StCommentContentBox>
          <span>{comment.comment}</span>
        </StCommentContentBox>
      </div>
      <Button
        className="commentOptionBtn"
        round
        fs="2rem"
        icon={<BiDotsVerticalRounded />}
        onClick={() => {
          setCommentId(comment.commentId);
          setIsDropdown(!isDropdown);
        }}
      />

      <StOptionDropdown
        isDropdown={isDropdown && commentId === comment.commentId}
      >
        <li
          onClick={() => {
            console.log("update");
          }}
        >
          <TfiPencil />
          <span>수정</span>
        </li>

        <li
          onClick={() => {
            console.log("delete");
          }}
        >
          <TfiTrash />
          <span>삭제</span>
        </li>
      </StOptionDropdown>
    </StCommentContainer>
  ));
});

export default Comment;

const StOptionDropdown = styled.ul`
  z-index: 3;
  position: absolute;
  display: ${(props) => (props.isDropdown ? "flex" : "none")};
  bottom: -150%;
  right: 1rem;
  width: 8rem;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
  padding: 1rem 1rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  list-style: none;
  li {
    font-size: 1.5rem;
    font-weight: 700;
    width: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    cursor: pointer;
    &:hover {
      color: #ff6b6b;
    }
  }
`;

const StCommentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  gap: 1.2rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .commentOptionBtn {
    display: none;
    background: inherit;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    .commentOptionBtn {
      display: block;
    }
    .commentOptionBtn:hover {
      background-color: #f0f0f0;
    }
    .commentOptionBtn:active {
      background-color: #e0e0e0;
    }
  }
`;

const StCommentNicknameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  p {
    font-size: 2rem;
    font-weight: 700;
  }
  time {
    font-size: 1.2rem;
    color: #a9a9a9;
  }
`;

const StCommentContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
