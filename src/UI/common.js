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

export const StWrapper = styled.div`
  width: 31.2rem;
  margin: 1.8rem auto;
`;

export const StHeader = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #EEEEEE;
  justify-content: ${(props) => props.flexCenter && "center"};
  justify-content: ${(props) => props.flexBetween && "space-between"};
  align-items: center;
  position: sticky;
  top: 0;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
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

export const Add = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #d9d9d9;
  border: 0;
  border-radius: 100%;
  box-shadow: 0 1px 2px;
  ${({ page }) => {
    switch (page) {
      case "main":
        return css`
        width: 4.8rem;
        height: 4.8rem;
        top: 80%;
        left: calc(50% - 2.5rem);
        `;
      case "list":
        return css`
        width: 6.9rem;
        height: 6.9rem;
        top: 90%;
        right: calc(50% - 15.5rem);
        `;
      default:
        return css`
          width: 6.9rem;
          height: 6.9rem;
          `
    }
  }}
`;