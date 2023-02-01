import { useCallback, useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import DiaryCard from "../components/FullList/DiaryCard";
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
import DiarySettingModal from "../components/main/DiarySettingModal/DiarySettingModal";
import CalendarModal from "../components/calendar/CalendarModal";
import { useEffect } from "react";
import FilterDropdown from "../components/common/dropdown/FilterDropdown";
import Loading from "../components/common/Loading";

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

  const defaultHeader = useCallback(() => {
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
  }, []);

  const SearchHeader = useCallback(() => {
    return (
      <StSearchHeaderContents>
        <div>
          <StInput placeholder="일기 검색..." />
        </div>
        <div>
          <BsSearch />
          <CalendarModal>
            <FaRegCalendarAlt />
          </CalendarModal>
          <button onClick={() => setChangeHeader(false)}>취소</button>
        </div>
      </StSearchHeaderContents>
    );
  }, []);

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
          {changeHeader && SearchHeader()}
        </StHeader>
        <StFilterContainer>
          <FilterDropdown filter={filter} setFilter={setFilter} />
        </StFilterContainer>
        {filter === "최신순" && (
          <StSection>
            {Object.keys(dateOrderedPosts).map((date, n) => {
              return (
                <StDiaryCarsWrapper key={`orderedPosts${n}`}>
                  <div className="orderedDate">{locailDate(date)}</div>
                  {dateOrderedPosts[date].map((post, n) => {
                    return <DiaryCard key={`postData${n}`} postData={post} />;
                  })}
                  <StDivisionLine />
                </StDiaryCarsWrapper>
              );
            })}
          </StSection>
        )}
        {filter === "오래된순" && (
          <StSection>
            {Object.keys(dateOrderedPosts)
              .reverse()
              .map((date, n) => {
                return (
                  <StDiaryCarsWrapper key={`orderedPosts${n}`}>
                    <div className="orderedDate">{locailDate(date)}</div>
                    {dateOrderedPosts[date].map((post, n) => {
                      return <DiaryCard key={`postData${n}`} postData={post} />;
                    })}
                    <StDivisionLine />
                  </StDiaryCarsWrapper>
                );
              })}
          </StSection>
        )}
        {filter === "북마크" && (
          <StSection>
            {Object.keys(dateOrderedPosts).map((date, n) => {
              return (
                <StDiaryCarsWrapper key={`orderedPosts${n}`}>
                  <div className="orderedDate">{locailDate(date)}</div>
                  {dateOrderedPosts[date]
                    .filter((post) => post.bookmark)
                    .map((post, n) => {
                      return <DiaryCard key={`postData${n}`} postData={post} />;
                    })}
                  <StDivisionLine />
                </StDiaryCarsWrapper>
              );
            })}
          </StSection>
        )}

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
});

export default DiaryList;

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
