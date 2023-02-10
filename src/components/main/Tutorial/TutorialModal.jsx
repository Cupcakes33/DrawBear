import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "../../common/modal/ReactModal";
import tutorial_1 from "../../../assets/images/tutorial/tutorial_1.webp";
import tutorial_2 from "../../../assets/images/tutorial/tutorial_2.webp";
import tutorial_3 from "../../../assets/images/tutorial/tutorial_3.webp";
import tutorial_4 from "../../../assets/images/tutorial/tutorial_4.webp";
import tutorial_5 from "../../../assets/images/tutorial/tutorial_5.webp";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Keyboard, Pagination, Navigation } from "swiper";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __TutorialModal } from "../../../redux/modules/UISlice";
import { useLocation } from "react-router-dom";

const TutorialModal = ({ showModal }) => {
  const [tutorialDone, setTutorialDone] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  const tutorialHandler = (event) => {
    if (event.target.checked) setTutorialDone(true);
    else setTutorialDone(false);
  };

  const closeModalHandler = () => {
    if (tutorialDone) localStorage.setItem("tutorialDone", true);
    dispatch(__TutorialModal(false));
  };

  return (
    <Modal showModal={showModal}>
      <Modal.Portal>
        <Modal.BackDrop notClose>
          <Modal.ContentBox>
            <>
              <CloseBtn onClick={closeModalHandler}>X</CloseBtn>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                  enabled: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="tutorial-swiper"
              >
                <SwiperSlide>
                  <img src={tutorial_1} alt="튜토리얼1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={tutorial_2} alt="튜토리얼1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={tutorial_3} alt="튜토리얼1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={tutorial_4} alt="튜토리얼1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={tutorial_5} alt="튜토리얼1" />
                </SwiperSlide>
              </Swiper>
              {location.pathname !== "/setting" && (
                <div>
                  <input type="checkbox" id="checkbox" onChange={tutorialHandler} />
                  <label htmlFor="checkbox"> 다시 보지 않기</label>
                </div>
              )}
            </>
          </Modal.ContentBox>
        </Modal.BackDrop>
      </Modal.Portal>
    </Modal>
  );
};

export default TutorialModal;

const CloseBtn = styled.button`
  position: absolute;
  z-index: 10;
  margin: 1rem 0 0 27rem;
  font-size: 2.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
