import styled, { css } from "styled-components";

export const StContainer = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
`;

export const StHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  position: relative;
  ${(props) =>
    props.flexCenter &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

export const StSection = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
  position: relative;
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
