import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mainApi } from "../apis/axios";
import { flex } from "../UI/common";
import { TiPencil } from "react-icons/ti";
import soloDiaryBear from "../assets/images/soloDiaryBear.webp";
import coupleDiaryBear from "../assets/images/coupleDiaryBear.webp";
import Diary from "../components/main/Diary/Diary";
import useDispatchHook from "../hooks/useDispatchHook";
import { Header } from "../components/common/header/Header";

const color = ["#FF8181", "#FFCA7A", "#FFE99A", "#A4F5A3", "#9CDBF7", "#BB9EFA"];

const CreateDiary = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const { couple } = useSelector((state) => state.diarySlice);
  const { openAlertModal } = useDispatchHook();
  const diaryTitleInputRef = useRef();

  const { mutate } = useMutation((addData) => mainApi.create(addData), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 500) openAlertModal({ bigTxt: "다이어리 생성에 실패하였습니다." });
    },
    onSuccess: () => {
      openAlertModal({ bigTxt: "다이어리 생성 성공!", move: "/" });
    },
  });

  const onAddDiaryHandler = () => {
    const diaryName = diaryTitleInputRef.current.value;
    if (!diaryName) openAlertModal({ bigTxt: "다이어리 이름을 작성해주세요!" });
    else if (!selectedColor) openAlertModal({ bigTxt: "다이어리 색상을 선택해주세요!" });
    else return mutate({ diaryName, selectedColor, couple });
  };

  return (
    <>
      <Header>
        <Header.SpaceBetween>
          <Header.Back link="/">다이어리 생성</Header.Back>
          <Header.OnClickBtn onClick={onAddDiaryHandler}>완성</Header.OnClickBtn>
        </Header.SpaceBetween>
      </Header>
      <CreateDiaryBox>
        <CreateLogoBear>
          <img src={couple === 0 ? soloDiaryBear : coupleDiaryBear} alt="다이어리 생성 곰돌이 그림" />
          <span>{couple === 0 ? "혼자써요 !" : "같이써요 !"}</span>
        </CreateLogoBear>
        <div className="pencilIcon-box">
          <TiPencil />
        </div>
        <input type="text" ref={diaryTitleInputRef} />
        <Diary bgColor={selectedColor} />
      </CreateDiaryBox>
      <Footer>
        {color.map((color, i) => {
          return (
            <ColorPicker
              key={`diaryColorPicker${i}`}
              color={color}
              onClick={() => setSelectedColor(color)}
            ></ColorPicker>
          );
        })}
      </Footer>
    </>
  );
};

export default CreateDiary;

export const CreateDiaryBox = styled.section`
  width: 100%;
  height: calc(100vh - 16.2rem);
  ${flex("", "", "column")}
  input {
    margin-bottom: 2rem;
    width: 20.3rem;
    height: 4.3rem;
    background: var(--grayscale_1);
    border-radius: 6px;
    border: none;
    padding: 0 3rem 0 1rem;
  }
  .pencilIcon-box {
    position: absolute;
    top: calc(50% - 18.75rem);
    left: calc(50% + 7.5rem);
  }
`;

export const CreateLogoBear = styled.div`
  ${flex("", "", "", "column")}
  position: absolute;
  top: 10%;
  left: calc(50% - 15rem);
  cursor: pointer;
  img {
    width: 4.2rem;
    height: 4.2rem;
  }
  span {
    font-size: 1rem;
    margin-top: 0.6rem;
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 2%;
  left: 0;
  width: 100%;
  height: 7.2rem;
  background-color: white;
  ${flex("space-evenly", "")}
`;

export const ColorPicker = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
  transition: all 0.3s;
  :hover {
    transform: scale(1.1);
  }
  :focus {
    transform: scale(1.1);
  }
`;
