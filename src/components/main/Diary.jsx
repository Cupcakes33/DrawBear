import { darken } from "polished";
import styled, { css } from "styled-components";

const Diary = ({ bgColor, onClick }) => {
  return (
    <DiaryIcon bgcolor={bgColor ? bgColor : "#E9E9E9"} onClick={onClick}>
      <div />
    </DiaryIcon>
  );
};

export default Diary;

const DiaryIcon = styled.div`
  width: 20rem;
  height: 28rem;
  cursor: pointer;
  background-color: ${(props) => props.bgcolor};
  border-radius: 6px;
  div {
    position: absolute;
    top: 50%;
    right: calc(50% - 11rem);
    width: 6rem;
    height: 4.2rem;
    transform: translateY(-50%);
    border-radius: 6px;
    ${({ bgcolor }) => {
      switch (bgcolor) {
        case "#FF8181":
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
        case "#FFCA7A":
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
        case "#FFE99A":
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
        case "#A4F5A3":
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
        case "#9CDBF7":
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
        case "#BB9EFA":
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
        default:
          return css`
            background-color: ${darken(0.1, bgcolor)};
          `;
      }
    }}
  }
`;
