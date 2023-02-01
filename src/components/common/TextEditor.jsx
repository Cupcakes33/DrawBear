import React, { useMemo } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import borderLine from "../../assets/images/borderLine.png";

const TextEditor = ({ contents, setContents }) => {
  // const [contents, setContents] = useState("");
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ size: ["small", false, "large", "huge"] }],
        ],
      },
    }),
    []
  );

  return (
    <StReactQuill
      value={contents}
      onChange={setContents}
      modules={modules}
      theme="bubble"
      placeholder="일기를 작성해보세요 !"
    />
  );
};

export default TextEditor;

const StReactQuill = styled(ReactQuill)`
  position: relative;
  width: 100%;
  height: 36rem;
  padding: 0;
  * {
    font-family: ZigleTTFBold;
    font-size: 2rem;
  }

  .ql-editor {
    height: 100%;
    padding: 0;
  }

  p {
    position: relative;
    margin-bottom: 2rem;
    padding: 0 1.5rem;
  }

  p::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1rem;
    width: 100%;
    height: 1.5rem;
    background-image: url(${borderLine});
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
`;
