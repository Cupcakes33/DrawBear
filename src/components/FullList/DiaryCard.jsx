import React from "react";
import styled from "styled-components";
import Card from "./Card";

const DiaryCard = () => {
  return (
    <StContainer>
      <Date>2022년 12월 31일</Date>
      <Card />
    </StContainer>
  );
};

export default DiaryCard;

const StContainer = styled.section`
  width: 31.2rem;
  margin-bottom: 5.9rem;
`;

const Date = styled.h3`
  margin-top: 1.8rem;
  margin-bottom: 2.9rem;
  display: block;
  align-items: center;
`;
