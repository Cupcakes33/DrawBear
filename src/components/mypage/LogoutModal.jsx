import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../common/modal/Modal";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <Modal modalHeight="15rem" onClose={onClose}>
      <StWrapper>
        <h4>로그아웃 하시겠어요 ?</h4>
        <div>
          <button onClick={() => navigate("/login")}>네</button>
          <button onClick={() => onClose(false)}>아니요</button>
        </div>
      </StWrapper>
    </Modal>
  );
};

export default LogoutModal;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.6rem;

  div {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    padding: 0 2rem;
    button {
      width: 100%;
      height: 3rem;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.05);
        &:first-child {
          background: #ef476f;
        }
        &:last-child {
          background: #06d6a0;
        }
      }
    }
  }
`;
