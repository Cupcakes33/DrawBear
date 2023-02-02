import React, { useCallback, useState, useEffect, memo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import DiaryCard from "../components/FullList/DiaryCard";
import HeaderText from "../components/header/HeaderText";
import { StContainer, StHeader, StSection } from "../UI/common";
import Button from "../components/common/Button";
import { TiPencil } from "react-icons/ti";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { diaryApi } from "../apis/axios";
import NavigateBtn from "../components/common/NavigateBtn";
import { BsSearch } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import DiarySettingModal from "../components/main/DiarySettingModal/DiarySettingModal";
import CalendarModal from "../components/calendar/CalendarModal";
import FilterDropdown from "../components/common/dropdown/FilterDropdown";
import Loading from "../components/common/Loading";
import { useTransition } from "react";
import SearchHeader from "../components/FullList/SearchHeader";
import Buttons from "../components/common/Button/Buttons";

const DiaryList = memo(() => {
  const navigate = useNavigate();
  const diaryName = localStorage.getItem("diaryName");
  const [changeHeader, setChangeHeader] = useState(false);
  const [dateOrderedPosts, setDateOrderedPosts] = useState({});
  const [filter, setFilter] = useState("최신순");

  const diaryId = useParams().id;
  const { data, error, isError, isLoading } = useQuery(["Allposts"], () =>
    diaryApi.get(diaryId)
  );

  const orderPostsByDate = (data) => {
    const orderedPosts = {};
    if (!isLoading) {
      data.forEach((item) => {
        const temp = item.createdAt.slice(0, 10);
        if (orderedPosts[temp]) {
          orderedPosts[temp].push(item);
        } else {
          orderedPosts[temp] = [item];
        }
      });
    }
    return orderedPosts;
  };

  const locailDate = (date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const defaultHeader = () => {
    return (
      <StDefaultHeaderContents>
        <div>
          <NavigateBtn prev link="/" />
          <HeaderText>{diaryName}</HeaderText>
        </div>
        <div className="default-header-configBox">
          <BsSearch onClick={() => setChangeHeader(true)} />
          <DiarySettingModal diaryName={diaryName} diaryId={diaryId}>
            <AiOutlineSetting />
          </DiarySettingModal>
        </div>
      </StDefaultHeaderContents>
    );
  };

  useEffect(() => {
    if (!data) return;
    setDateOrderedPosts(orderPostsByDate(data));
  }, [data]);

  if (!data) return <Loading />;
  return (
    <>
      <StContainer>
        <StHeader>
          {!changeHeader && defaultHeader()}
          {changeHeader && <SearchHeader setChangeHeader={setChangeHeader} />}
        </StHeader>
        <StFilterContainer>
          <FilterDropdown filter={filter} setFilter={setFilter} />
        </StFilterContainer>
        {/* 섹션 컴포넌트 height 100vh 로 바꾸기 */}
        <StSection>
          {(() => {
            switch (filter) {
              case "최신순":
                return Object.keys(dateOrderedPosts).map((date, n) => {
                  return (
                    <StDiaryCarsWrapper key={`orderedPosts${n}`}>
                      <div className="orderedDate">{locailDate(date)}</div>
                      {dateOrderedPosts[date].map((post, n) => {
                        return (
                          <DiaryCard key={`postData${n}`} postData={post} />
                        );
                      })}
                      <StDivisionLine />
                    </StDiaryCarsWrapper>
                  );
                });
              case "오래된순":
                return Object.keys(dateOrderedPosts)
                  .reverse()
                  .map((date, n) => {
                    return (
                      <StDiaryCarsWrapper key={`orderedPosts${n}`}>
                        <div className="orderedDate">{locailDate(date)}</div>
                        {dateOrderedPosts[date].map((post, n) => {
                          return (
                            <DiaryCard key={`postData${n}`} postData={post} />
                          );
                        })}
                        <StDivisionLine />
                      </StDiaryCarsWrapper>
                    );
                  });
              case "북마크":
                return Object.keys(dateOrderedPosts).map((date, n) => {
                  return (
                    <StDiaryCarsWrapper key={`orderedPosts${n}`}>
                      <div className="orderedDate">{locailDate(date)}</div>
                      {dateOrderedPosts[date]
                        .filter((post) => post.bookmark)
                        .map((post, n) => {
                          return (
                            <DiaryCard key={`postData${n}`} postData={post} />
                          );
                        })}
                      <StDivisionLine />
                    </StDiaryCarsWrapper>
                  );
                });
              default:
                return null;
            }
          })()}
        </StSection>

        <StNavigateWritePageBtnWrapper>
          <Buttons.AddPost
            onClick={() => {
              navigate(`/write/${diaryId}`);
            }}
          />
        </StNavigateWritePageBtnWrapper>
      </StContainer>
    </>
  );
});

export default DiaryList;

const StNavigateWritePageBtnWrapper = styled.div`
  position: fixed;
  right: calc(50% - 15.5rem);
  bottom: 3rem;
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

const StDiaryCarsWrapper = styled.div`
  .orderedDate {
    width: min-content;
    white-space: nowrap;
    background: #f5f5f5;
    padding: 0.5rem 1.5rem;
    font-size: 1.9rem;
    font-weight: 700;
    border-radius: 25px;
    margin-bottom: 2rem;
  }
`;

const StFilterContainer = styled.div`
  position: absolute;
  z-index: 10;
  right: 2.2rem;
  top: 7.5rem;
`;
