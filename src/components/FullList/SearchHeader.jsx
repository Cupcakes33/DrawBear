import { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import CalendarModal from "../calendar/CalendarModal";
import { FaRegCalendarAlt } from "react-icons/fa";

const SearchHeader = ({ setChangeHeader }) => {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = () => {
    const allPosts = queryClient.getQueryData(["Allposts_copy"]);
    const filtedPosts = allPosts.filter(
      (e) =>
        e.title.includes(searchValue) ||
        e.tag.replace(/ /g, "").includes(searchValue)
    );

    queryClient.setQueryData(["Allposts"], filtedPosts);
  };

  const searchKeyDownHandler = (e) => {
    if (e.key === "Enter") searchHandler();
  };

  return (
    <StSearchHeaderContents>
      <div>
        <StInput
          placeholder="일기 검색..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={searchKeyDownHandler}
        />
      </div>
      <div>
        <BsSearch onClick={searchHandler} />
        <CalendarModal>
          <FaRegCalendarAlt />
        </CalendarModal>
        <button onClick={() => setChangeHeader(false)}>취소</button>
      </div>
    </StSearchHeaderContents>
  );
};

export default SearchHeader;

const StSearchHeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    gap: 2rem;
    button {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color.button_primary};
      border: 0;
      outline: none;
      background-color: inherit;
      cursor: pointer;
    }
  }
`;

const StInput = styled.input`
  width: 20rem;
  font-size: 1rem;
  border: none;
  border-radius: 15px;
  outline: none;
  background-color: #f0f0f0;
  padding: 1rem 2rem;
  :focus {
  }
`;
