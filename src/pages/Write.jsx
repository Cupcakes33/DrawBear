import { useState } from "react";
import styled, { css } from "styled-components";
import { useRef } from "react";
import { StContainer, StHeader, StSection } from "../UI/common";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Canvas from "../components/FabricCanvas/Canvas";

const Write = () => {
  const swiperNextRef = useRef(null);
  const swiperPrevRef = useRef(null);
  const [prevInvisible, setPrevInvisible] = useState(true);
  const [nextInvisible, setNextInvisible] = useState(false);

  return (
    <StContainer>
      <StHeader flexCenter>
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
          // pagination={{ clickable: false }}
        >
          <SwiperSlide>
            <StWrapper>
              <Canvas />
            </StWrapper>
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

const StSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
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
