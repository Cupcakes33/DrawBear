import { useState } from "react";
import styled from "styled-components";
import Modal from "../common/modal/Modal";
import CreateDiaryModal from "./CreateDiaryModal";

const NoDiary = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      {isModal && <CreateDiaryModal onClose={setIsModal}></CreateDiaryModal>}
      <Container>
        <Wrapper>
          <h3>아직 다이어리가 없어요</h3>
          <DiaryIcon
            onClick={() => {
              setIsModal(true);
            }}
          >
            그림
          </DiaryIcon>
          <span>여기를 눌러 첫 다이어리를 만들어보세요</span>
        </Wrapper>
      </Container>
    </>
  );
};

export default NoDiary;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  span {
    font-size: 8px;
    margin-top: 14px;
  }
`;

const DiaryIcon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;
