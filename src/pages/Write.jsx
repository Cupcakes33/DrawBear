import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { StContainer, StHeader, StSection } from "../UI/common";

import Canvas from "../components/FabricCanvas/Canvas";
import HashTagInput from "../components/common/HashTagInput";
import NavigateBtn from "../components/common/NavigateBtn";

const Write = () => {
  const [canvas, setCanvas] = useState("");
  const [tags, setTags] = useState([]);
  const [isDrawingEnd, setIsDrawingEnd] = useState(false);

  const writeFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log(canvas.toDataURL());
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
          <textarea></textarea>
        </StCanvasSection>
        <StTitleSection>
          <form onSubmit={writeFormSubmitHandler}>
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
              <input type="date" name="date" placeholder="2023.01.01" />
            </div>
            <div>
              <span>태그 :</span>
              <HashTagInput tags={tags} setTags={setTags}/>
            </div>
            <button>일기 작성하기</button>
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
