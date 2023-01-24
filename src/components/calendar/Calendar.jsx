import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { diaryApi } from "../../apis/axios";
import Modal from "../common/modal/Modal";

const Calendar = ({ onClose }) => {
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

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const returnWeek = useCallback(() => {
    return week.map((v, i) => (
      <div key={i} className={v === "일" ? "weekday sunday" : v === "토" ? "weekday saturday" : "weekday"}>
        {v}
      </div>
    ));
  }, []);

  const returnDay = useCallback(() => {
    let dayArr = [];
    const holidayMonth = holiday.filter((v) => parseInt(String(v).substring(4, 6)) === selectedMonth);
    const holidayDate = holidayMonth.map((v) => parseInt(String(v).substring(6, 8)));
    const postsMonth = queryClient
      ?.getQueryData(["Allposts"])
      .filter((post) => +post.createdAt.split("-")[1] === selectedMonth);
    const postsDate = postsMonth.map((post) => +post.createdAt.split("-")[2].split("T")[0]);

    const holidayCompare = (i) => {
      for (let h = 0; h <= holidayDate.length; h++) {
        // console.log(h);
        if (holidayDate[h] === i) return true;
      }
    };

    const postedDayCompare = (i) => {
      for (let p = 0; p <= postsDate.length; p++) {
        if (postsDate[p] === i) return true;

        // return postsDate[p] === i ? `${i}*` : i;
        // console.log(postsDate.length);
        // console.log(p);
        // console.log(postsDate);
        // console.log(postsDate[p]);

        // if (postsDate[p] === i) return `${i}*`;
        // ;
        // else if (postsDate[p] !== i) return i;
      }
    };

    const dayColor = (i) => {
      if (postedDayCompare(i)) return "postedDay";
      if (new Date(selectedYear, selectedMonth - 1, i).getDay() === 0 || holidayCompare(i)) return "redDay";
      else if (new Date(selectedYear, selectedMonth - 1, i).getDay() === 6) return "saturday";
    };

    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          dayArr.push(
            <SpecialDate
              key={i}
              color={dayColor(i)}
              onClick={() => setSelectedDate(`${selectedYear}년 ${selectedMonth}월 ${i}일`)}
            >
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

  return (
    <Modal onClose={onClose} modalWidth="36rem" modalHeight="40rem" top="80%">
      <Container>
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
                  <button onClick={() => prevMonth()}>이전 달</button>
                  <button onClick={() => nextMonth()}>다음 달</button>
                </div>
              </div>
            </StHeader>
            <StWeek>{returnWeek()}</StWeek>
            <StDate>{returnDay()}</StDate>
          </>
        )}
      </Container>
    </Modal>
  );
};

const Container = styled.section`
  width: 36rem;
  height: 40rem;
  padding: 2rem 2rem;
  border: 1px solid black;
  background-color: #383838;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: whitesmoke;
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
    color: whitesmoke;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
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
          color: red;
        `;
      case "saturday":
        return css`
          color: blue;
        `;
      case "postedDay":
        return css`
          color: yellow;
        `;
      default:
        return css`
          color: whitesmoke;
        `;
    }
  }}
`;

export default Calendar;
