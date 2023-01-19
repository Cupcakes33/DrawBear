import { useState } from "react";
import styled from "styled-components";
import { Add } from "../../UI/common";
import CreateDiaryModal from "./CreateDiaryModal";
import Diaries from "./Diaries";

const DiaryList = ({ diaryData }) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <StContainer>
        {Diaries(diaryData)}
        <Add
          page="main"
          onClick={() => {
            setIsModal(true);
          }}
        >
          +
        </Add>
      </StContainer>
      {isModal && <CreateDiaryModal onClose={setIsModal}></CreateDiaryModal>}
    </>
  );
};

export default DiaryList;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
