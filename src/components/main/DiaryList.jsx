import styled from "styled-components";
import CreateDiaryModal from "./CreateDiaryModal";
import Diaries from "./Diaries";
import { BsPlusLg } from "react-icons/bs";

const DiaryList = ({ diaryData }) => {
  return (
    <>
      <StContainer>
        <Diaries diaryData={diaryData} />
        <CreateDiaryModal>
          <DiaryAddButoon>
            <BsPlusLg className="plus" />
          </DiaryAddButoon>
        </CreateDiaryModal>
      </StContainer>
    </>
  );
};

export default DiaryList;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DiaryAddButoon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: white;
  border: 0;
  border-radius: 100%;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
  width: 5.4rem;
  height: 5.4rem;
  top: 80%;
  left: calc(50% - 2.5rem);
  cursor: pointer;
  .plus {
    color: #9e9e9e;
  }
`;
