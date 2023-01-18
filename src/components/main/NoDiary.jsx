import { useState } from "react";
import styled from "styled-components";
import CreateDiaryModal from "./CreateDiaryModal";
import NoDiaryBear from "../../assets/images/noDiaryBear.webp";

const NoDiary = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <StContainer>
        <StWrapper>
          <h3>아직 다이어리가 없어요</h3>
          <img
            src={NoDiaryBear}
            alt="다이어리 없을 때 곰돌이 그림"
            onClick={() => {
              setIsModal(true);
            }}
          />
          <span>여기를 눌러 첫 다이어리를 만들어보세요</span>
        </StWrapper>
      </StContainer>
      {isModal && <CreateDiaryModal onClose={setIsModal}></CreateDiaryModal>}
    </>
  );
};

export default NoDiary;

const StContainer = styled.div`
  height: 85vh;
  display: flex;
  justify-content: center;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 10.5rem;
    height: 11.5rem;
  }
  h3 {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  span {
    font-size: 0.8rem;
    margin-top: 1.4rem;
    color: #c1c1c1;
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
