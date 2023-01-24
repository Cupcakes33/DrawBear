import { useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import * as timeAgo from "timeago.js";
import ko from "timeago.js/lib/lang/ko";
import Button from "../common/Button";
import Alert from "../common/modal/Alert";
import { showModal } from "../../redux/modules/UISlice";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TfiPencil, TfiTrash } from "react-icons/tfi";
import { commentsApi } from "../../apis/axios";

// memo 를 적용하지 않았을 경우 리렌더링이 발생할 때마다 모든 댓글이 리렌더링 되는 문제가 발생.
// memo 를 적용하여 댓글이 추가되거나 삭제될 때만 리렌더링 되도록 변경.

const Comment = memo(({ comments }) => {
  timeAgo.register("ko", ko);
  const [commentId, setCommentId] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);

  const { mutate } = useMutation(
    (inputData) => commentsApi.login(inputData),
    {}
  );

  const deleteComment = (commentId) => {
    setIsDropdown(false);
    console.log(commentId);
  };

  const updateComment = (commentId) => {
    setIsDropdown(false);
    console.log(commentId);
  };

  return (
    <>
      {comments
        .slice(0)
        .reverse()
        .map((comment) => (
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
                  updateComment(comment.commentId);
                }}
              >
                <TfiPencil />
                <span>수정</span>
              </li>

              <li
                onClick={() => {
                  deleteComment(comment.commentId);
                }}
              >
                <TfiTrash />
                <span>삭제</span>
              </li>
            </StOptionDropdown>
          </StCommentContainer>
        ))}
    </>
  );
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
