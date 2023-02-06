import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import useDispatchHook from "../../hooks/useDispatchHook";
import { __TutorialModal } from "../../redux/modules/UISlice";
import { flex } from "../../UI/common";
import AlertModal from "../common/modal/AlertModal";
import NavigateBtn from "../common/NavigateBtn";

const SettingMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openAlertModal } = useDispatchHook();

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    openAlertModal({ bigTxt: "로그아웃되었습니다.", move: "/login" });
  };

  return (
    <ConfigOptionWrapper>
      <ConfigOptionBox onClick={() => navigate("/setting/diaryManage")}>
        일기 설정
        <NavigateBtn />
      </ConfigOptionBox>
      <ConfigOptionBox onClick={() => navigate("/setting/infoEdit")}>
        개인정보 수정
        <NavigateBtn />
      </ConfigOptionBox>
      <AlertModal
        select
        bigTxt={"로그아웃하시겠어요?"}
        smallTxt={"다시 로그인해서 이용할 수 있어요."}
        move={"/login"}
        onClick={onLogoutHandler}
      >
        <ConfigOptionBox className="divInWrapper">로그아웃</ConfigOptionBox>
      </AlertModal>
      <div></div>
      <AlertModal bigTxt={"공지사항이 없어요!"} smallTxt={"그냥 허전해서 달아놓아보았어요!"}>
        <ConfigOptionBox>
          공지사항
          <NavigateBtn link={""} />
        </ConfigOptionBox>
      </AlertModal>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScZLlTNYpVAHXxnPFuSYZytsVJXl9SD_Cv6q48BUD507rxJ9A/viewform"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ConfigOptionBox>
          문의하기
          <NavigateBtn link={""} />
        </ConfigOptionBox>
      </a>
      <ConfigOptionBox onClick={() => dispatch(__TutorialModal(true))}>
        튜토리얼 다시보기
        <NavigateBtn link={""} />
      </ConfigOptionBox>
    </ConfigOptionWrapper>
  );
};

export default SettingMenu;

const ConfigOptionWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const ConfigOptionBox = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  ${flex("space-between", "")}
  cursor: pointer;
`;