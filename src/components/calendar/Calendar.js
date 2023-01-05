import { useCallback, useState } from "react";
import styled from "styled-components"

const Calendar = () => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay()
  };
  const [selectedYear, setSelectedYear] = useState(today.year)
  const [selectedMonth, setSelectedMonth] = useState(today.month)
  const [selectedDate, setSelectedDate] = useState("")
  const [toggle, setToggle] = useState(false)

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
    const weekArr = week.map((v, i) => <div key={i} className={v === "일" ? "weekday sunday" : (v === "토" ? "weekday saturday" : "weekday")}>{v}</div>)
    return weekArr
  }, [])

  const returnDay = useCallback(() => {
    let dayArr = []
    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          dayArr.push(
            <button key={i}
              className={new Date(selectedYear, selectedMonth - 1, i).getDay() === 6 ?
                "weekday saturday" :
                (new Date(selectedYear, selectedMonth - 1, i).getDay() === 0 ? "weekday sunday" : "weekday")}
              onClick={() => setSelectedDate(`${selectedYear}년 ${selectedMonth}월 ${i}일`)} >
              {i}</ button>
          )
        }
      } else {
        dayArr.push(<button key={today} className="weekday"></button>)
      }
    }
    return dayArr
  }, [selectedYear, selectedMonth, lastDay])

  return (
    <Container>
      <StHeader>
        <h3>{`${selectedYear}년 ${selectedMonth}월`}</h3>
        <div className="buttons">
          <div>
            <button onClick={() => prevMonth()}>이전 달</button>
            <button onClick={() => nextMonth()}>다음 달</button>
          </div>
          <div>
            <button>x</button>
          </div>
        </div>
      </StHeader>
      <StWeek>{returnWeek()}</StWeek>
      <StDate>{returnDay()}</StDate>
    </Container>
  )
}

const Container = styled.section`
  width: 350px;
  height: 400px;
  padding: 20px 20px;
  border: 1px solid black;
  `

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  `

const StWeek = styled.div`
  display: flex;
  .weekday {
    width: calc(350px / 7);
    text-align: center;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
  }
`

const StDate = styled.div`
  margin-top: 20px;
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
    width: calc(350px / 7);
    height: 50px;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
  }
  `

export default Calendar