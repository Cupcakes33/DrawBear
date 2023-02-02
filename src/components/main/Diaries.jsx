import styled from "styled-components";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import DiarySettingModal from "./DiarySettingModal/DiarySettingModal";
import Diary from "./Diary/Diary";
import { flex } from "../../UI/common";
import { FiMoreVertical } from "react-icons/fi";

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
                <div className="diary">
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
                </div>
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
  .diary {
    ${flex}
  }
`;
