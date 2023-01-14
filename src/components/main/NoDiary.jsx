import { useState } from "react";
import styled from "styled-components";
import CreateDiaryModal from "./CreateDiaryModal";

const NoDiary = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      {isModal && <CreateDiaryModal onClose={setIsModal}></CreateDiaryModal>}
      <StContainer>
        <StWrapper>
          <h3>아직 다이어리가 없어요</h3>
          <DiaryIcon
            onClick={() => {
              setIsModal(true);
            }}
          >
            그림
          </DiaryIcon>
          <span>여기를 눌러 첫 다이어리를 만들어보세요</span>
        </StWrapper>
      </StContainer>
    </>
  );
};

export default NoDiary;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  span {
    font-size: 0.8rem;
    margin-top: 1.4rem;
  }
`;

const DiaryIcon = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;
