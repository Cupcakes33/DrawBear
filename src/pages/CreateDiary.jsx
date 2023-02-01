import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mainApi } from "../apis/axios";
import NavigateBtn from "../components/common/NavigateBtn";
import { DisplayDiv, StHeader } from "../UI/common";
import { TiPencil } from "react-icons/ti";
import soloDiaryBear from "../assets/images/soloDiaryBear.webp";
import coupleDiaryBear from "../assets/images/coupleDiaryBear.webp";
import Diary from "../components/main/Diary/Diary";
import useDispatchHook from "../hooks/useDispatchHook";

const color = ["#FF8181", "#FFCA7A", "#FFE99A", "#A4F5A3", "#9CDBF7", "#BB9EFA"];

const CreateDiary = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const { couple } = useSelector((state) => state.diarySlice);
  const { openAlertModal } = useDispatchHook;
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
      <Container>
        <StHeader flex justify="space-between">
          <DisplayDiv flex>
            <NavigateBtn prev sizeType="header" />
            <h3>다이어리 생성</h3>
          </DisplayDiv>
          <div>
            <span onClick={onAddDiaryHandler}>완성</span>
          </div>
        </StHeader>
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
      </Container>
    </>
  );
};

export default CreateDiary;

const Container = styled.div`
  width: 36rem;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  position: relative;
`;

const CreateDiaryBox = styled.section`
  width: 100%;
  height: calc(100% - 16.2rem);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    margin-bottom: 2rem;
    width: 20.3rem;
    height: 4.3rem;
    background: #fafafa;
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

const CreateLogoBear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Footer = styled.footer`
  position: absolute;
  bottom: 2%;
  left: 0;
  width: 100%;
  height: 7.2rem;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ColorPicker = styled.button`
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
