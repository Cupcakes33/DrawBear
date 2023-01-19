import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import DiaryCard from "../components/FullList/DiaryCard";
import DiarySetting from "../components/FullList/DiarySetting";
import Back from "../components/header/Back";
import HeaderText from "../components/header/HeaderText";
import { StHeader, StSection } from "../UI/common";
import CommonContainer from "../UI/CommonContainer";
import Button from "../components/common/Button";
import { TiPencil } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { diaryApi } from "../apis/axios";

const DiaryList = () => {
  const navigate = useNavigate();
  // diaryId를 받아서 해당 일기를 보여주는 페이지로 이동
  const [changeHeader, setChangeHeader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const diaryId = useParams().id;
  const { data, error, isError, isLoading } = useQuery(["posts"], () =>
    diaryApi.get(diaryId)
  );
  let filtedPosts = {};

  if (!isLoading) {
    data.forEach((item) => {
      console.log(item.createdAt);
      const temp = item.createdAt.slice(0, 10);
      if (filtedPosts[temp]) {
        filtedPosts[temp].push(item);
      } else {
        filtedPosts[temp] = [item];
      }
    });
  }

  const defaultHeader = useCallback(() => {
    return (
      <>
        <div>
          <Back />
          <HeaderText>다이어리 제목</HeaderText>
        </div>
        <div>
          <button onClick={() => setChangeHeader(true)}>검색</button>
          <button onClick={() => setIsSettingModal(true)}>설정</button>
        </div>
      </>
    );
  }, []);

  const SearchHeader = useCallback(() => {
    return (
      <>
        <div>
          <button>검색</button>
          <StInput placeholder="일기 검색..." />
        </div>
        <div>
          <button onClick={() => setIsModal(true)}>달력</button>
          <button onClick={() => setChangeHeader(false)}>취소</button>
        </div>
      </>
    );
  }, []);

  if (!data) return <div>로딩중</div>;
  return (
    <>
      {isModal && <Calendar onClose={setIsModal} />}
      {isSettingModal && <DiarySetting onClose={setIsSettingModal} />}
      <CommonContainer>
        <StHeader flexBetween>
          {!changeHeader && defaultHeader()}
          {changeHeader && SearchHeader()}
        </StHeader>
        <StSection>
          <Filter>최신순</Filter>
          {Object.keys(filtedPosts).map((date, n) => {
            return (
              <div key={`dateFilter${n}`}>
                <h2>{date}</h2>
                {filtedPosts[date].map((post, n) => {
                  return <DiaryCard key={`postData${n}`} postData={post} />;
                })}
              </div>
            );
          })}
        </StSection>
        <StNavigateWritePageBtnWrapper>
          <Button
            size="mini"
            color="button_primary"
            fs="4rem"
            icon={<TiPencil />}
            round
            onClick={() => {
              navigate(`/write/${diaryId}`);
            }}
          />
        </StNavigateWritePageBtnWrapper>
      </CommonContainer>
    </>
  );
};

export default DiaryList;

const Filter = styled.div`
  float: right;
  margin-top: 3rem;
  margin-right: 4rem;
  font-size: 1.3rem;
`;

const StNavigateWritePageBtnWrapper = styled.div`
  position: fixed;
  right: calc(50% - 15.5rem);
  bottom: 3rem;
`;

const StInput = styled.input`
  width: 20rem;
  font-size: 1.7rem;
  border: 0;
  outline: none;
  background-color: inherit;
  padding: 1rem 0.3rem 1rem 0;
  :focus {
    border: 0;
    border-bottom: 1px solid black;
  }
`;
