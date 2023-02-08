import styled, { css } from "styled-components";

export const flexProps = css`
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

export const flex = (
  justifyContent = "",
  alignItems = "",
  flexdirection = ""
) => {
  const jc = () => {
    switch (justifyContent) {
      case "space-between":
        return "space-between";
      case "space-evenly":
        return "space-evenly";
      case "flex-start":
        return "flex-start";
      default:
        return "center";
    }
  };

  const ai = () => {
    switch (alignItems) {
      case "flex-start":
        return "flex-start";
      default:
        return "center";
    }
  };

  const fd = () => {
    switch (flexdirection) {
      case "column":
        return "column";
      case "row":
        return "row";
      default:
        return "";
    }
  };

  return css`
    display: flex;
    justify-content: ${jc()};
    align-items: ${ai()};
    flex-direction: ${fd()};
  `;
};

export const StSection = styled.section`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 13.2rem);
  background-color: white;
  position: relative;
  overflow-x: hidden;
  padding: 1rem;
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
  height: 7.2rem;
  background-color: #f8f8f8;
`;
