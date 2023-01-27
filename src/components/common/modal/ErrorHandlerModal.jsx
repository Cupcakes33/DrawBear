import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ErrorModal } from "../../../redux/modules/UISlice";
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
        <Modal.BackDrop notClose>
          <Modal.ContentBox>
            <AlertBox>
              <div className="text-box">
                <h4>{errorModal?.bigTxt}</h4>
                <p>{errorModal?.smallTxt}</p>
              </div>
              <hr />
              <Modal.Close>
                <button className="confirm" onClick={ConfirmReactionHandler}>
                  확인
                </button>
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
