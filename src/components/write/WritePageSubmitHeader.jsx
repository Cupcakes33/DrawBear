import styled from "styled-components";
import WritePageTutorialModal from "./WritePageTutorialModal";
import { BsQuestionLg } from "react-icons/bs";

const WritePageSubmitHeader = ({ setIsDrawingEnd, isDrawingEnd }) => {
  return (

    <StDrawindEndHeaderOptionBox>
      <span onClick={() => setIsDrawingEnd(!isDrawingEnd)}>뒤로가기</span>
      <div className="submit-header-wrap">
        <WritePageTutorialModal>
          <StQuestionIcon />
        </WritePageTutorialModal>
        <StWriteFormSubmitBtn type="submit" form="writeForm">
          완성
        </StWriteFormSubmitBtn>
      </div>
    </StDrawindEndHeaderOptionBox>
  );
};

export default WritePageSubmitHeader;

const StDrawindEndHeaderOptionBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .submit-header-wrap {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }

  span {
    cursor: pointer;
  }
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
