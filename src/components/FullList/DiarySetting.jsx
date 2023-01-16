import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { mainApi } from "../../apis/axios";
import { showModal } from "../../redux/modules/UISlice";
import Modal from "../common/modal/Modal";

const DiarySetting = ({ onClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, mutate } = useMutation(["diary"], (id) => mainApi.delete(id), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 404) dispatch(showModal({ isModal: true, content: "다이어리가 존재하지 않습니다." }));
      else if (status === 401) dispatch(showModal({ isModal: true, content: "권한이 없습니다." }));
      else if (status === 500) dispatch(showModal({ isModal: true, content: "다이어리 삭제에 실패하였습니다." }));
    },
    onSuccess: (data) => {
      if (data?.result) {
        dispatch(showModal({ isModal: true, content: "다이어리 삭제 성공!", move: "/" }));
      }
    },
  });

  console.log(data);

  return (
    <Modal onClose={onClose} modalWidth="36rem" top="94%">
      <DiarySettingModal>
        <div>같이 쓰는 멤버 초대</div>
        <div>다이어리 수정</div>
        <div onClick={mutate(id)}>다이어리 삭제</div>
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
