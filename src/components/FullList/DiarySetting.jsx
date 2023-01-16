import styled from "styled-components";
import Modal from "../common/modal/Modal";

const DiarySetting = ({ onClose }) => {
  return (
    <Modal onClose={onClose} modalWidth="36rem" top="94%">
      <DiarySettingModal>
        <div>같이 쓰는 멤버 초대</div>
        <div>다이어리 수정</div>
        <div>다이어리 삭제</div>
      </DiarySettingModal>
    </Modal>
  );
};

export default DiarySetting;

const DiarySettingModal = styled.section`
  width: 100%;
  background-color: #d9d9d9;
  div {
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    cursor: pointer;
  }
`;
