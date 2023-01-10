import React from "react";
import styled from "styled-components";

const CommonContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CommonContainer;

const Container = styled.div`
  max-width: 36rem;
  width: 95%;
  min-height: 100vh;
  margin: auto;
  border: 1px solid black;
`;
