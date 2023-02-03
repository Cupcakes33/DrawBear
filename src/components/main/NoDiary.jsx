import styled from "styled-components";
import CreateDiaryModal from "./CreateDiaryModal";
import NoDiaryBear from "../../assets/images/noDiaryBear.webp";
import { flex } from "../../UI/common";
import { useSelector } from "react-redux";
import useDispatchHook from "../../hooks/useDispatchHook";
import Diary from "./Diary/Diary";

const NoDiary = () => {
  const { icon } = useSelector((state) => state.diarySlice.diaryTypes);
  const { changeDiaryView } = useDispatchHook();

  return (
    <>
      <StContainer>
        <StWrapper>
          {icon === "bookmark" ? (
            <>
              <h3>즐겨찾기 한 다이어리가 없어요</h3>
              <div className="addDiary">
                <Diary size="bookmark" />
                <span>책갈피 아이콘을 눌러 즐겨찾기 해보세요!</span>
              </div>
            </>
          ) : (
            <>
              <h3>아직 다이어리가 없어요</h3>
              <CreateDiaryModal>
                <div className="addDiary">
                  <img src={NoDiaryBear} alt="다이어리 없을 때 곰돌이 그림" />
                  <span>여기를 눌러 첫 다이어리를 만들어보세요</span>
                </div>
              </CreateDiaryModal>
            </>
          )}
        </StWrapper>
      </StContainer>
    </>
  );
};

export default NoDiary;

const StContainer = styled.div`
  height: 85vh;
  display: flex;
  justify-content: center;
`;

const StWrapper = styled.div`
  ${flex("", "", "column")}
  .addDiary {
    ${flex("", "", "column")}
  }
  img {
    width: 10.5rem;
    height: 11.5rem;
  }
  h3 {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  span {
    font-size: 0.8rem;
    margin-top: 1.4rem;
    color: #c1c1c1;
  }
`;
