import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginModal, __TutorialModal } from "../../redux/modules/UISlice";
import { AlertModalCss } from "../common/modal/AlertModal";
import { Modal } from "../common/modal/ReactModal";

const LoginSuccessModal = ({ showModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ConfirmReactionHandler = () => {
    dispatch(LoginModal(false));
    navigate("/");
    if (localStorage.getItem("tutorialDone") === null) dispatch(__TutorialModal(true));
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
