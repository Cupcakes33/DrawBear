import styled, { css } from "styled-components";
import { lighten, darken } from "polished";
import { flex } from "../../../UI/common";

const Button = ({ children, disabled, ...rest }) => {
  return (
    <StButton disabled={disabled} {...rest}>
      {children}
    </StButton>
  );
};

const StButton = styled.button`
  ${flex}
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: ${({ bc }) => bc};
  color: ${({ color }) => color};
  font-size: ${({ fs }) => fs};
  font-weight: ${({ fw }) => fw};
  white-space: nowrap;
  ${({ disabled }) => {
    if (!disabled) return;
    return css`
      pointer-events: none;
      opacity: 0.3;
    `;
  }}

  ${({ bc }) => {
    return css`
      &:hover {
        background-color: ${lighten(0.1, bc)};
      }
      &:active {
        background-color: ${darken(0.1, bc)};
      }
    `;
  }}

  ${({ round }) => {
    if (!round) return;
    return css`
      border-radius: 50%;
    `;
  }}

  ${({ outlined, bc }) => {
    if (!outlined) return;
    return css`
      border: 1px solid ${bc};
      background-color: var(--grayscale_2);
    `;
  }}

${({ shadow }) => {
    if (!shadow) return;
    return css`
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    `;
  }}

  ${({ size, innerPadding }) => {
    switch (size) {
      case "mini":
        return css`
          width: 6.9rem;
          height: 3.4rem;
          padding: ${innerPadding};
        `;
      case "small":
        return css`
          width: 6.6rem;
          height: 5rem;
        `;

      case "medium":
        return css`
          width: 11rem;
          height: 5rem;
        `;
      case "large":
        return css`
          width: 15rem;
          height: 5rem;
        `;
      case "f-width":
        return css`
          width: 100%;
          height: 5rem;
        `;
      default:
        return css`
          width: min-content;
          height: min-content;
          padding: ${innerPadding};
        `;
    }
  }}
`;
export default Button;
