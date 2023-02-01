import { useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

const HashTagInput = ({ tags, setTags }) => {
  // const [tags, setTags] = useState([]);

  const HashTagInputOnchangeHandler = (event) => {
    const { value } = event.target;
    // 6글자 이상이면 자르기
    if (value.length > 6) {
      event.target.value = value.substr(0, 6);
    }
  };

  const HashTagInputKeyDownHandler = (event) => {
    const { value } = event.target;

    if (event.key !== "Enter") return;
    if (!value.trim()) return;

    // 중복 제거
    if (tags.includes(`# ${value}`)) return;

    // 태그가 4개 이상일 경우 filter
    if (tags.length > 4) {
      const sliceTags = tags.slice(1);
      setTags([...sliceTags, `# ${value}`]);
    } else {
      setTags((prev) => [...prev, `# ${value}`]);
    }

    // 입력값 초기화
    event.target.value = "";
  };

  const removeHashTag = (targetIndex) => {
    setTags(tags.filter((e, n) => n !== targetIndex));
  };

  return (
    <StHashTagContainer>
      {tags.map((tag, index) => (
        <StHashTagItem key={`HashTagItem${index}`}>
          <p className="text">{tag}</p>
          <TiDelete className="remove" onClick={() => removeHashTag(index)} />
        </StHashTagItem>
      ))}
      <StHashTagInput
        onChange={HashTagInputOnchangeHandler}
        onKeyUp={HashTagInputKeyDownHandler}
        type="text"
        placeholder="태그는 5개까지 입력이 가능해요 !"
      />
    </StHashTagContainer>
  );
};

export default HashTagInput;

const StHashTagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 0.5rem;
  width: 100%;
  min-height: 4rem;
  border-radius: 5px;
  padding: 0 0.5rem;
  background: #f5f5f5;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StHashTagItem = styled.div`
  width: max-content;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  background: #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  .remove {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 50%;
    margin-left: 0.5rem;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #ff5656;
    }
  }
`;
const StHashTagInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem 0.5rem;
  border: none;
  outline: none;
`;
