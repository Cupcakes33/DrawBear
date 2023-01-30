import React from "react";
import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FiChevronDown } from "react-icons/fi";
import YearSelectModal from "./YearSelectModal";

const CalendarHeader = (props) => {
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, showMonth, setShowMonth } = props;
  
  // 달 이동 버튼 로직

  const prevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  // 연도 선택

  const onYearController = (year) => {
    setSelectedYear(year);
    setShowMonth(false);
  };

  return (
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
  );
};

export default CalendarHeader;

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
