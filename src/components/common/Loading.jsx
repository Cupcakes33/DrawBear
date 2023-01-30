import React from "react";
import styled from "styled-components";
import { flex, StContainer } from "../../UI/common";
import loadingBear from "../../assets/images/loadingBear.webp";

const Loading = () => {
  return (
    <StContainer bgColor="#EEF3E3">
      <LoadingContainer>
        <div className="loading-box">
          <img src={loadingBear} alt="로딩 곰돌이" />
          <h2>로딩 중...</h2>
        </div>
      </LoadingContainer>
    </StContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100%;
  height: 99vh;
  ${flex}
  img {
    margin-right: 1.5rem;
  }
  h2 {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;
