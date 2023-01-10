import { useState } from "react";
import styled, { css } from "styled-components";
import { useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Write = () => {
  const swiperNextRef = useRef(null);
  const swiperPrevRef = useRef(null);
  const [prevInvisible, setPrevInvisible] = useState(true);
  const [nextInvisible, setNextInvisible] = useState(false);

  return (
    <StContainer>
      <StHeader>
        <StPrevButton invisible={prevInvisible} ref={swiperPrevRef}>
          이전
        </StPrevButton>
        <h1>LOGO</h1>
        <StNextButton invisible={nextInvisible} ref={swiperNextRef}>
          다음
        </StNextButton>
      </StHeader>
      <StSection>
        <StSwiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperPrevRef.current;
            swiper.params.navigation.nextEl = swiperNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onReachEnd={() => {
            setPrevInvisible(false);
            setNextInvisible(true);
          }}
          onReachBeginning={() => {
            setPrevInvisible(true);
            setNextInvisible(false);
          }}
          touchRatio={0}
          slidesPerView={1}
          pagination={{ clickable: false }}
        >
          <SwiperSlide>
            <div>Slide 1</div>
          </SwiperSlide>
          <SwiperSlide>
            <div>Slide 2</div>
          </SwiperSlide>
        </StSwiper>
      </StSection>
    </StContainer>
  );
};

export default Write;

const StContainer = styled.div`
  width: 360px;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  position: relative;
`;

const StHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
`;

const StSection = styled.section`
  width: 100%;
  height: calc(100% - 132px);
  background-color: white;
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const StButton = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  ${(props) =>
    props.invisible &&
    css`
      visibility: hidden;
    `}
`;

const StNextButton = styled(StButton)``;

const StPrevButton = styled(StButton)``;
