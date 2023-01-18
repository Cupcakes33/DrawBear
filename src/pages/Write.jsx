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
import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";

const Write = () => {
  const [canvas, setCanvas] = useState("");
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState("");
  const [isDrawingEnd, setIsDrawingEnd] = useState(false);

  const { isModal } = useSelector((state) => state.UISlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation(diaryApi.post, {
    onSuccess: () => {
      navigate("/list/");
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
    const byteString = splitDataUrl[0].indexOf("base64") >= 0 ? atob(splitDataUrl[1]) : decodeURI(splitDataUrl[1]);
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
    formData.append("image", blob, "img.file");
    formData.append("content", contents);
    formData.append("weather", "눈");
    formData.append("tag", tags);
    mutate({ formData: formData, diaryId: 10 }, {});
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

          <StTitleSection flex justify="flex-start" derection="column">
            <form
              onSubmit={writeFormSubmitHandler}
              onKeyDown={formEnterKeyPrevent}
              encType="multipart/form-data"
            >
              <div className="box dateInputBox">
                <span>날짜</span>
                <input type="date" name="createdAt" />
              </div>
              <div className="box HashTagInputBox">
                <span>태그</span>
                <HashTagInput tags={tags} setTags={setTags} />
              </div>
              <div className="box titleInputBox">
                <span>제목</span>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해주세요"
                />
              </div>

              <div className="box weatherPickerBox">
                <span>날씨 :</span>
                <WeatherPicker />
              </div>

              <button type="submit">일기 작성하기</button>
            </form>
          </StTitleSection>
        </StSlideWrapper>
      </StContainer>
    </>
  );
};

export default Write;

const StCanvasSection = styled(StSection)`
  min-height: calc(100vh - 6rem);
`;

const StTitleSection = styled(StSection)`
  min-height: calc(100vh - 6rem);

  .box {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
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

// 리팩토링 시 하나로 묶으면 좋을 것 같습니다.

const StBoxdesign = css`
  width: 100%;
  height: 3rem;
  border-radius: 10px;
`;
