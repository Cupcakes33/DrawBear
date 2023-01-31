import styled, { css } from "styled-components";

export const Input = () => {
  return css`
    input {
      width: 100%;
      height: 4.5rem;
      border: none;
      border-radius: 10px;
      padding: 1rem;
      transition: box-shadow 0.4s;
      ::placeholder {
        color: #dedede;
      }
    }
    .pass:focus {
      border: 1px solid #3cc7a5;
      box-shadow: 0 0 5px #3cc7a5;
      outline: none;
    }
    .fail:focus {
      border: 1px solid #ff5656;
      box-shadow: 0 0 5px #ff5656;
      outline: none;
    }
  `;
};

export const WorningWord = ({ children, color }) => {
  return <ValidationText color={color ? "#ff5656" : "transparent"}>{children}</ValidationText>;
};

const ValidationText = styled.small`
  color: ${({ color }) => color};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
