import React from "react";
import styled from "styled-components";
import CreateDiaryModal from "./CreateDiaryModal";
import Diaries from "./Diaries";
import Buttons from "../common/Button/Buttons";

const DiaryList = ({ diaryData }) => {
  return (
    <>
      <DiaryListBox>
        <Diaries diaryData={diaryData} />
        <CreateDiaryModal>
          <StAddDiaryButton />
        </CreateDiaryModal>
      </DiaryListBox>
    </>
  );
};

export default DiaryList;

const DiaryListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StAddDiaryButton = React.memo(styled(Buttons.AddDiary)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`);

