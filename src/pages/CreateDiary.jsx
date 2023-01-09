import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const color = [
  "#E76020",
  "#ee892f",
  "#e0bb76",
  "#63896a",
  "#325434",
  "#0f0f0d",
];
const CreateDiary = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            이전
          </button>
          <h1>다이어리 생성</h1>
          {/* 다이어리 생성 페이지에서 혼자쓰고 함께쓰는 옵션을 바꾸어 줄 수 있는데 모달로 들어가는게 부자연스럽게 느껴진다. */}
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          생성
        </button>
      </Header>
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
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Section = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: 20px;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ColorPicker = styled.button`
  width: 40px;
  height: 40px;
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
  width: 200px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;
