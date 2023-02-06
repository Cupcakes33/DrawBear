import styled from "styled-components";
import WritePageTutorialModal from "./WritePageTutorialModal";
import { BsQuestionLg } from "react-icons/bs";

const WritePageSubmitHeader = ({ setIsDrawingEnd, isDrawingEnd }) => {
  return (
    <>
      <span onClick={() => setIsDrawingEnd(!isDrawingEnd)}>뒤로가기</span>
      <StDrawindEndHeaderOptionBox>
        <WritePageTutorialModal>
          <StQuestionIcon />
        </WritePageTutorialModal>

        <StWriteFormSubmitBtn type="submit" form="writeForm">
          완성
        </StWriteFormSubmitBtn>
      </StDrawindEndHeaderOptionBox>
    </>
  );
};

export default WritePageSubmitHeader;

const StDrawindEndHeaderOptionBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const StQuestionIcon = styled(BsQuestionLg)`
  font-size: 2.4rem;
  color: var(--grayscale_5);
  cursor: pointer;
`;

const StWriteFormSubmitBtn = styled.button`
  color: #3cc7a6;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1.6rem;
`;
