import { useState } from "react";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import { StContainer, StHeader, StSection } from "../UI/common";

const Main = () => {
  const [isDiaryData, setIsDiaryData] = useState(false);
  return (
    <StContainer>
      <StHeader flexCenter>
        <h1>LOGO</h1>
      </StHeader>
      <StSection>{!isDiaryData ? <NoDiary /> : <DiaryList />}</StSection>
      <Footer></Footer>
    </StContainer>
  );
};

export default Main;
