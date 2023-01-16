import Modal from "../common/modal/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDiary } from "../../redux/modules/diarySlice";

const CreateDiaryModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Box>
          <DiaryIcon
            onClick={() => {
              dispatch(addDiary(0));
              navigate("/new");
            }}
          >
            그림
          </DiaryIcon>
          <span>혼자써요 !</span>
        </Box>
        <Box>
          <DiaryIcon
            onClick={() => {
              dispatch(addDiary(1));
              navigate("/new");
            }}
          >
            그림
          </DiaryIcon>
          <span>같이써요 !</span>
        </Box>
      </Wrapper>
    </Modal>
  );
};

export default CreateDiaryModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.6rem;
`;

const DiaryIcon = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #d9d9d9;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 0.8rem;
    margin-top: 1.4rem;
  }
`;
