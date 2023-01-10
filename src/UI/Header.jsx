import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// useEffect의 결과에 따라 실행해서 Header로 값 리턴
// const headText = useCallback(() => {}, []);

// 주소에 따라 useCallback 실행 시키도록 조건문
// useEffect(() => {}, [주소]);

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Head>
        <LeftDiv>
          <button onClick={() => navigate(-1)}>{"<"}</button>
          <span>일기 쓰기</span>
        </LeftDiv>
        <RightDiv></RightDiv>
      </Head>
      <DummyDiv />
    </>
  );
};

export default Header;

const Head = styled.header`
  display: flex;
  align-items: center;
  width: 36rem;
  height: 6rem;
  background-color: #eeeeee;
  border: 1px solid gray;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

const LeftDiv = styled.div`
  font-weight: 700;
  button {
    border: 0;
    padding: 2rem;
    cursor: pointer;
  }
  span {
    margin-left: 1rem;
  }
`;

const DummyDiv = styled.div`
  height: 6rem;
`;

const RightDiv = styled.div``;
