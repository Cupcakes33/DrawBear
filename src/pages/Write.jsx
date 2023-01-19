import { useState } from "react";
import styled, { css } from "styled-components";
import { StContainer, StHeader, StSection } from "../UI/common";
import { useMutation } from "@tanstack/react-query";
import { diaryApi } from "../apis/axios";

import Canvas from "../components/canvas/Canvas";
import HashTagInput from "../components/common/HashTagInput";
import NavigateBtn from "../components/common/NavigateBtn";
import TextEditor from "../components/common/TextEditor";
import WeatherPicker from "../components/write/WeatherPicker";

import { showModal } from "../redux/modules/UISlice";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../components/common/modal/Alert";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/common/Button";

const Write = () => {
  const [canvas, setCanvas] = useState("");
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState("");
  const [isDrawingEnd, setIsDrawingEnd] = useState(false);
  const [weather, setWeather] = useState("");

  const { isModal } = useSelector((state) => state.UISlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diaryId = useParams().id;

  const { mutate } = useMutation(diaryApi.post, {
    onSuccess: () => {
      dispatch(
        showModal({
          isModal: true,
          content: "다이어리가 작성되었습니다.",
        })
      );
      // navigate(`/list/${diaryId}`);
    },
    onError: (error) => {
      const status = error?.response.request.status;
      status === 401 &&
        dispatch(
          showModal({
            isModal: true,
            content: "인증되지 않은 사용자입니다.",
          })
        );
      status === 404 &&
        dispatch(
          showModal({
            isModal: true,
            content: "잘못된 접근입니다.",
          })
        );
      status === 412 &&
        dispatch(
          showModal({
            isModal: true,
            content: "아직 작성하지 않은 항목이 있습니다.",
          })
        );
    },
  });

  const imgUrlConvertBlob = (canvas) => {
    if (!canvas) return;
    const canvasUrl = canvas.toDataURL("image/png;base64", 0.5);
    const splitDataUrl = canvasUrl.split(",");
    const byteString =
      splitDataUrl[0].indexOf("base64") >= 0
        ? atob(splitDataUrl[1])
        : decodeURI(splitDataUrl[1]);
    const mimeString = splitDataUrl[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  };

  const formEnterKeyPrevent = (event) => {
    event.key === "Enter" && event.preventDefault();
  };

  const writeFormSubmitHandler = (event) => {
    event.preventDefault();
    let blob = imgUrlConvertBlob(canvas);
    let formData = new FormData(event.target);
    console.log(blob);

    formData.get("title");
    formData.get("createdAt");
    console.log(formData.get("radio"));
    formData.append("image", blob, "img.file");
    formData.append("content", contents);
    formData.append("weather", weather || "sunny");
    formData.append("tag", tags);
    mutate({ formData: formData, diaryId: diaryId }, {});
  };

  return (
    <>
      {isModal && <Alert />}
      <StContainer>
        <StHeader flex justify="space-between">
          <NavigateBtn prev />
          <h3>LOGO</h3>
          <span onClick={() => setIsDrawingEnd(!isDrawingEnd)}>
            {isDrawingEnd ? "덜 그렸어요" : "다 그렸어요 !"}
          </span>
        </StHeader>
        <StSlideWrapper isDrawingEnd={isDrawingEnd}>
          <StCanvasSection flex justify="flex-start" derection="column">
            <Canvas canvas={canvas} setCanvas={setCanvas} />
            <TextEditor contents={contents} setContents={setContents} />
          </StCanvasSection>

          <StTextSection>
            <StTextSectionFrom
              onSubmit={writeFormSubmitHandler}
              onKeyDown={formEnterKeyPrevent}
              encType="multipart/form-data"
            >
              <div className="dateInputBox">
                <span>날짜</span>
                <input type="date" name="createdAt" />
              </div>
              <div className="textInputBox">
                <span>제목</span>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해주세요"
                />
              </div>
              <div className="weatherPickerBox">
                <span>오늘의 날씨는 ?</span>
                <WeatherPicker weather={weather} setWeather={setWeather} />
                {/* <WeatherSelector /> */}
              </div>
              <div className="tagInputBox">
                <span>태그</span>
                <HashTagInput tags={tags} setTags={setTags} />
              </div>
              <Button fullWidth color="button_primary" outlined>
                일기장 제출하기
              </Button>
            </StTextSectionFrom>
          </StTextSection>
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

  .dateInputBox {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    span {
      font-size: ${({ theme }) => theme.font.base};
      white-space: nowrap;
    }
    input {
      width: 50%;
      height: 100%;
      border: 1px solid ${({ theme }) => theme.color.border_grayscale};
      border-radius: 5px;
    }
  }

  .textInputBox {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    gap: 2.4rem;
    span {
      font-size: ${({ theme }) => theme.font.base};
      white-space: nowrap;
    }
    input {
      width: 90%;
      height: 100%;
      border: 1px solid ${({ theme }) => theme.color.border_grayscale};
      border-radius: 5px;
      padding: 1rem;
    }
  }

  .weatherPickerBox {
    width: 100%;
    span {
      font-size: ${({ theme }) => theme.font.base};
    }
  }

  .tagInputBox {
    span {
      font-size: ${({ theme }) => theme.font.base};
    }
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
