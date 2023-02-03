import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { flex } from "../../UI/common";
import Diary from "./Diary/Diary";

const BookmarkTab = ({ diaryData }) => {
  const navigate = useNavigate();

  return (
    <BookmarkSection>
      {diaryData?.map((diary, i) => {
        const { diaryName, bookmark, diaryId, outsideColor, couple, invitedNickname, invitedProfileImg } = diary;
        return (
          <DiaryCardBox key={i}>
            <label>{diaryName}</label>
            <Diary
              bookmark={bookmark}
              diaryId={diaryId}
              size={"bookmark"}
              bgColor={outsideColor}
              onClick={() => {
                navigate(`/list/${diaryId}`);
                localStorage.removeItem("diaryName");
                localStorage.setItem("diaryName", diaryName);
              }}
            ></Diary>
            {couple === 1 ? (
              invitedNickname === null ? (
                null
              ) : (
                <ConnectedUserProfile>
                  <img src={invitedProfileImg} alt="상대방 프사" />
                  <span>{`${invitedNickname}님과 함께써요`}</span>
                </ConnectedUserProfile>
              )
            ) : null}
          </DiaryCardBox>
        );
      })}
    </BookmarkSection>
  );
};

export default BookmarkTab;

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
    font-size: 1rem;
  }
  .not-couple {
    /* margin: -2rem 0 ; */
    display: flex;
    
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const ConnectedUserProfile = styled.div`
  ${flex}
  margin-top: -1rem;
`;
