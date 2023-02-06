import styled from "styled-components";
import { Modal } from "../common/modal/ReactModal";
import write_tutorial from "../../assets/images/write_tutorial.svg";
import { GrClose } from "react-icons/gr";

const WritePageTutorialModal = ({ children }) => {
  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Portal>
        <Modal.BackDrop notClose>
          <Modal.ContentBox>
            <StTutorialModalInner>
              <Modal.Close>
                <StCloseBtn />
              </Modal.Close>
              <img src={write_tutorial} alt="write_tutorial" />
            </StTutorialModalInner>
          </Modal.ContentBox>
        </Modal.BackDrop>
      </Modal.Portal>
    </Modal>
  );
};
export default WritePageTutorialModal;

const StTutorialModalInner = styled.div`
  position: relative;
  width: 30rem;
  height: 16.5rem;
  box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  img {
    width: 100%;
  }
`;

const StCloseBtn = styled(GrClose)`
  position: absolute;
  top: 2rem;
  right: 1rem;
  width: 1.5rem;
  cursor: pointer;
`;
