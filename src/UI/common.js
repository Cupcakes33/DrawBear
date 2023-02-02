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

export const flex = (justifyContent = "", alignItems = "", flexdirection = "") => {
  const jc = () => {
    switch (justifyContent) {
      case "between":
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
  `
}


// display: flex;
// flex-direction: ${({ row = "row" }) => (row ? "row" : "column")};
// justify-content: ${({ justify = "center" }) => justify};
// align-items: ${({ align = "center" }) => align};
// gap: ${({ gap }) => `${gap}px`};
// `;

export const StContainer = styled.div`
  position: relative;
  width: 36rem;
  height: 100%;
  min-height: 100vh;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.bgColor ? props.bgColor : "#F8F8F8"};
  padding-top: ${(props) => props.top};
  overflow-x: hidden;
  ${flexProps}
`;

export const StWrapper = styled.div`
  width: 31.2rem;
  /* margin: 1.8rem auto; */
`;

export const StHeader = styled.header`
  display: flex;
  width: 100%;
  height: 6rem;
  padding: 2rem;
  position: sticky;
  top: 0;
  ${flexProps}
  span {
    color: #3cc7a6;
    cursor: pointer;
  }
`;

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

export const DisplayDiv = styled.div`
  ${flexProps}
`;
