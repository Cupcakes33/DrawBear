import { useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

const HashTagInput = ({ tags, setTags }) => {
  // const [tags, setTags] = useState([]);
  const HashTagInputOnchangeHandler = (event) => {
    const { value } = event.target;
    if (value.length > 6) {
      event.target.value = value.substr(0, 6);
    }
  };

  const HashTagInputKeyDownHandler = (event) => {
    const { value } = event.target;

    if (event.key !== "Enter") return;

    // 공백시 리턴
    if (!value.trim()) return;

    // 태그가 2개 이상일 경우 filter
    if (tags.length > 2) {
      const filtedTags = tags.filter((tag) => tag !== tags[0]);
      setTags([...filtedTags, `# ${value}`]);
    } else {
      setTags((prev) => [...prev, `# ${value}`]);
    }

    // 입력값 초기화
    event.target.value = "";
    console.log(tags);
  };

  const removeHashTag = (targetIndex) => {
    setTags(tags.filter((e, n) => n !== targetIndex));
  };

  return (
    <StHashTagContainer>
      {tags.map((tag, index) => (
        <StHashTagItem key={`HashTagItem${index}`}>
          <span className="text">{tag}</span>
          <TiDelete className="remove" onClick={() => removeHashTag(index)} />
        </StHashTagItem>
      ))}
      <StHashTagInput
        onChange={HashTagInputOnchangeHandler}
        onKeyUp={HashTagInputKeyDownHandler}
        type="text"
        placeholder="태그는 3개까지 입력이 가능해요 !"
      />
    </StHashTagContainer>
  );
};

export default HashTagInput;

const StHashTagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 0.5rem;
`;

const StHashTagItem = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  background: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;

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
