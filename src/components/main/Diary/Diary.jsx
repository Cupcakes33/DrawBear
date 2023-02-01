import { useMutation, useQueryClient } from "@tanstack/react-query";
import { darken } from "polished";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { mainApi } from "../../../apis/axios";
import { ErrorModal } from "../../../redux/modules/UISlice";
import bookmarked from "../../../assets/images/bookmarked.webp";
import unbookmarked from "../../../assets/images/unbookmarked.webp";

const Diary = (props) => {
  const { size, bgColor, onClick, bookmark, diaryId } = props;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate } = useMutation(["diary"], (diaryId) => mainApi.bookmark(diaryId), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 401) dispatch(ErrorModal({ isModal: true, bigTxt: "권한이 없습니다." }));
      else if (status === 404)
        dispatch(
          ErrorModal({
            isModal: true,
            bigTxt: "존재하지 않는 다이어리입니다.",
          })
        );
      else if (status === 500)
        dispatch(
          ErrorModal({
            isModal: true,
            bigTxt: "북마크 저장 및 삭제에 실패했습니다.",
          })
        );
    },
    onSuccess: () => {
      const diaryData = queryClient.getQueryData(["main"])?.diaries;
      queryClient.setQueryData(["main"], {
        diaries: diaryData?.map((diary) =>
          diary.diaryId === diaryId ? { ...diary, bookmark: diary.bookmark === 0 ? 1 : 0 } : diary
        ),
      });
    },
  });

  const bookmarkHandler = (event) => {
    event.stopPropagation();
    mutate(diaryId);
  };

  return (
    <DiaryIcon size={size} bgcolor={bgColor ? bgColor : "#E9E9E9"} onClick={onClick}>
      {bookmark === 0 ? (
        <img src={unbookmarked} alt="노북마크" className="bookmark" onClick={bookmarkHandler} />
      ) : (
        <img src={bookmarked} alt="북마크" className="bookmark" onClick={bookmarkHandler} />
      )}
      <div className="diaryHolder" />
    </DiaryIcon>
  );
};

export default Diary;

const DiaryIcon = styled.div`
  margin-bottom: 1.3rem;
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
  .bookmark {
    float: left;
    margin: -3% 0 0 3%;
    width: 3.5rem;
    height: 4.7rem;
    cursor: pointer;
    ${({ size }) => {
      switch (size) {
        case "bookmark":
          return css`
            width: 3rem;
            height: 3.7rem;
          `;
        default:
          return css`
            width: 3.5rem;
            height: 4.7rem;
          `;
      }
    }};
  }
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
