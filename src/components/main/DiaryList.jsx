import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Diary from "./Diary";

const DiaryData = [
  {
    id: 1,
    title: "첫번째 일기",
    content: "첫번째 일기 내용",
    color: "#E76020",
  },
  {
    id: 2,
    title: "두번째 일기",
    content: "두번째 일기 내용",
    color: "#e0bb76",
  },
  {
    id: 3,
    title: "세번째 일기",
    content: "세번째 일기 내용",
    color: "#325434",
  },
];

const DiaryList = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        {DiaryData.map((el) => {
          return (
            <div>
              <span>{el.title}</span>
              <DiaryIcon bgColor={el.color} onClick={() => navigate("/list")}>
                그림
              </DiaryIcon>
            </div>
          );
        })}
      </Wrapper>
      <Button
        onClick={() => {
          navigate("/new");
        }}
      />
    </Container>
  );
};

export default DiaryList;

const DiaryIcon = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  width: 300%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  div {
    text-align: center;
  }
`;

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -10%);

  &::after {
    content: "+";
    font-size: 30px;
    font-weight: 700;
    color: white;
  }
`;
