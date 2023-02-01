import { useState, useRef, useCallback } from "react";
import styled, { css } from "styled-components";
import { StContainer, StHeader, StSection } from "../UI/common";
import { useMutation } from "@tanstack/react-query";
import { postsApi } from "../apis/axios";

import Canvas from "../components/canvas/Canvas";
import HashTagInput from "../components/common/HashTagInput";
import NavigateBtn from "../components/common/NavigateBtn";
import TextEditor from "../components/common/TextEditor";
import WeatherPicker from "../components/write/WeatherPicker";
import Alert from "../components/common/modal/AlertModal";
import { useNavigate, useParams } from "react-router-dom";
import { imgUrlConvertBlob } from "../utils/imgUrlConvertBlob";
import { ErrorModal } from "../redux/modules/UISlice";
import { useDispatch } from "react-redux";

const Write = () => {
  const [canvas, setCanvas] = useState("");
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState("");
  const [isDrawingEnd, setIsDrawingEnd] = useState(false);
  const [weather, setWeather] = useState("");

  const dispatch = useDispatch();
  const diaryId = useParams().id;

  const { mutate } = useMutation(postsApi.post, {
    onSuccess: () => {
      dispatch((ErrorModal({ isModal: true,
        bigTxt: "다이어리가 작성되었습니다.",
        move: `/list/${diaryId}`,
      })));
    },
    onError: (error) => {
      const status = error?.response.request.status;
      status === 401 &&
        dispatch((ErrorModal({ isModal: true,
          bigTxt: "인증되지 않은 사용자입니다.",
        })));

      status === 404 &&
        dispatch((ErrorModal({ isModal: true,
          bigTxt: "잘못된 접근입니다.",
        })));

      status === 412 &&
        dispatch((ErrorModal({ isModal: true,
          bigTxt: "아직 작성하지 않은 항목이 있습니다.",
        })));
    },
  });

  const formEnterKeyPrevent = (event) => {
    event.key === "Enter" && event.preventDefault();
  };

  const writeFormSubmitHandler = (event) => {
    event.preventDefault();
    let blob = imgUrlConvertBlob(canvas);
    let formData = new FormData(event.target);

    formData.get("title");
    formData.get("createdAt");

    formData.append("image", blob, "img.file");
    formData.append("content", contents);
    formData.append("weather", weather || "sun");
    formData.append("tag", tags);
    mutate({ formData: formData, diaryId: diaryId }, {});
  };

  const defaultHeader = () => {
    return (
      <>
        <NavigateBtn prev link={`/list/${diaryId}`} />
        <h3>LOGO</h3>
        <span onClick={() => setIsDrawingEnd(!isDrawingEnd)}>다음</span>
      </>
    );
  };

  const drawingEndHeader = () => {
    return (
      <>
        <span onClick={() => setIsDrawingEnd(!isDrawingEnd)}>뒤로가기</span>
        <span>
          <StWriteFormSubmitBtn type="submit" form="writeForm">
            완성
          </StWriteFormSubmitBtn>
        </span>
      </>
    );
  };

  return (
    <>
      <StContainer>
        <StHeader flex justify="space-between" aline="center">
          {isDrawingEnd ? drawingEndHeader() : defaultHeader()}
        </StHeader>
        <StSlideWrapper isDrawingEnd={isDrawingEnd}>
          <StTextSection>
            <StTextSectionFrom
              id="writeForm"
              onSubmit={writeFormSubmitHandler}
              onKeyDown={formEnterKeyPrevent}
              encType="multipart/form-data"
            >
              <StTextSectionBox className="titleInputBox">
                <span>날짜</span>
                <input type="date" name="createdAt" />
              </StTextSectionBox>
              <StTextSectionBox className="tagInputBox">
                <span>태그</span>
                <HashTagInput tags={tags} setTags={setTags} />
              </StTextSectionBox>
              <StTextSectionBox className="textInputBox">
                <span>제목</span>
                <input type="text" name="title" placeholder="제목을 입력해주세요" />
              </StTextSectionBox>
              <StTextSectionBox className="weatherPickerBox">
                <span>오늘의 날씨는 ?</span>
                <WeatherPicker weather={weather} setWeather={setWeather} />
              </StTextSectionBox>
            </StTextSectionFrom>
          </StTextSection>
          <StCanvasSection flex justify="flex-start" derection="column">
            <Canvas canvas={canvas} setCanvas={setCanvas} />
            <TextEditor contents={contents} setContents={setContents} />
          </StCanvasSection>
        </StSlideWrapper>
      </StContainer>
    </>
  );
};

export default Write;

const StCanvasSection = styled(StSection)`
  min-height: calc(100vh - 6rem);
`;

const StTextSection = styled(StSection)`
  min-height: calc(100vh - 6rem);
`;

const StTextSectionFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  .titleInputBox {
    input {
      flex-grow: 0;
      width: 50%;
    }
  }

  .tagInputBox {
    input {
      background: none;
    }
  }

  .weatherPickerBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const StTextSectionBox = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 2.4rem;

  span {
    font-size: 1.4rem;
    white-space: nowrap;
  }
  input {
    flex-grow: 1;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 8px;
    background: #f5f5f5;
    padding: 1rem;
  }
`;

const StSlideWrapper = styled.div`
  position: relative;
  width: 200%;
  height: 100%;
  min-height: calc(100vh - 6rem);
  display: flex;
  transition: transform 0.4s ease-in-out;
  ${(props) =>
    props.isDrawingEnd &&
    css`
      transform: translateX(-50%);
    `}
`;

const StWriteFormSubmitBtn = styled.button`
  color: #3cc7a6;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1.6rem;
`;
