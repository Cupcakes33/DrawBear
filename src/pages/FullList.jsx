import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import DiaryCard from "../components/FullList/DiaryCard";
import DiarySetting from "../components/FullList/DiarySetting";
import HeaderText from "../components/header/HeaderText";
import { StContainer, StHeader, StSection } from "../UI/common";
import Button from "../components/common/Button";
import { TiPencil } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { diaryApi } from "../apis/axios";
import NavigateBtn from "../components/common/NavigateBtn";
import { BsSearch } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";

const DiaryList = () => {
  const navigate = useNavigate();
  const { diaryName } = useLocation().state;
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
      const temp = item.createdAt.slice(0, 10);
      if (filtedPosts[temp]) {
        filtedPosts[temp].push(item);
      } else {
        filtedPosts[temp] = [item];
      }
    });
  }

  const locailDate = (date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const defaultHeader = useCallback(() => {
    return (
      <StDefaultHeaderContents>
        <div>
          <NavigateBtn prev />
          <HeaderText>{diaryName}</HeaderText>
        </div>
        <div className="default-header-configBox">
          <BsSearch onClick={() => setChangeHeader(true)} />
          <AiOutlineSetting onClick={() => setIsSettingModal(true)} />
        </div>
      </StDefaultHeaderContents>
    );
  }, []);

  const SearchHeader = useCallback(() => {
    return (
      <StSearchHeaderContents>
        <div>
          <StInput placeholder="일기 검색..." />
        </div>
        <div>
          <BsSearch />
          <FaRegCalendarAlt onClick={() => setIsModal(true)} />
          <button onClick={() => setChangeHeader(false)}>취소</button>
        </div>
      </StSearchHeaderContents>
    );
  }, []);

  if (!data) return <div>로딩중</div>;
  return (
    <>
      {isModal && <Calendar onClose={setIsModal} />}
      {isSettingModal && <DiarySetting onClose={setIsSettingModal} />}
      <StContainer>
        <StHeader>
          {!changeHeader && defaultHeader()}
          {changeHeader && SearchHeader()}
        </StHeader>
        <StSection>
          <Filter>최신순</Filter>
          {Object.keys(filtedPosts).map((date, n) => {
            return (
              <div key={`dateFilter${n}`}>
                <h2>{locailDate(date)}</h2>
                {filtedPosts[date].map((post, n) => {
                  return <DiaryCard key={`postData${n}`} postData={post} />;
                })}
                <StDivisionLine />
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
      </StContainer>
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
  font-size: 1rem;
  border: none;
  border-radius: 15px;
  outline: none;
  background-color: #f0f0f0;
  padding: 1rem 2rem;
  :focus {
  }
`;

const StDivisionLine = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e5e5;
  margin: 2rem 0;
`;

const StDefaultHeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
  }
  .default-header-configBox {
    gap: 1.5rem;
    svg {
      font-size: 2rem;
      cursor: pointer;
    }
  }
`;

const StSearchHeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    gap: 2rem;
    button {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color.button_primary};
      border: 0;
      outline: none;
      background-color: inherit;
      cursor: pointer;
    }
  }
`;
