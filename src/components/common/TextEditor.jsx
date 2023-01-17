import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
};

export default TextEditor;

const StReactQuill = styled(ReactQuill)`
  width: 100%;
  height: 36rem;
`;
