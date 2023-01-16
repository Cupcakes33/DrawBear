import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __holiday } from "../../redux/modules/diarySlice";
import Modal from "../common/modal/Modal";

const Calendar = ({ onClose }) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };
  const dispatch = useDispatch();
  const { holiday } = useSelector((state) => state.diarySlice);
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDate, setSelectedDate] = useState("");
  const [toggle, setToggle] = useState(false);

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
  console.log(holiday)

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
    let holidayMonth = holiday.filter((v) => parseInt(String(v).substring(4, 6)) === selectedMonth);
    let holidayDate = holidayMonth.map((v) => parseInt(String(v).substring(6, 8)));

    const compare = (i) => {
      for (let h = 0; h <= holidayDate.length; h++) {
        if (holidayDate[h] === i) return true;
      }
    };

    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          dayArr.push(
            <button
              key={i}
              className={
                new Date(selectedYear, selectedMonth - 1, i).getDay() === 0 || compare(i)
                  ? "weekday sunday"
                  : new Date(selectedYear, selectedMonth - 1, i).getDay() === 6
                  ? "weekday saturday"
                  : "weekday"
              }
              onClick={() => setSelectedDate(`${selectedYear}년 ${selectedMonth}월 ${i}일`)}
            >
              {i}
            </button>
          );
        }
      } else {
        dayArr.push(<div key={today} className="weekday"></div>);
      }
    }
    return dayArr;
  }, [selectedYear, selectedMonth, lastDay, holiday]);

  useEffect(() => {
    dispatch(__holiday(selectedYear));
  }, [selectedYear]);

  return (
    <Modal onClose={onClose} modalWidth="36rem" modalHeight="40rem" top="80%">
      <Container>
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
  button {
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
  }
  .weekday {
    float: left;
    width: calc(36rem / 7);
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    height: 5rem;
    color: whitesmoke;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
  }
`;

export default Calendar;
