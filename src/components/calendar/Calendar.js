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
  const [toggle, setToggle] = useState(false)

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const returnWeek = useCallback(() => {
    const weekArr = week.map((v, i) => <div key={i} className={v === "일" ? "weekday sunday" : (v === "토" ? "weekday saturday" : "weekday")}>{v}</div>)
    return weekArr
  }, [])

  return (
    <Container>
      <StHeader>
        <h3>2023년 1월</h3>
        <div className="buttons">
          <div>
            <button>이전 달</button>
            <button>다음 달</button>
          </div>
          <div>
            <button>x</button>
          </div>
        </div>
      </StHeader>
      <StWeek>{returnWeek()}</StWeek>
      <StDate>1</StDate>
    </Container>
  )
}

const Container = styled.section`
  width: 500px;
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
    width: calc(500px / 7);
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
  float: left;
  width: calc(500px / 7);
  height: 50px;
  margin-top: 20px;
  text-align: center;
`

export default Calendar