import { useState } from "react";
import styled from "styled-components";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";

const Main = () => {
  const [isDiaryData, setIsDiaryData] = useState(true);
  return (
    <StContainer>
      <StHeader>
        <h1>LOGO</h1>
      </StHeader>
      <StSection>{!isDiaryData ? <NoDiary /> : <DiaryList />}</StSection>
      <Footer></Footer>
    </StContainer>
  );
};

export default Main;

const StContainer = styled.div`
  width: 360px;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  position: relative;
`;

const StHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StSection = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
  overflow-x: scroll;
`;
