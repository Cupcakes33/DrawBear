import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginApi } from "../../apis/axios";
import { LoginModal, TutorialModal } from "../../redux/modules/UISlice";
import { AlertModalCss } from "../common/modal/AlertModal";
import { Modal } from "../common/modal/ReactModal";

const LoginSuccessModal = ({ showModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tutorialAxios = async () => {
    try {
      await loginApi.tutorial();
      return dispatch(TutorialModal(true));
    } catch (error) {
      const { status } = error?.response?.request;
      console.log(status);
    }
  };

  const ConfirmReactionHandler = () => {
    tutorialAxios();
    dispatch(LoginModal(false));
    navigate("/");
  };

  return (
    <Modal showModal={showModal}>
      <Modal.Portal>
        <Modal.BackDrop notClose transparent>
          <Modal.ContentBox>
            <AlertBox>
              <div className="text-box">
                <h4>로그인 성공!</h4>
              </div>
              <hr />
              <Modal.Close>
                <button onClick={ConfirmReactionHandler}>확인</button>
              </Modal.Close>
            </AlertBox>
          </Modal.ContentBox>
        </Modal.BackDrop>
      </Modal.Portal>
    </Modal>
  );
};

export default LoginSuccessModal;

const AlertBox = styled.div`
  ${AlertModalCss}
  button {
    color: #3cc7a6;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
