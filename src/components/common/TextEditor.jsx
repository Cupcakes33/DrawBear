import React, { useMemo } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

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
    background-image: url("https://s3-alpha-sig.figma.com/img/f046/dd59/2ffed947d83926f4c2d20beda9db1d32?Expires=1675641600&Signature=F3ccgCb5eiZtVat4JXF-zIpPzPk2M77JScadRp39DTshzMk3bRP70Udn-O~me4hPPIEOvSrl2C5HivRBcisdAnQssmxn9QVEsDkEfsf0gHb~LF-Ueqeyc8d8T6ujLyj~UX3-kxgVfRK6gGQYqVoyBWkYtAO9xWTwHNBxFRqFk7P0TOlEp5tuEoNJKBzvVvp6HGx8OUhdvojmOKwlzEG-DwQ-F6vEkBC-MYNPW5vGFLV8QvQUz~kcj5lBkdvARkMFP2C3npVI9rrazWEPG3tDJ3XKh1KD3dTy8PgjtCpSXRYMsijNkuHGN9Lkz9z~w3TyGl6GI62ohiBcEDt3nneZgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
`;
