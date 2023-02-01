import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Toast = ({ nickName, setPopup, text }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopup(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [setPopup]);
  return (
    <>
      <ToastContainer>
        {nickName}
        {text}
      </ToastContainer>
    </>
  );
};
export default Toast;
const ToastContainer = styled.div`
  background-color: #f5f5f5;
  color: #242424;
  width: 31.6rem;
  height: 5.3rem;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
  line-height: 5.3rem;
  border-radius: 1rem;
  position: absolute;
  bottom: 0;
`;
