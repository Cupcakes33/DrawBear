import Modal from "../common/modal/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDiary } from "../../redux/modules/diarySlice";
import soloDiaryBear from "../../assets/images/soloDiaryBear.webp";
import coupleDiaryBear from "../../assets/images/coupleDiaryBear.webp";
import { AiOutlineClose } from "react-icons/ai";

const CreateDiaryModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal onClose={onClose}>
      <AiOutlineClose onClose />
      <Wrapper>
        <Box>
          <img
            src={soloDiaryBear}
            alt="솔로 다이어리 곰돌이 그림"
            onClick={() => {
              dispatch(addDiary(0));
              navigate("/new");
            }}
          />
          <span>혼자써요 !</span>
        </Box>
        <Box>
          <img
            src={coupleDiaryBear}
            alt="커플 다이어리 곰돌이 그림"
            onClick={() => {
              dispatch(addDiary(1));
              navigate("/new");
            }}
          />
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 6.5rem;
    height: 7.3rem;
    :last-child {
      width: 7.4rem;
      height: 7.3rem;
    }
  }
  span {
    font-size: 1.4rem;
    margin-top: 1.4rem;
  }
`;
