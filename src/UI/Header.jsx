import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

// useEffect의 결과에 따라 실행해서 Header로 값 리턴
// const headText = useCallback(() => {}, []);

// 주소에 따라 useCallback 실행 시키도록 조건문
// useEffect(() => {}, [주소]);

const Header = () => {
  return (
    <Head>
      <LeftDiv>
        {"<"}
        <span>일기 쓰기</span>
      </LeftDiv>
      <RightDiv></RightDiv>
    </Head>
  );
};

export default Header;

const Head = styled.header`
  display: flex;
  align-items: center;
  max-width: 36rem;
  width: 95%;
  height: 6rem;
  background-color: #eeeeee;
  border: 1px solid gray;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

const LeftDiv = styled.div`
  font-weight: 700;
  margin-left: 1rem;
  span {
    margin-left: 1rem;
  }
`;

const RightDiv = styled.div``;
