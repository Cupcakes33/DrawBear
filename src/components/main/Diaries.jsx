import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mainApi } from "../../apis/axios";
import { showModal } from "../../redux/modules/UISlice";
import { useDispatch } from "react-redux";
import Diary from "./Diary";
import { FiMoreVertical } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import DiarySetting from "../FullList/DiarySetting";

const Diaries = ({ diaryData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [diarySettingModal, setDiarySettingModal] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(["diary"], (diaryId) => mainApi.bookmark(diaryId), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 401) dispatch(showModal({ isModal: true, content: "권한이 없습니다." }));
      else if (status === 404)
        dispatch(
          showModal({
            isModal: true,
            content: "존재하지 않는 다이어리입니다.",
          })
        );
      else if (status === 500)
        dispatch(
          showModal({
            isModal: true,
            content: "북마크 저장 및 삭제에 실패했습니다.",
          })
        );
    },
    onSuccess: () => {
      queryClient.refetchQueries(["main"]);
    },
  });

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
        {diaryData.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <DiaryShowContainer>
                <div className="diaryTitle">
                  <label>{data.diaryName}</label>
                  <FiMoreVertical className="diaryMoreInfo" onClick={() => setDiarySettingModal(true)} />
                </div>
                <Diary
                  bgColor={data.outsideColor}
                  onClick={() => {
                    navigate(`/list/${data.diaryId}`);
                  }}
                >
                  <button onClick={() => mutate(data.diaryId)}>북마크</button>
                </Diary>
              </DiaryShowContainer>
              {diarySettingModal && (
                <DiarySetting onClose={setDiarySettingModal} id={data.diaryId} queryClient={queryClient} />
              )}
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
  }
`;
