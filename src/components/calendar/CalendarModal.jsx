import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { diaryApi } from "../../apis/axios";
import { Modal } from "../common/modal/ReactModal";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FiChevronDown } from "react-icons/fi";
import YearSelectModal from "./YearSelectModal";

const CalendarModal = ({ children }) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDate, setSelectedDate] = useState();
  const [showMonth, setShowMonth] = useState(false);

  const { data = [], isLoading, isError } = useQuery(["holiday", selectedYear], () => diaryApi.holiday(selectedYear));
  const queryClient = useQueryClient();

  const holiday = data?.map((v) => v.locdate);

  const months = useCallback(() => {
    let monthArr = [];
    for (let i = 1; i < 13; i++) {
      monthArr.push(i);
    }
    return monthArr;
  }, []);
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

  const postsMonthFilterFn = useCallback(() => {
    const postsYear = queryClient
      ?.getQueryData(["Allposts_copy"])
      .filter((post) => +post.createdAt.split("-")[0] === selectedYear);
    const postsMonth = postsYear?.filter((post) => +post.createdAt.split("-")[1] === selectedMonth);
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
      if (new Date(selectedYear, selectedMonth - 1, i).getDay() === 0 || holidayCompareFn(i)) return "redDay";
      else if (new Date(selectedYear, selectedMonth - 1, i).getDay() === 6) return "saturday";
    };

    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          dayArr.push(
            <button
              key={i}
              className={postedDayCompareFn(i) ? `${dayColor(i)} postedDay` : dayColor(i)}
              // onClick={() => selectedDatePostSearch(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        dayArr.push(<div key={today}></div>);
      }
    }
    return dayArr;
  }, [selectedYear, selectedMonth, holiday]);

  // const selectedDatePostSearch = (i) => {
  //   const selectedDayPost = postsMonthFilterFn().filter((post) => +post.createdAt.split("-")[2].split("T")[0] === i);
  //   queryClient.setQueryData(["Allposts"], selectedDayPost);
  // };

  const onMonthController = (month) => {
    setSelectedMonth(month);
    setShowMonth(false);
  };

  const onYearController = (year) => {
    setSelectedYear(year);
    setShowMonth(false);
  };

  const fnStartHandler = () => {
    setSelectedYear(today.year);
    setSelectedMonth(today.month);
    setShowMonth(false);
  };

  useEffect(() => {
    const diaries = queryClient.getQueryData(["Allposts"]);
    queryClient.setQueryData(["Allposts_copy"], diaries);
  }, []);

  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Portal>
        <Modal.BackDrop fnStartHandler={fnStartHandler}>
          <Modal.ContentBox XYcoordinate="bottom">
            <CalendarContainer>
              {isLoading ? (
                <h2>로딩 중...</h2>
              ) : isError ? (
                <h2>서버 연결 실패</h2>
              ) : (
                <>
                  <CalendarHeaderBox>
                    <div className="shown-date">
                      <h3>{`${selectedYear}년`}</h3>
                      {showMonth ? null : <h3>{`${selectedMonth}월`}</h3>}
                      {showMonth ? (
                        <YearSelectModal onYearController={onYearController}>
                          <FiChevronDown className="date-show-arrow" />
                        </YearSelectModal>
                      ) : (
                        <FiChevronDown className="date-show-arrow" onClick={() => setShowMonth(true)} />
                      )}
                    </div>

                    <div className="buttons">
                      <button onClick={() => prevMonth()}>
                        <GrPrevious />
                      </button>
                      <button onClick={() => nextMonth()}>
                        <GrNext />
                      </button>
                    </div>
                  </CalendarHeaderBox>
                  {showMonth ? (
                    <MonthBox>
                      {months().map((month) => {
                        return (
                          <button
                            key={month}
                            className={month <= today.month ? "past" : "future"}
                            onClick={() => onMonthController(month)}
                          >{`${month}월`}</button>
                        );
                      })}
                    </MonthBox>
                  ) : (
                    <>
                      <WeekBox>{returnWeek()}</WeekBox>
                      <DateBox>{returnDay()}</DateBox>
                    </>
                  )}
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
  height: 41rem;
  padding: 2rem 2rem;
  border: 1px solid black;
  border-top: none;
  border-radius: 20px 20px 0px 0px;
  background-color: white;
`;

const CalendarHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: #242424;
  margin-bottom: 2rem;
  .shown-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .date-show-arrow {
    color: #3cc7a6;
    font-size: 2.5rem;
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  button {
    border: none;
    background-color: inherit;
    cursor: pointer;
    font-size: 2rem;
  }
`;

const MonthBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  button {
    width: 10.1rem;
    height: 6rem;
    border: none;
    border-radius: 9px;
    font-size: 1.7rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .past {
    background: #3cc7a6;
    color: white;
  }
  .future {
    background-color: #e8e8e8;
    color: #b3b3b3;
  }
`;

const WeekBox = styled.div`
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

const DateBox = styled.div`
  margin-top: 2rem;
  button {
    float: left;
    width: calc(36rem / 7);
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    height: 5rem;
    border: none;
    background-color: transparent;
    color: #242424;
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
  }
  .redDay {
    color: #ff5656;
  }
  .saturday {
    color: blue;
  }
  .postedDay {
    border-radius: 100%;
    background-color: #b3e9dc;
  }
  div {
    float: left;
    width: calc(36rem / 7);
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    height: 5rem;
    color: whitesmoke;
  }
`;
