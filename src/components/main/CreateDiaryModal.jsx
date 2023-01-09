import Modal from "../common/modal/Modal";
import styled from "styled-components";

const CreateDiaryModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Box>
          <DiaryIcon />
          <span>혼자써요 !</span>
        </Box>
        <Box>
          <DiaryIcon />
          <span>같이써요 !</span>
        </Box>
      </Wrapper>
    </Modal>
  );
};

export default CreateDiaryModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
`;

const DiaryIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 8px;
    margin-top: 14px;
  }
`;
