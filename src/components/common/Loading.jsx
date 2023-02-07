import React from "react";
import styled from "styled-components";
import loadingBear from "../../assets/images/loadingBear.webp";
import { flex } from "../../UI/common";
import Layout from "./Layout";

const Loading = ({ children }) => {
  return (
    <Layout>
      <LoadingContainer>
        <img src={loadingBear} alt="로딩 곰돌이" />
        <h2>{children ? children : "로딩 중..."}</h2>
      </LoadingContainer>
    </Layout>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  height: 100vh;
  ${flex("", "", "column")}
  img {
    margin-right: 1.5rem;
  }
  h2 {
    margin-top: 1rem;
  }
`;
