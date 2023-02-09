import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import useDispatchHook from "../../../hooks/useDispatchHook";
import { mainApi } from "../../../apis/axios";
import DeleteConfirmBear from "../../../assets/images/DeleteConfirmBear.webp";
import Buttons from "../../common/Button/Buttons";
import { flex } from "../../../UI/common";
import { Modal } from "../../common/modal/ReactModal";

const DiaryDeleteConfirmModal = ({ children, diaryName, diaryId }) => {
  const { openAlertModal } = useDispatchHook();
  const queryClient = useQueryClient();

  const { data, mutate } = useMutation((id) => mainApi.delete(id), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 404) openAlertModal({ bigTxt: "다이어리가 존재하지 않습니다." });
      else if (status === 500) openAlertModal({ bigTxt: "다이어리 삭제에 실패하였습니다." });
    },
    onSuccess: () => {
      openAlertModal({ bigTxt: "다이어리를 삭제했어요.", smallTxt: "다이어리야 안녕!", move: "/" });
      const diaryData = queryClient.getQueryData(["main"])?.diaries;
      queryClient.setQueryData(["main"], {
        diaries: diaryData?.filter((diary) => diary.diaryId !== diaryId),
      });
    },
  });

  return (
    <>
      <Modal>
        <Modal.Trigger>{children}</Modal.Trigger>
        <Modal.Portal>
          <Modal.BackDrop>
            <Modal.ContentBox>
              <DeleteConfirmContainer>
                <div className="text-box">
                  <h3>정말 '{diaryName}'을(를) 삭제하시겠어요?</h3>
                </div>
                <div className="img-box">
                  <img src={DeleteConfirmBear} alt="삭제 곰돌이" />
                  <span>삭제된 다이어리의 내용은 다시 복구할 수 없어요.</span>
                </div>
                <div className="btn-box">
                  <Modal.Close>
                    <Buttons.Medium>아니요</Buttons.Medium>
                  </Modal.Close>

                  <Buttons.Medium
                    type="negative"
                    onClick={() => mutate(diaryId)}
                  >
                    삭제할래요
                  </Buttons.Medium>
                </div>
              </DeleteConfirmContainer>
            </Modal.ContentBox>
          </Modal.BackDrop>
        </Modal.Portal>
      </Modal>
    </>
  );
};

export default DiaryDeleteConfirmModal;

const DeleteConfirmContainer = styled.div`
  ${flex("", "", "column")}
  text-align: center;
  width: 29.7rem;
  height: 38.1rem;
  gap: 2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  .text-box {
    width: 70%;
  }
  .img-box {
    width: 14rem;
    span {
      font-size: 1.3rem;
    }
  }
  .btn-box {
    display: flex;
    gap: 1rem;
  }
`;
