import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Diary from "./Diary/Diary";
import { FiMoreVertical } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { flex } from "../../UI/common";
import DiarySettingModal from "../common/modal/DiarySettingModal/DiarySettingModal";

const Diaries = ({ diaryData }) => {
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
        {diaryData?.map((data) => {
          const { diaryId, diaryName, bookmark, outsideColor } = data;
          return (
            <SwiperSlide key={`diary${diaryId}`}>
              <DiaryShowContainer>
                <div className="diaryTitle">
                  <label>{diaryName}</label>
                  <DiarySettingModal diaryId={diaryId} diaryName={diaryName}>
                    <FiMoreVertical className="diaryMoreInfo" />
                  </DiarySettingModal>
                </div>
                <Diary
                  bookmark={bookmark}
                  diaryId={diaryId}
                  bgColor={outsideColor}
                  onClick={() => {
                    navigate(`/list/${diaryId}`);
                    localStorage.removeItem("diaryName");
                    localStorage.setItem("diaryName", diaryName);
                  }}
                ></Diary>
              </DiaryShowContainer>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Diaries;

const DiaryShowContainer = styled.div`
  .diaryTitle {
    ${flex}
    margin-bottom: 0.9rem;
    .diaryMoreInfo {
      ${flex}
      color: white;
      background-color: #454545;
      border-radius: 50%;
      margin-left: 0.7rem;
      cursor: pointer;
    }
  }
`;
