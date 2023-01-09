import { useState } from "react";
import styled from "styled-components";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";

const Main = () => {
  const [isDiaryData, setIsDiaryData] = useState(false);
  return (
    <Container>
      <Header>
        <h1>Finale</h1>
      </Header>
      <Section>{!isDiaryData ? <NoDiary /> : <DiaryList />}</Section>
      <Footer></Footer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 360px;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  position: relative;
`;

const Header = styled.header`
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: #f8f8f8;
`;
