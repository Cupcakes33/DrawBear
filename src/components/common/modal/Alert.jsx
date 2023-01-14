import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showModal } from "../../../redux/modules/UISlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.UISlice);

  return (
    <StBox>
      <div>{content}</div>
      <hr />
      <button onClick={() => dispatch(showModal(false))}>확인</button>
    </StBox>
  );
};

export default Alert;

const StBox = styled.div`
  display: grid;
  width: 28rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 12px;
  box-shadow: 0 1px 4px #d7d7d7;
  background-color: white;
  div {
    display: flex;
    text-align: center;
    word-break: keep-all;
    align-items: center;
    height: 13rem;
    font-size: 1.4rem;
    padding: 3rem;
    font-weight: 700;
  }
  hr {
    height: 0.1rem;
    border: 0;
    background-color: #d7d7d7;
  }
  button {
    height: 4rem;
    color: #3cc7a6;
    border: none;
    background-color: white;
  }
`;
