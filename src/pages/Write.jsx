import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { StContainer, StHeader, StSection } from "../UI/common";
import { useMutation } from "@tanstack/react-query";
import { diaryApi } from "../apis/axios";

import Canvas from "../components/FabricCanvas/Canvas";
import HashTagInput from "../components/common/HashTagInput";
import NavigateBtn from "../components/common/NavigateBtn";
import TextEditor from "../components/common/TextEditor";

const Write = () => {
  const [canvas, setCanvas] = useState("");
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState("");
  const [isDrawingEnd, setIsDrawingEnd] = useState(false);
  const { mutate, isSuccess, isError, error, isLoading } = useMutation(() =>
    diaryApi.post()
  );

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

  const writeFormSubmitHandler = (event) => {
    event.preventDefault();
    let blob = imgUrlConvertBlob(canvas);
    let formData = new FormData(event.target);
    console.log(blob);

    formData.get("title");
    formData.get("createdAt");
    formData.append("image", blob, "img.file");
    formData.append("content", "test");
    formData.append("weather", "눈");
    formData.append("tag", tags);

    mutate(formData, 10);
  };

  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <NavigateBtn prev />
        <h3>LOGO</h3>
        <span onClick={() => setIsDrawingEnd(!isDrawingEnd)}>
          {isDrawingEnd ? "다 그렸어요 !" : "덜 그렸어요"}
        </span>
      </StHeader>
      <StSlideWrapper isDrawingEnd={isDrawingEnd}>
        <StCanvasSection>
          <Canvas canvas={canvas} setCanvas={setCanvas} />
          <TextEditor contents={contents} setContents={setContents} />
        </StCanvasSection>
        <StTitleSection>
          <form onSubmit={writeFormSubmitHandler} encType="multipart/form-data">
            <div>
              <span>제목 :</span>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div>
              <span>날짜 :</span>
              <input type="date" name="createdAt" placeholder="2023.01.01" />
            </div>

            <div>
              <span>태그 :</span>
              <HashTagInput tags={tags} setTags={setTags} />
            </div>
            <button type="submit">일기 작성하기</button>
          </form>
        </StTitleSection>
      </StSlideWrapper>
    </StContainer>
  );
};

export default Write;

const StCanvasSection = styled(StSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  /* ${(props) =>
    !props.drawing &&
    css`
      display: none;
    `} */

  textarea {
    width: 100%;
    height: 10rem;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 1rem;
    margin-top: 1rem;
    resize: none;
  }
`;

const StTitleSection = styled(StSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  /* ${(props) =>
    props.drawing &&
    css`
      display: none;
    `} */
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  input {
    width: 80%;
    height: 3rem;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 1rem;
  }
  button {
    width: 100%;
    height: 3rem;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const StSlideWrapper = styled.div`
  width: 200%;
  display: flex;
  transition: transform 0.4s ease-in-out;
  ${(props) =>
    props.isDrawingEnd &&
    css`
      transform: translateX(-50%);
    `}
`;
