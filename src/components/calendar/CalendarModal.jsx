import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { diaryApi } from "../../apis/axios";
import { Modal } from "../common/modal/ReactModal";
import CalendarWeek from "./CalendarWeek";
import CalendarDay from "./CalendarDay";
import ClalendarMonth from "./ClalendarMonth";
import CalendarHeader from "./CalendarHeader";

const CalendarModal = ({ children }) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [showMonth, setShowMonth] = useState(false);
  const queryClient = useQueryClient();

  // 공휴일 API

  const { data = [], isLoading, isError } = useQuery(["holiday", selectedYear], () => diaryApi.holiday(selectedYear));
  const holiday = data?.map((v) => v.locdate);

  //활용할 날짜들 선언

  const week = useMemo(() => {
    return ["일", "월", "화", "수", "목", "금", "토"];
  }, []);

  // 모달 닫을 시 날짜 초기화

  const fnStartHandler = () => {
    setSelectedYear(today.year);
    setSelectedMonth(today.month);
    setShowMonth(false);
  };

  // 선택한 날짜 일기 조회에 이용할 데이터 복사

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
                  <CalendarHeader
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    setShowMonth={setShowMonth}
                    showMonth={showMonth}
                  />
                  {showMonth ? (
                    <ClalendarMonth
                      setSelectedMonth={setSelectedMonth}
                      setShowMonth={setShowMonth}
                      todayMonth={today.month}
                    />
                  ) : (
                    <>
                      <CalendarWeek week={week} />
                      <CalendarDay
                        selectedYear={selectedYear}
                        selectedMonth={selectedMonth}
                        holiday={holiday}
                        week={week}
                      />
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
