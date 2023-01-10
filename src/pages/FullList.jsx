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
      <DiaryCard />
    </CommonContainer>
  );
};

export default DiaryList;

const Filter = styled.div`
  float: right;
  margin-top: 4.6rem;
  margin-right: 4.8rem;
`;
