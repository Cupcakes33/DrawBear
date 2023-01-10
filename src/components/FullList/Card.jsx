import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StBox>
      <Title>
        <div className="title">
          <h4>일기 제목</h4>
          <label>몇분 전</label>
        </div>
        <div className="user">
          <img src="" alt="프사" />
          <span>작성자</span>
        </div>
      </Title>
      <div className="content">그림</div>
    </StBox>
  );
};

export default Card;

const StBox = styled.div`
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12.8rem;
    margin-top: 0.7rem;
    background-color: #d9d9d9;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  .title {
    display: flex;
    gap: 1.2rem;
  }
  label {
    font-size: 0.9rem;
    margin-top: auto;
  }
  .user {
  }
  span {
    font-size: 1.4rem;
    margin-left: 0.8rem;
  }
`;
