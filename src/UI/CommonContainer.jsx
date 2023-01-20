import React from "react";
import styled from "styled-components";

const CommonContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CommonContainer;

const Container = styled.div`
  width: 36rem;
  min-height: 100vh;
  border: 1px solid black;
  background-color: #eef3e3;
`;
