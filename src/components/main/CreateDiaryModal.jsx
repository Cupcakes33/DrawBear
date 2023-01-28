import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDiary } from "../../redux/modules/diarySlice";
import soloDiaryBear from "../../assets/images/soloDiaryBear.webp";
import coupleDiaryBear from "../../assets/images/coupleDiaryBear.webp";
import { Modal } from "../common/modal/ReactModal";
import { flex } from "../../UI/common";

const CreateDiaryModal = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Portal>
        <Modal.BackDrop>
          <Modal.ContentBox>
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
          </Modal.ContentBox>
        </Modal.BackDrop>
      </Modal.Portal>
    </Modal>
  );
};

export default CreateDiaryModal;

const Wrapper = styled.div`
  ${flex}
  width: 28.3rem;
  height: 18.6rem;
  gap: 3.6rem;
  background-color: white;
  box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.08);
  border-radius: 26px;
`;

const Box = styled.div`
  ${flex}
  flex-direction: column;
  cursor: pointer;
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
