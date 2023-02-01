import { useNavigate } from "react-router";
import styled from "styled-components";
import DiaryDeleteConfirmModal from "./DiaryDeleteConfirmModal";
import { Modal } from "../../common/modal/ReactModal";

const DiarySettingModal = ({ children, diaryId, diaryName }) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal>
        <Modal.Trigger>{children}</Modal.Trigger>
        <Modal.Portal>
          <Modal.BackDrop>
            <Modal.ContentBox XYcoordinate="bottom">
              <DiarySettingBox>
                <div onClick={() => navigate(`/invite/${diaryId}`)}>같이 쓰는 멤버 초대</div>
                <hr />
                <div onClick={() => navigate(`/update/${diaryId}`)}>다이어리 수정</div>
                <hr />
                <DiaryDeleteConfirmModal diaryId={diaryId} diaryName={diaryName}>
                  <div className="delete-btn">다이어리 삭제</div>
                </DiaryDeleteConfirmModal>
              </DiarySettingBox>
            </Modal.ContentBox>
          </Modal.BackDrop>
        </Modal.Portal>
      </Modal>
    </>
  );
};

export default DiarySettingModal;

const DiarySettingBox = styled.section`
  width: 100%;
  background-color: white;
  div {
    width: 36rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    cursor: pointer;
  }
  hr {
    border: none;
    height: 1px;
    background-color: #f0f0f0;
  }
  .delete-btn {
    color: #ff5656;
  }
`;
