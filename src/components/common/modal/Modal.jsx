import { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ModalPortal from "./ModalPotal";

const Modal = ({
  onClose,
  children,
  modalWidth = "300px",
  modalHeight = "200px",
  top = "50%",
  bottom,
  left = "50%",
  right,
  translate = "-50%, -50%",
}) => {
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
          top={top}
          bottom={bottom}
          right={right}
          left={left}
          translate={translate}
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
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.modalWidth};
  height: ${(props) => props.modalHeight};
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
  transform: translate(${(props) => props.translate});
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
