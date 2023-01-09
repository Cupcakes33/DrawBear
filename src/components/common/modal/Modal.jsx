import { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ModalPortal from "./ModalPotal";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);
  const closeModalHander = () => {
    onClose?.();
  };
  useOutsideClick(modalRef, closeModalHander);

  useEffect(() => {
    const body = document.querySelector("body");
    const defaultStyle = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = defaultStyle;
    };
  }, []);
  return (
    <ModalPortal>
      <StModalOverlay>
        <StModalWrapper ref={modalRef}>
          <StModalCloseBtn onClick={closeModalHander} />
          {children}
        </StModalWrapper>
      </StModalOverlay>
    </ModalPortal>
  );
};

const StModalOverlay = styled.div`
  width: 360px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  border: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const StModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 15px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
`;

const StModalCloseBtn = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  background: none;
  border: none;
  &::before {
    content: "X";
  }
`;

export default Modal;
