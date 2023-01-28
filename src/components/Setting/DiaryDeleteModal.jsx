import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mainApi } from "../../apis/axios";
import { ErrorModal } from "../../redux/modules/UISlice";
import { Modal } from "../common/modal/ReactModal";

const ReconfirmAlertModal = ({ children, bigTxt }) => {
  const { diaryData } = useSelector((state) => state.diarySlice);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, mutate, isLoading } = useMutation((id) => mainApi.delete(id), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 404) dispatch(ErrorModal({ isModal: true, bigTxt: "다이어리가 존재하지 않습니다." }));
      else if (status === 401) dispatch(ErrorModal({ isModal: true, bigTxt: "권한이 없습니다." }));
      else if (status === 500)
        dispatch(
          ErrorModal({
            isModal: true,
            bigTxt: "다이어리 삭제에 실패하였습니다.",
          })
        );
    },
    onSuccess: () => {
      dispatch(ErrorModal({ isModal: true, bigTxt: "다이어리를 삭제했어요.", smallTxt: "다이어리야 안녕!" }));
      const diaries = queryClient.getQueryData(["main"])?.diaries;
      queryClient.setQueryData(["main"], {
        diaries: diaries?.filter((diary) => diary.diaryId !== diaryData),
      });
    },
  });

  return (
    <>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <Modal>
          <Modal.Trigger>{children}</Modal.Trigger>
          <Modal.Portal>
            <Modal.BackDrop notClose>
              <Modal.ContentBox>
                <AlertBox>
                  <div className="text-box">
                    <h4>{bigTxt}</h4>
                  </div>
                  <hr />
                  <SelectBtnBox>
                    <Modal.Close>
                      <button className="select cancel">취소</button>
                    </Modal.Close>
                    <Modal.Close>
                      <button className="select confirm" onClick={() => mutate(diaryData)}>
                        확인
                      </button>
                    </Modal.Close>
                  </SelectBtnBox>
                </AlertBox>
              </Modal.ContentBox>
            </Modal.BackDrop>
          </Modal.Portal>
        </Modal>
      )}
    </>
  );
};

export default ReconfirmAlertModal;

const AlertBox = styled.div`
  display: grid;
  width: 28rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 12px;
  box-shadow: 0 1px 4px #d7d7d7;
  background-color: white;
  .text-box {
    display: block;
    text-align: center;
    word-break: keep-all;
    align-items: center;
    padding: 3rem;
    font-weight: 700;
    p {
      font-size: 1rem;
    }
  }
  hr {
    height: 1px;
    border: 0;
    background-color: #d7d7d7;
  }
  button {
    width: 100%;
    height: 4rem;
    border: none;
    background-color: white;
    cursor: pointer;
  }
  .cancel {
    border-right: 1px solid #d7d7d7;
  }
  .select {
    width: 14rem;
    color: #bdbdbd;
  }
  .confirm {
    color: #3cc7a6;
  }
`;

const SelectBtnBox = styled.div`
  display: flex;
`;
