import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { GoTriangleDown } from "react-icons/go";

const FilterDropdown = () => {
  const [filter, setFilter] = useState("전체");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const filterRef = useRef();
  const btnRef = useRef();

  const filterDropdownClickHandler = (event) => {
    const { innerText } = event.target;
    setSelected(innerText);
    setFilter(innerText);
    setOpen(false);
  };

  const filterDropdownOpenHandler = () => {
    setOpen(!open);
  };

  const filterDropdownCloseHandler = (event) => {
    if (!filterRef.current) return;
    if (!filterRef.current.contains(event.target)) {
      if (!btnRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", filterDropdownCloseHandler);
    return () => {
      document.removeEventListener("mousedown", filterDropdownCloseHandler);
    };
  }, []);

  return (
    <StFilterDropdownContainer>
      <div
        className="filterDropdownHeader"
        onClick={filterDropdownOpenHandler}
        ref={btnRef}
      >
        <p>{selected}</p>
        <GoTriangleDown />
      </div>
      {open && (
        <ul className="filterDropdownContents" ref={filterRef}>
          <li onClick={filterDropdownClickHandler}>최신순</li>
          <li onClick={filterDropdownClickHandler}>오름차순</li>
          <li onClick={filterDropdownClickHandler}>내림차순</li>
          <li onClick={filterDropdownClickHandler}>북마크</li>
        </ul>
      )}
    </StFilterDropdownContainer>
  );
};

export default FilterDropdown;

const StFilterDropdownContainer = styled.div`
  position: relative;
  width: 10rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  .filterDropdownHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    p {
      font-size: 1.5rem;
    }
    svg {
      font-size: 1.5rem;
    }
  }
  .filterDropdownContents {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: min-content;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    background-color: #fff;
    list-style: none;
    li {
      width: 100%;
      height: 100%;
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;
