import { useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

const HashTagInput = ({tags, setTags}) => {
  // const [tags, setTags] = useState([]);

  const HashTagInputKeyDownHandler = (event) => {
    if (event.key !== "Enter") return;
    const { value } = event.target;
    if (!value.trim()) return;
    setTags((prev) => [...prev, value]);
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
      <StHashTagInput onKeyUp={HashTagInputKeyDownHandler} type="text" />
    </StHashTagContainer>
  );
};

export default HashTagInput;

const StHashTagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 300px;
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
