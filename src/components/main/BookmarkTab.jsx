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
                <div className="unConnected-user">
                  <span>아직 상대방이 없어요!</span>
                </div>
              ) : (
                <div className="connected-user">
                  <img src={invitedProfileImg} alt="상대방 프사" />
                  <span>{`${invitedNickname}님과 함께써요`}</span>
                </div>
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
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  padding: 3rem 3rem 10.6rem 3rem;
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
  .unConnected-user {
    display: block;
    text-align: center;
    margin-top: -1.5rem;
  }
  .connected-user {
    ${flex}
    margin-top: -1rem;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
