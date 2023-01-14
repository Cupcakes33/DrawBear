import styled, { css } from "styled-components";
import Back from "../components/header/Back";
import HeaderBtn from "../components/header/HeaderBtn";
import HeaderText from "../components/header/HeaderText";
import { StHeader } from "../UI/common";

const color = ["#E76020", "#ee892f", "#e0bb76", "#63896a", "#325434", "#0f0f0d"];
const CreateDiary = () => {
  return (
    <Container>
      <StHeader flexBetween>
        <div>
          <Back />
          <HeaderText>다이어리 생성</HeaderText>
        </div>
        <div>
          <HeaderBtn>완성</HeaderBtn>
        </div>
      </StHeader>
      <Section>
        <h3>다이어리 제목</h3>
        <DiaryIcon>그림</DiaryIcon>
      </Section>
      <Footer>
        {color.map((color) => {
          return <ColorPicker color={color}></ColorPicker>;
        })}
      </Footer>
    </Container>
  );
};

export default CreateDiary;

const Container = styled.div`
  width: 36rem;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  position: relative;
`;

const Section = styled.section`
  width: 100%;
  height: calc(100% - 13.2rem);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: 2rem;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ColorPicker = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const DiaryIcon = styled.div`
  width: 20rem;
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;
