import { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ModalPortal from "./ModalPotal";

const Modal = ({ onClose, children, modalWidth, modalHeight }) => {
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
        <StModalWrapper
          ref={modalRef}
          modalWidth={modalWidth}
          modalHeight={modalHeight}
        >
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
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.modalWidth || "300px"};
  height: ${(props) => props.modalHeight || "200px"};
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const StModalCloseBtn = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  background: none;
  border: none;
  cursor: pointer;
  &::before {
    content: "X";
  }
`;

export default Modal;
