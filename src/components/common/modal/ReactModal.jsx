import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";

// 모달 context

const ModalContext = createContext({});

export const Modal = ({ children, showModal }) => {
  const [isModal, setIsModal] = useState(showModal);
  return <ModalContext.Provider value={{ isModal, setIsModal }}>{children}</ModalContext.Provider>;
};

// 모달 트리거

const Trigger = ({ children }) => {
  const { setIsModal } = useContext(ModalContext);
  return <div onClick={() => setIsModal((prev) => !prev)}>{children}</div>;
};

// 모달 포탈

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

// 모달 백드롭

const BackDrop = ({ children, notClose, fnStartHandler }) => {
  const { isModal, setIsModal } = useContext(ModalContext);

  useEffect(() => {
    if (isModal) document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, [isModal]);

  return (
    isModal && (
      <Background
        onClick={() => {
          fnStartHandler && fnStartHandler();
          return notClose ? null : setIsModal((prev) => !prev);
        }}
        bgColor={notClose}
      >
        {children}
      </Background>
    )
  );
};

const Background = styled.section`
  position: absolute;
  width: 36rem;
  min-height: 100vh;
  z-index: 10;
  top: 0;
  background-color: ${({ bgColor }) => (bgColor ? "transparent" : "rgba(0, 0, 0, 0.3)")};
`;

// 모달 박스

const ContentBox = ({ children, XYcoordinate }) => {
  const { isModal } = useContext(ModalContext);
  return (
    isModal && (
      <ModalContent XYcoordinate={XYcoordinate} onClick={(event) => event.stopPropagation()}>
        {children}
      </ModalContent>
    )
  );
};

const ModalContent = styled.div`
  position: fixed;
  ${({ XYcoordinate }) => {
    switch (XYcoordinate) {
      case "bottom":
        return css`
          bottom: 0;
        `;
      default:
        return css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `;
    }
  }}
  z-index: 15;
`;

// 모달 닫기 버튼 감싸는 div

const Close = ({ children }) => {
  const { setIsModal } = useContext(ModalContext);
  return <div onClick={() => setIsModal(false)}>{children}</div>;
};

// 명시적 재선언

Modal.Trigger = Trigger;
Modal.BackDrop = BackDrop;
Modal.Portal = Portal;
Modal.ContentBox = ContentBox;
Modal.Close = Close;
