import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Diary from "./Diary/Diary";

const Bookmark = ({ diaryData }) => {
  const navigate = useNavigate();

  console.log(diaryData);

  return (
    <BookmarkSection>
      {diaryData.map((diary, i) => {
        return (
          <DiaryCardBox key={i}>
            <label>{diary.diaryName}</label>
            <Diary
              size={"bookmark"}
              bgColor={diary.outsideColor}
              onClick={() => {
                navigate(`/list/${diary.diaryId}`);
                localStorage.removeItem("diaryName");
                localStorage.setItem("diaryName", diary.diaryName);
              }}
            ></Diary>
            {diary.couple === 1 && <span>{`${diary.invitedNickname}님과 함께써요`}</span>}
          </DiaryCardBox>
        );
      })}
    </BookmarkSection>
  );
};

export default Bookmark;

const BookmarkSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  padding: 3rem;
`;

const DiaryCardBox = styled.div`
  display: block;
  label {
    display: block;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  span {
    display: flex;
    justify-content: center;
    font-size: 1rem;
  }
`;
