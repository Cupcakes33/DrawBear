import styled, { css } from "styled-components";

export const Input = (bgColor, width, margin) => {
  return css`
    input {
      display: block;
      width: ${width ? width : "100%"};
      height: 4.5rem;
      margin: ${margin};
      background-color: ${`${bgColor}`};
      border: none;
      outline: none;
      border-radius: 10px;
      padding: 1rem;
      ::placeholder {
        color: #b3b3b3;
      }
    }
    .pass:focus {
      border: 1px solid #3cc7a5;
      box-shadow: 0 0 5px #3cc7a5;
      transition: box-shadow 0.4s;
    }
    .fail:focus {
      border: 1px solid #ff5656;
      box-shadow: 0 0 5px #ff5656;
      transition: box-shadow 0.4s;
    }
  `;
};

export const WorningWord = ({ children, color, margin }) => {
  return (
    <ValidationText color={color ? "#ff5656" : "transparent"} margin={margin}>
      {children}
    </ValidationText>
  );
};

const ValidationText = styled.small`
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
