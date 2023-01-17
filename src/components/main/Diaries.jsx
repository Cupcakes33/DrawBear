import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

import { Pagination } from "swiper";
import styled from "styled-components";
import { useNavigate } from "react-router";

export default function Diaries(diaryData) {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {diaryData.map((data) => {
          return (
            <SwiperSlide>
              <Diary bgColor={data.outsideColor} onClick={() => navigate(`/list/${data.diaryId}`)}>
                <label>{data.diaryName}</label>
              </Diary>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button>북마크</button>
    </>
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
  cursor: pointer;
`;
