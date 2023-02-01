import React from "react";
import { useMemo } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

const CalendarDay = ({ selectedYear, selectedMonth, holiday, week }) => {
  const queryClient = useQueryClient();

  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  // 선택된 년도와 달에 포스팅된 일기 선별하는 로직

  const postsMonthFilterFn = useMemo(() => {
    const postsYear = queryClient
      ?.getQueryData(["Allposts_copy"])
      .filter((post) => +post.createdAt.split("-")[0] === selectedYear);
    const postsMonth = postsYear?.filter((post) => +post.createdAt.split("-")[1] === selectedMonth);
    return postsMonth;
  }, [selectedYear, selectedMonth]);

  // 일 반환 로직

  const returnDay = () => {
    let dayArr = [];
    const holidayMonth = holiday.filter((v) => parseInt(String(v).substring(4, 6)) === selectedMonth);
    const holidayDate = holidayMonth.map((v) => parseInt(String(v).substring(6, 8)));
    const postsDate = postsMonthFilterFn.map((post) => +post.createdAt.split("-")[2].split("T")[0]);
    const todayDate = new Date().toLocaleDateString("en-US").split("/");

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
      else if (+todayDate[2] === selectedYear && +todayDate[0] === selectedMonth && +todayDate[1] === i) return "today";
    };

    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          dayArr.push(
            <div className="day-box" key={`${i}일`}>
              <button
                className={postedDayCompareFn(i) ? `${dayColor(i)} postedDay` : dayColor(i)}
                onClick={() => selectedDatePostSearch(i)}
              >
                {i}
              </button>
            </div>
          );
        }
      } else {
        dayArr.push(<div className="blank-day" key={today}></div>);
      }
    }
    return dayArr;
  };

  // 선택한 날짜의 일기 조회

  const selectedDatePostSearch = (i) => {
    const selectedDayPost = postsMonthFilterFn.filter((post) => +post.createdAt.split("-")[2].split("T")[0] === i);
    queryClient.setQueryData(["Allposts"], selectedDayPost);
  };

  return <DateBox>{returnDay()}</DateBox>;
};

export default React.memo(CalendarDay);

const DateBox = styled.div`
  margin-top: 2rem;
  .day-box {
    text-align: center;
    float: left;
    width: calc(36rem / 7);
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    height: 5rem;
  }
  button {
    width: 3.5rem;
    height: 3.5rem;
    border: none;
    background-color: transparent;
    color: #242424;
    cursor: pointer;
    :hover {
      border: 1px solid #3cc7a6;
      border-radius: 100%;
    }
    :focus {
      border: 1px solid #3cc7a6;
      border-radius: 100%;
      background-color: #3cc7a6;
      color: whitesmoke;
    }
  }
  .redDay {
    color: #ff5656;
  }
  .today {
    color: white;
    border-radius: 100%;
    background-color: #242424;
  }
  .postedDay {
    border-radius: 100%;
    background-color: #b3e9dc;
  }
  .blank-day {
    float: left;
    width: calc(36rem / 7);
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    height: 5rem;
    color: whitesmoke;
  }
`;
