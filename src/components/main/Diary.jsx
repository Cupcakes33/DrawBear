import styled, { css } from "styled-components";

const Diary = ({ color }) => {
  return (
    <DiaryIcon bgcolor={color ? color : "#E9E9E9"}>
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
    border-radius: 6px;
    ${({ bgcolor }) => {
      switch (bgcolor) {
        case "#FF8181":
          return css`
            background-color: white;
          `;
        case "#FFCA7A":
          return css`
            background-color: white;
          `;
        case "#FFE99A":
          return css`
            background-color: white;
          `;
        case "#A4F5A3":
          return css`
            background-color: #9fe0b5;
          `;
        case "#9CDBF7":
          return css`
            background-color: white;
          `;
        case "#BB9EFA":
          return css`
            background-color: white;
          `;
        default:
          return css`
            background-color: #c8c8c8;
          `;
      }
    }}
  }
`;
