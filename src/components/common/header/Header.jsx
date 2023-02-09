import React from "react";
import styled from "styled-components";
import { flex } from "../../../UI/common";
import NavigateBtn from "../NavigateBtn";

// 헤더 베이스

export const Header = ({ children, bgColor, height }) => {
  return (
    <HeaderContainer bgColor={bgColor} height={height}>
      {children}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: ${({ height }) => (height ? height : "6rem")};
  padding: 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ bgColor }) => (bgColor ? bgColor : "white")};
`;

// 정중앙

const Center = ({ children }) => {
  return <CenterDiv>{children}</CenterDiv>;
};

const CenterDiv = styled.div`
  width: 100%;
  ${flex}
`;

// 양 옆 배치

const SpaceBetween = ({ children }) => {
  return <SpaceBetweenDiv>{children}</SpaceBetweenDiv>;
};

const SpaceBetweenDiv = styled.div`
  width: 100%;
  ${flex("space-between", "")}
`;

// 뒤로가기

const Back = ({ children, link, notBack }) => {
  return (
    <BackDiv>
      {notBack ? null : <NavigateBtn prev sizeType="header" link={link} />}
      <h3>{children}</h3>
    </BackDiv>
  );
};

const BackDiv = styled.div`
  ${flex}
`;

// 온클릭 받을 버튼 박스

const OnClickBtn = ({ children, color, onClick, fontSize, ...props }) => {
  const onClickHandler = () => {
    onClick && onClick();
  };
  return (
    <BtnBox color={color} fontSize={fontSize} onClick={onClickHandler} {...props}>
      {children}
    </BtnBox>
  );
};

const BtnBox = styled.button.attrs((props) => ({
  type: props.type,
}))`
  ${flex}
  border: none;
  background-color: inherit;
  gap: 1.7rem;
  color: ${({ color }) => (color ? color : "#3cc7a6")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.7rem")};
  cursor: pointer;
`;

Header.Center = Center;
Header.SpaceBetween = SpaceBetween;
Header.Back = Back;
Header.OnClickBtn = OnClickBtn;
