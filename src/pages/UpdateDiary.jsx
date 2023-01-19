import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled, { css } from "styled-components";
import { mainApi } from "../apis/axios";
import Alert from "../components/common/modal/Alert";
import NavigateBtn from "../components/common/NavigateBtn";
import Diary from "../components/main/Diary";
import { showModal } from "../redux/modules/UISlice";
import { DisplayDiv, StHeader } from "../UI/common";
import { TiPencil } from "react-icons/ti";
import soloDiaryBear from "../assets/images/soloDiaryBear.webp";
import coupleDiaryBear from "../assets/images/coupleDiaryBear.webp";

const color = ["#FF8181", "#FFCA7A", "#FFE99A", "#A4F5A3", "#9CDBF7", "#BB9EFA"];
const UpdateDiary = () => {
  const dispatch = useDispatch();
  const { couple } = useSelector((state) => state.diarySlice);
  const { isModal } = useSelector((state) => state.UISlice);
  const diaryTitleInputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateDiaryData = queryClient?.getQueryData(["main"])?.diaries.filter((data) => data.diaryId === +id);
  const [selectedColor, setSelectedColor] = useState(updateDiaryData?.[0].outsideColor);

  const { mutate } = useMutation((updateData) => mainApi.update(updateData), {
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

  const onUpdateDiaryHandler = () => {
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
          <StHeader flex justify="space-between">
            <DisplayDiv flex>
              <NavigateBtn prev sizeType="header" />
              <h3>다이어리 수정</h3>
            </DisplayDiv>
            <div>
              <span onClick={onUpdateDiaryHandler}>완성</span>
            </div>
          </StHeader>
          <UpdateDiaryBox>
            <UpdateLogoBear>
              <img src={couple === 0 ? soloDiaryBear : coupleDiaryBear} alt="다이어리 생성 곰돌이 그림" />
              <span>{couple === 0 ? "혼자써요 !" : "같이써요 !"}</span>
            </UpdateLogoBear>
            <div className="pencilIcon-box">
              <TiPencil />
            </div>
            <input type="text" defaultValue={updateDiaryData[0].diaryName} ref={diaryTitleInputRef} />
            <Diary bgColor={selectedColor} />
          </UpdateDiaryBox>
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

const UpdateDiaryBox = styled.section`
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
    top: calc(50% - 18.25rem);
    left: calc(50% + 7.5rem);
  }
`;

const UpdateLogoBear = styled.div`
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
