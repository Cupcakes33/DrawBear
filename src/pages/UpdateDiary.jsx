import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled, { css } from "styled-components";
import { mainApi } from "../apis/axios";
import Alert from "../components/common/modal/Alert";
import Back from "../components/header/Back";
import HeaderText from "../components/header/HeaderText";
import { showModal } from "../redux/modules/UISlice";
import { StHeader } from "../UI/common";

const color = ["#E76020", "#ee892f", "#e0bb76", "#63896a", "#325434", "#0f0f0d"];
const UpdateDiary = () => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const { couple } = useSelector((state) => state.diarySlice);
  const { isModal } = useSelector((state) => state.UISlice);
  const diaryTitleInputRef = useRef();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(["diary"], (updateData) => mainApi.update(updateData), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === 500) dispatch(showModal({ isModal: true, content: "다이어리 생성에 실패하였습니다." }));
      else if (status === 404) dispatch(showModal({ isModal: true, content: "다이어리가 존재하지 않습니다." }));
      else if (status === 401) dispatch(showModal({ isModal: true, content: "권한이 없습니다." }));
    },
    onSuccess: () => {
      dispatch(showModal({ isModal: true, content: "다이어리 수정 성공!", move: "/" }));
    },
  });

  const updateDiaryData = queryClient?.getQueryData(["main"])?.diaries.filter((data) => data.diaryId === +id);

  const onAddDiaryHandler = () => {
    const diaryName = diaryTitleInputRef.current.value;
    if (!diaryName) dispatch(showModal({ isModal: true, content: "다이어리 이름을 작성해주세요!" }));
    else if (!selectedColor) {
      dispatch(showModal({ isModal: true, content: "다이어리 색상을 선택해주세요!" }));
    } else {
      return mutate({ diaryName, selectedColor, couple, id });
    }
  };

  useEffect(() => {
    if (updateDiaryData === undefined)
      setTimeout(() => {
        navigate("/");
      }, 3000);
  }, [updateDiaryData, navigate]);

  return (
    <>
      {updateDiaryData === undefined ? (
        <h1>알 수 없는 에러! 3초 뒤 메인화면으로 이동합니다...</h1>
      ) : (
        <Container>
          <StHeader flexBetween>
            <div>
              <Back />
              <HeaderText>다이어리 수정</HeaderText>
            </div>
            <div>
              <HeaderBtn onClick={onAddDiaryHandler}>완성</HeaderBtn>
            </div>
          </StHeader>
          <Section>
            <input type="text" ref={diaryTitleInputRef} defaultValue={updateDiaryData[0].diaryName}></input>
            <DiaryIcon>그림</DiaryIcon>
          </Section>
          <Footer>
            {color.map((color, i) => {
              return <ColorPicker key={i} color={color} onClick={() => setSelectedColor(color)}></ColorPicker>;
            })}
          </Footer>
        </Container>
      )}
      {isModal && <Alert />}
    </>
  );
};

export default UpdateDiary;

const Container = styled.div`
  width: 36rem;
  height: 100vh;
  border: 1px solid black;
  background-color: white;
  position: relative;
`;

const Section = styled.section`
  width: 100%;
  height: calc(100% - 13.2rem);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: 2rem;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ColorPicker = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const DiaryIcon = styled.div`
  width: 20rem;
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;

const HeaderBtn = styled.button`
  border: 0;
  cursor: pointer;
`;
