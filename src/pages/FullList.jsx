import React from "react";
import styled from "styled-components";
import DiaryCard from "../components/FullList/DiaryCard";
import { StHeader, StWrapper } from "../UI/common";
import CommonContainer from "../UI/CommonContainer";
import Header from "../UI/Header";

const DiaryList = () => {
  return (
    <CommonContainer>
      <StHeader />
      <StWrapper>
        <Filter>최신순</Filter>
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
      </StWrapper>
      <Add>글쓰기</Add>
    </CommonContainer>
  );
};

export default DiaryList;

const Filter = styled.div`
  float: right;
  margin-top: 3rem;
  margin-right: 4rem;
  font-size: 1.3rem;
`;

const Add = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: calc(50% - 15.5rem);
  top: 90%;
  width: 6.9rem;
  height: 6.9rem;
  background-color: #d9d9d9;
  border: 0;
  border-radius: 100%;
  box-shadow: 0 1px 2px;
`;
