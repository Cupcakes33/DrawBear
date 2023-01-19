import React from "react";
import styled from "styled-components";
import Card from "./Card";

const DiaryCard = ({postData}) => {
  return (
    <StContainer>
      <Card />
    </StContainer>
  );
};

export default DiaryCard;

const StContainer = styled.section`
  width: 31.2rem;
  margin-bottom: 5.9rem;
`;
