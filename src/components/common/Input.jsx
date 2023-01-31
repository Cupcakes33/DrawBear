import { css } from "styled-components";

export const Input = () => {
  return css`
    input {
      width: 100%;
      height: 4.5rem;
      border: none;
      border-radius: 10px;
      padding: 1rem;
      outline: none;
      transition: box-shadow 0.4s;
      ::placeholder {
        color: #dedede;
      }
    }
    .pass:focus {
      border: 1px solid #3cc7a5;
      box-shadow: 0 0 5px #3cc7a5;
    }
    .fail:focus {
      border: 1px solid #ff5656;
      box-shadow: 0 0 5px #ff5656;
    }
  `;
};
