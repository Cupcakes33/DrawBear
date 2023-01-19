import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

const Button = ({
  children,
  icon,
  color,
  size,
  outlined,
  round,
  fullWidth,
  ...rest
}) => {
  return (
    <StButton
      colorProp={color ? color : "button_main"}
      size={size ? size : "mini"}
      outlined={outlined}
      round={round}
      fullWidth={fullWidth}
      {...rest}
    >
      {icon ? (
        <StButtonInner>
          <>{icon}</>
        </StButtonInner>
      ) : (
        <>{children}</>
      )}
    </StButton>
  );
};

export default Button;

// button_main: "#EEEEEE",
// button_primary: "#3CC7A6",
// button_alart: "#FF7070",
// button_icon: "#CDCDCD"

const colorStyle = css`
  ${({ theme, colorProp }) => {
    const colorProps = theme.color[colorProp];
    let fontColor;
    colorProp === "button_main"
      ? (fontColor = "#4B4B4B")
      : (fontColor = "#FFFFFF");

    return css`
      background-color: ${colorProps};
      color: ${fontColor};

      &:hover {
        background-color: ${lighten(0.1, colorProps)};
        color: ${fontColor};
        ${colorProp === "button_main"
          ? css`
              background-color: ${(props) => props.theme.color.button_icon};
            `
          : null}
      }
      &:active {
        background-color: ${darken(0.1, colorProps)};
        color: ${fontColor};
      }

      ${(props) =>
        props.outlined &&
        css`
          color: ${colorProps};
          background-color: #f5f5f5;
          border: 1px solid ${colorProps};
        `}
    `;
  }}
`;

const sizes = {
  mini: {
    width: "min-content",
    height: "3.2rem",
    padding: "0.5rem 1rem",
  },
  small: {
    width: "6.6rem",
    height: "4rem",
  },
  medium: {
    width: "11rem",
    height: "4rem",
  },
  large: {
    width: "15rem",
    height: "4rem",
  },
};

const sizeStyle = css`
  ${({ size }) => css`
    width: ${sizes[size].width};
    height: ${sizes[size].height};
    padding: ${sizes[size].padding};
  `}
`;

const fullWidth = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      height: 4rem;
      align-items: center;
      justify-content: center;
    `}
`;

const round = css`
  ${(props) =>
    props.round &&
    css`
      border-radius: 50%;
      width: min-content;
      height: min-content;
      padding: 1rem;
      font-size: 2rem;
    `}
`;

const StButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  font-weight: ${({ fw }) => (fw ? fw : 400)};
  ${sizeStyle}
  ${colorStyle}
  ${fullWidth}
  ${round}
`;

const StButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
