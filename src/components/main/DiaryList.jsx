import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const diaryData = [
  {
    diaryId: 1,
    diaryName: "첫번째 일기",
    content: "첫번째 일기 내용",
    color: "#E76020",
  },
  {
    diaryId: 2,
    diaryName: "두번째 일기",
    content: "두번째 일기 내용",
    color: "#e0bb76",
  },
  {
    diaryId: 3,
    diaryName: "세번째 일기",
    content: "세번째 일기 내용",
    color: "#325434",
  },
];

const DiaryList = ({diaryData}) => {
  console.log(diaryData);
  const navigate = useNavigate();
  return (
    <StContainer>
      <StWrapper>
        {diaryData?.map((el) => {
          return (
            <div key={el.diaryId}>
              <span>{el.diaryName}</span>
              <DiaryIcon bgColor={"teal"} onClick={() => navigate("/list")}>
                그림
              </DiaryIcon>
            </div>
          );
        })}
      </StWrapper>
      <StButton
        onClick={() => {
          navigate("/new");
        }}
      />
    </StContainer>
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

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StWrapper = styled.div`
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

const StButton = styled.button`
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
