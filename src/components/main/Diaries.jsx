import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.css";

import { EffectCards } from "swiper";
import styled from "styled-components";
import { useNavigate } from "react-router";

export default function Diaries(diaryData) {
  console.log(diaryData);
  const navigate = useNavigate();
  return (
    <SwiperContainer>
      <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
        {diaryData.map((data) => {
          return (
            <SwiperSlide key={data.diaryId} onClick={() => navigate(`/list/${data.diaryId}`)}>
              <Diary bgColor={data.outsideColor}>
                <label>{data.diaryName}</label>
              </Diary>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SwiperContainer>
  );
}

const SwiperContainer = styled.section`
  position: fixed;
  top: 35%;
  left: calc(50% - 7.5rem);
`;

const Diary = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
