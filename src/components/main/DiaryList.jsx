import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DiaryList = ({ diaryData }) => {
  console.log(diaryData);
  const navigate = useNavigate();
  return (
    <StContainer>
      <StButton
        onClick={() => {
          navigate("/new");
        }}
      >
        +
      </StButton>
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
const StButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  position: fixed;
  top: 80%;
  left: calc(50% - 2.5rem);
`;
