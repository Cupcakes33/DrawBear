import styled, { css } from "styled-components";

export const Input = () => {
  return css`
    input {
      width: 100%;
      height: 4.5rem;
      border: none;
      border-radius: 10px;
      padding: 1rem;
      outline: none;
      ::placeholder {
        color: #dedede;
      }
    }
    .pass:focus {
      border: 1px solid #3cc7a5;
      box-shadow: 0 0 5px #3cc7a5;
      transition: box-shadow 0.5s;
    }
    .fail:focus {
      border: 1px solid #ff5656;
      box-shadow: 0 0 5px #ff5656;
      transition: box-shadow 0.5s;
    }
  `;
};

export const WorningWord = ({ children, color }) => {
  console.log(color);
  return <ValidationText color={color ? "#ff5656" : "transparent"}>{children}</ValidationText>;
};

const ValidationText = styled.small`
  color: ${({ color }) => color};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
