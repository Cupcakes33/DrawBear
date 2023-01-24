import { darken } from "polished";
import styled, { css } from "styled-components";
import BookmarkStar from "./BookmarkStar";

const Diary = (props) => {
  const { size, bgColor, onClick, bookmark, diaryId } = props;

  return (
    <DiaryIcon size={size} bgcolor={bgColor ? bgColor : "#E9E9E9"} onClick={onClick}>
      <BookmarkStar bookmark={bookmark} diaryId={diaryId} />
      <div className="diaryHolder" />
    </DiaryIcon>
  );
};

export default Diary;

const DiaryIcon = styled.div`
  ${({ size }) => {
    switch (size) {
      case "bookmark":
        return css`
          width: 13.4rem;
          height: 17.9rem;
        `;
      default:
        return css`
          width: 20rem;
          height: 28rem;
        `;
    }
  }}
  cursor: pointer;
  background-color: ${(props) => props.bgcolor};
  border-radius: 6px;
  .diaryHolder {
    position: relative;
    top: 50%;
    left: calc(50% + 25%);
    transform: translateY(-50%);
    ${({ size }) => {
      switch (size) {
        case "bookmark":
          return css`
            width: 4.2rem;
            height: 2.9rem;
          `;
        default:
          return css`
            width: 6rem;
            height: 4.2rem;
          `;
      }
    }}
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
