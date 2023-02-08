import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { flex } from "../../UI/common";

const Card = () => {
  const naigate = useNavigate();

  return (
    <StBox>
      <Title>
        <div className="title">
          <h4 onClick={() => naigate("/detail")}>일기 제목</h4>
          <label>몇분 전</label>
        </div>
        <div className="user">
          <img src="" alt="프사" />
          <span>작성자</span>
        </div>
      </Title>
      <div className="content" onClick={() => naigate("/detail")}>
        <img src="" alt="그림" />
      </div>
      <SettingBox>
        <div>
          <label>댓글 1</label>
        </div>
        <div className="button-box">
          <button onClick={() => naigate("/write")}>수정</button>
          <button>삭제</button>
        </div>
      </SettingBox>
      <Comment>
        <img src="" alt="프사" />
        <label>댓글 내용</label>
      </Comment>
    </StBox>
  );
};

export default Card;

const StBox = styled.div`
  .content {
    ${flex}
    width: 100%;
    height: 12.8rem;
    margin-top: 0.7rem;
    background-color: #d9d9d9;
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  .title {
    display: flex;
    gap: 1.2rem;
    h4 {
      cursor: pointer;
    }
  }
  label {
    font-size: 0.9rem;
    margin-top: auto;
  }
  span {
    font-size: 1.4rem;
    margin-left: 0.8rem;
  }
`;

const SettingBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  label {
    font-size: 0.9rem;
  }
  .button-box {
    display: flex;
    gap: 0.3rem;
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.6rem;
  background-color: #d9d9d9;
  img {
    margin-left: 1.9rem;
    margin-right: 0.9rem;
  }
`;
