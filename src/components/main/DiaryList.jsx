import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Add } from "../../UI/common";
import diaries from "./Diaries";

const DiaryList = ({ diaryData }) => {
  const navigate = useNavigate();
  return (
    <StContainer>
      {diaries(diaryData)}
      <Add
        page="main"
        onClick={() => {
          navigate("/new");
        }}
      >
        +
      </Add>
    </StContainer>
  );
};

export default DiaryList;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
