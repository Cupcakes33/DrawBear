import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ErrorModal } from "../../../redux/modules/UISlice";
import { AlertModalCss } from "./AlertModal";
import { Modal } from "./ReactModal";

const ErrorHandlerModal = ({ showModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorModal } = useSelector((state) => state.UISlice);

  const ConfirmReactionHandler = () => {
    dispatch(ErrorModal({ isModal: false }));
    navigate(errorModal?.move);
  };

  return (
    <Modal showModal={showModal}>
      <Modal.Portal>
        <Modal.BackDrop notClose transparent>
          <Modal.ContentBox>
            <AlertBox>
              <div className="text-box">
                <h4>{errorModal?.bigTxt}</h4>
                <p>{errorModal?.smallTxt}</p>
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

export default ErrorHandlerModal;

const AlertBox = styled.div`
  ${AlertModalCss}
  button {
    color: #3cc7a6;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
