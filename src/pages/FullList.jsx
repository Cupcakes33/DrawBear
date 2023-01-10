import React from "react";
import styled from "styled-components";
import DiaryCard from "../components/FullList/DiaryCard";
import CommonContainer from "../UI/CommonContainer";
import Header from "../UI/Header";

const DiaryList = () => {
  return (
    <CommonContainer>
      <Header />
      <Filter>최신순</Filter>
      <Date>2022년 12월 31일</Date>
      <DiaryCard />
    </CommonContainer>
  );
};

export default DiaryList;

const Date = styled.h2`
  height;
`;

const Filter = styled.div`
  float: right;
`;
