import styled, { css } from "styled-components";

export const StContainer = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
`;

export const StWrapper = styled.div`
  width: 31.2rem;
  margin: 1.8rem auto;
`;

export const StHeader = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #EEEEEE;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    /* ${(props) =>
    props.flexCenter &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `} */
  }
`;

export const StSection = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
  overflow-x: scroll;
`;

export const StFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: #f8f8f8;
`;
