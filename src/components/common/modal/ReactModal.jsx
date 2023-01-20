import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { diaryModal } from "../../../redux/modules/diarySlice";

const ReactModal = ({ children }) => {
  const [backDropCancel, setBackDropCancel] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (backDropCancel) document.body.style = `overflow: hidden`;
  //   return () => (document.body.style = `overflow: auto`);
  // }, []);

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
