import React from "react";
import styled from "styled-components";

const CalendarWeek = ({ week }) => {

  return (
    <WeekBox>
      {week.map((v, i) => (
        <div key={`${i}요일`} className={v === "일" ? "weekday sunday" : v === "토" ? "weekday saturday" : "weekday"}>
          {v}
        </div>
      ))}
    </WeekBox>
  );
};

export default React.memo(CalendarWeek);

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
