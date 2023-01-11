import styled, { css } from "styled-components";

const flexProps = css`
  ${(props) =>
    props.flex &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  flex-direction: ${(props) => props.derection};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

export const StContainer = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  ${flexProps}
`;

export const StHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  position: relative;
  padding: 20px;
  ${flexProps}
`;

export const StSection = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
  position: relative;
  overflow-x: scroll;
  padding: 20px;
  ${flexProps}
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
