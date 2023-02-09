import styled, { css } from "styled-components";
import { flex } from "../../UI/common";

const ToggleBtn = ({ isChecked, ToggleBtnChangehandler }) => {
  return (
    <StToggleBtnContainer>
      <input
        id="toggle-switch"
        onChange={ToggleBtnChangehandler}
        checked={isChecked}
        type="checkbox"
      />
      <label htmlFor="toggle-switch">
        <span />
      </label>
    </StToggleBtnContainer>
  );
};

export default ToggleBtn;

const StToggleBtnContainer = styled.div`
  input {
    display: none;
  }
  /* Switch Body */
  label {
    ${flex("space-between", "")}
    cursor: pointer;
    width: 3.5rem;
    height: 2rem;
    background: #06d6a0;
    border-radius: 40px;
    position: relative;
    transition: background-color 0.3s;
  }
  /* Switch Btn */
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    transition: 0.3s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.25);
  }
  input:checked + label {
    background: #ef476f;
    span {
      left: calc(100% - 0.2rem);
      transform: translate(-100%, -50%);
    }
  }
`;
