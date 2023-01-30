import React from "react";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Dropdown from "./Dropdown";

const ListPageDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle>
        <StToggleSwitch>
          <BiDotsVerticalRounded />
        </StToggleSwitch>
      </Dropdown.Toggle>
      <Dropdown.Container>
        <Dropdown.Wrapper>
          <Dropdown.Menu>
            <StMenu>
              <span>수정</span>
            </StMenu>
          </Dropdown.Menu>
          <Dropdown.Menu>
            <StMenu>
              <span className="deleteBtn">삭제</span>
            </StMenu>
          </Dropdown.Menu>
        </Dropdown.Wrapper>
      </Dropdown.Container>
    </Dropdown>
  );
};

export default ListPageDropdown;

const StToggleSwitch = styled.div`
  width: 2.4rem;
  height: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 2.4rem;
    color: #cccccc;
  }
`;

const StMenu = styled.div`
  padding: 0.6rem 1.4rem;
  white-space: nowrap;
  span {
    font-size: 1.4rem;
  }
  .deleteBtn {
    color: ${(props) => props.theme.color.button_alart};
  }
`;
