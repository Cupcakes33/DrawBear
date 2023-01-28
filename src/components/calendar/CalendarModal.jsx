import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { diaryApi } from "../../apis/axios";
import { Modal } from "../common/modal/ReactModal";

const CalendarModal = ({ children }) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDate, setSelectedDate] = useState("");

  const { data = [], isLoading, isError } = useQuery(["holiday", selectedYear], () => diaryApi.holiday(selectedYear));
  const queryClient = useQueryClient();

  const holiday = data?.map((v) => v.locdate);

  const week = useMemo(() => {
    return ["일", "월", "화", "수", "목", "금", "토"];
  }, []);
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  }, [selectedMonth]);

  const returnWeek = useCallback(() => {
    return week.map((v, i) => (
      <div key={i} className={v === "일" ? "weekday sunday" : v === "토" ? "weekday saturday" : "weekday"}>
        {v}
      </div>
    ));
  }, [week]);

  // 주호님 방식에 맞춰서 둘 중 하나로 로직 수정
  // 1. setquerydata를 이용해 캐시를 변경할 경우 -> 복사본 만들어서 복사본을 달력 표시로 쓰고 원본을 수정해 렌더링 변화주기
  // 2. 캐시 건드리지 않고 임의의 변수 or 상수를 만들어서 렌더링에 사용하실 경우 -> 만들어 놓은 것에 덮어 씌워 렌더링 변화주기
  const postsMonthFilterFn = useCallback(() => {
    const postsYear = queryClient
      ?.getQueryData(["Allposts"])
      .filter((post) => +post.createdAt.split("-")[0] === selectedYear);
    const postsMonth = postsYear?.filter((post) => +post.createdAt.split("-")[1] === selectedMonth);
    console.log(postsMonth);
    return postsMonth;
  }, [selectedYear, selectedMonth, queryClient]);

  const returnDay = useCallback(() => {
    let dayArr = [];
    const holidayMonth = holiday.filter((v) => parseInt(String(v).substring(4, 6)) === selectedMonth);
    const holidayDate = holidayMonth.map((v) => parseInt(String(v).substring(6, 8)));
    const postsDate = postsMonthFilterFn().map((post) => +post.createdAt.split("-")[2].split("T")[0]);

    const holidayCompareFn = (i) => {
      for (let h = 0; h <= holidayDate.length; h++) {
        if (holidayDate[h] === i) return true;
      }
    };

    const postedDayCompareFn = (i) => {
      for (let p = 0; p <= postsDate.length; p++) {
        if (postsDate[p] === i) return true;
      }
    };

    const dayColor = (i) => {
      if (postedDayCompareFn(i)) return "postedDay";
      else if (new Date(selectedYear, selectedMonth - 1, i).getDay() === 0 || holidayCompareFn(i)) return "redDay";
      else if (new Date(selectedYear, selectedMonth - 1, i).getDay() === 6) return "saturday";
    };

    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          dayArr.push(
            <SpecialDate key={i} color={dayColor(i)} onClick={() => setSelectedDate(i)}>
              {i}
            </SpecialDate>
          );
        }
      } else {
        dayArr.push(<div key={today}></div>);
      }
    }
    return dayArr;
  }, [selectedMonth, holiday]);

  const selectedDatePostSearch = () => {
    const selectedDayPost = postsMonthFilterFn().filter(
      (post) => +post.createdAt.split("-")[2].split("T")[0] === selectedDate
    );
    queryClient.setQueryData(["Allposts"], selectedDayPost);
  };

  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Portal>
        <Modal.BackDrop>
          <Modal.ContentBox XYcoordinate="bottom">
            <CalendarContainer>
              {isLoading ? (
                <h2>로딩 중...</h2>
              ) : isError ? (
                <h2>서버 연결 실패</h2>
              ) : (
                <>
                  <StHeader>
                    <h3>{`${selectedYear}년 ${selectedMonth}월`}</h3>
                    <div className="buttons">
                      <div>
                        <button onClick={selectedDatePostSearch}>조회</button>
                        <button onClick={() => prevMonth()}>이전 달</button>
                        <button onClick={() => nextMonth()}>다음 달</button>
                      </div>
                    </div>
                  </StHeader>
                  <StWeek>{returnWeek()}</StWeek>
                  <StDate>{returnDay()}</StDate>
                </>
              )}
            </CalendarContainer>
          </Modal.ContentBox>
        </Modal.BackDrop>
      </Modal.Portal>
    </Modal>
  );
};

export default CalendarModal;

const CalendarContainer = styled.section`
  width: 36rem;
  height: 40rem;
  padding: 2rem 2rem;
  border: 1px solid black;
  border-radius: 20px 20px 0px 0px;
  background-color: white;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: #242424
  margin-bottom: 2rem;
  .buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const StWeek = styled.div`
  display: flex;
  .weekday {
    width: calc(36rem / 7);
    text-align: center;
    color: #242424;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: #ff5656;
  }
`;

const StDate = styled.div`
  margin-top: 2rem;
  div {
    float: left;
    width: calc(36rem / 7);
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    height: 5rem;
    color: whitesmoke;
  }
`;

const SpecialDate = styled.button`
  float: left;
  width: calc(36rem / 7);
  margin-left: -0.3rem;
  margin-right: -0.3rem;
  height: 5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  :hover {
    border: 1px solid black;
    border-radius: 100%;
  }
  :focus {
    border: 1px solid black;
    border-radius: 100%;
    background-color: black;
    color: whitesmoke;
  }
  ${({ color }) => {
    switch (color) {
      case "redDay":
        return css`
          color: #ff5656;
        `;
      case "saturday":
        return css`
          color: blue;
        `;
      case "postedDay":
        return css`
          border-radius: 100%;
          background-color: #b3e9dc;
        `;
      default:
        return css`
          color: #242424;
        `;
    }
  }}
`;
