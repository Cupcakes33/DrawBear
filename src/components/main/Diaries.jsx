import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Diary from "./Diary/Diary";
import { FiMoreVertical } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

import { diaryModal } from "../../redux/modules/diarySlice";

const Diaries = ({ diaryData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const diarySettingHandler = (diaryId) => {
    dispatch(diaryModal({ diaryId: diaryId, isModal: true }));
  };

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
        {diaryData?.map((data, i) => {
          return (
            <SwiperSlide key={`diary${data.diaryId}`}>
              <DiaryShowContainer>
                <div className="diaryTitle">
                  <label>{data.diaryName}</label>
                  <FiMoreVertical className="diaryMoreInfo" onClick={() => diarySettingHandler(data.diaryId)} />
                </div>
                <Diary
                  bookmark={data.bookmark}
                  diaryId={data.diaryId}
                  bgColor={data.outsideColor}
                  onClick={() => {
                    navigate(`/list/${data.diaryId}`);
                    localStorage.removeItem("diaryName");
                    localStorage.setItem("diaryName", data.diaryName);
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.9rem;
  }

  .diaryMoreInfo {
    color: white;
    background-color: #454545;
    border-radius: 50%;
    margin-left: 0.7rem;
    cursor: pointer;
  }
`;
