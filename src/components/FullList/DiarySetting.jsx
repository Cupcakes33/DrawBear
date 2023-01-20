import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { mainApi } from "../../apis/axios";
import { showModal } from "../../redux/modules/UISlice";
import Alert from "../common/modal/Alert";
import Modal from "../common/modal/Modal";

const DiarySetting = ({ queryClient, diaryId }) => {
  const dispatch = useDispatch();
  const { isModal } = useSelector((state) => state.UISlice);
  const navigate = useNavigate();

  const { data, mutate } = useMutation((id) => mainApi.delete(id), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 404) dispatch(showModal({ isModal: true, content: "다이어리가 존재하지 않습니다." }));
      else if (status === 401) dispatch(showModal({ isModal: true, content: "권한이 없습니다." }));
      else if (status === 500) dispatch(showModal({ isModal: true, content: "다이어리 삭제에 실패하였습니다." }));
    },
    onSuccess: () => {
      queryClient.refetchQueries(["main"]);
      dispatch(showModal({ isModal: true, content: "다이어리 삭제 성공!", move: "/" }));
    },
  });

  return (
    <>
      <Modal modalWidth="36rem" top="94%" radius="0">
        <DiarySettingModal>
          <div>같이 쓰는 멤버 초대</div>
          <hr />
          <div onClick={() => navigate(`/update/${diaryId}`)}>다이어리 수정</div>
          <hr />
          <div onClick={() => mutate(diaryId)}>다이어리 삭제</div>
        </DiarySettingModal>
      </Modal>
      {isModal && <Alert />}
    </>
  );
};

export default DiarySetting;

const DiarySettingModal = styled.section`
  width: 100%;
  background-color: white;
  div {
    width: 100%;
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
`;
