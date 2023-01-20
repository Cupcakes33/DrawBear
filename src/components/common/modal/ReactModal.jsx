import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { diaryModal } from "../../../redux/modules/diarySlice";

const ReactModal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <BackDrop onClick={() => dispatch(diaryModal({ isModal: false }))}>
      <div>{children}</div>
    </BackDrop>
  );
};

export default ReactModal;

const BackDrop = styled.section`
  position: absolute;
  width: 36rem;
  min-height: 100vh;
  z-index: 5;
  top: 0;
  background-color: rgba(3, 3, 3, 0.3);
`;
