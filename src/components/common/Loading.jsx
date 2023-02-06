import React from "react";
import styled from "styled-components";
import { flex } from "../../UI/common";
import loadingBear from "../../assets/images/loadingBear.webp";

const Loading = ({ children }) => {
  return (
      <LoadingContainer>
        <div className="loading-box">
          <img src={loadingBear} alt="로딩 곰돌이" />
          <h2>{children ? children : "로딩 중..."}</h2>
        </div>
      </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100%;
  height: 99vh;
  ${flex}
  .loading-box {
    text-align: center;
    img {
      margin-right: 1.5rem;
    }
    h2 {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
  }
`;
