import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ErrorModal } from "../../../redux/modules/UISlice";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { mainApi } from "../../../apis/axios";
import ErrorHandlerModal from "../../common/modal/ErrorHandlerModal";

const BookmarkStar = ({ bookmark, diaryId }) => {
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
    <>
      <BookmarkStarDiv onClick={bookmarkHandler}>{bookmark === 0 ? <AiOutlineStar /> : <AiFillStar />}</BookmarkStarDiv>
    </>
  );
};

export default BookmarkStar;

const BookmarkStarDiv = styled.div`
  float: left;
  margin: 10% 0 0 10%;
  width: 3rem;
  font-size: 2.5rem;
  color: #fdcb6e;
  cursor: pointer;
`;
