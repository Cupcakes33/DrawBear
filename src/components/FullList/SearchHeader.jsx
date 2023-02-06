import { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import CalendarModal from "../common/calendar/CalendarModal";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Header } from "../common/header/Header";

const SearchHeader = ({ setChangeHeader }) => {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = () => {
    const allPosts = queryClient.getQueryData(["Allposts_copy"]);
    const filtedPosts = allPosts.filter(
      (e) => e.title.includes(searchValue) || e.tag.replace(/ /g, "").includes(searchValue)
    );

    queryClient.setQueryData(["Allposts"], filtedPosts);
  };

  const searchKeyDownHandler = (e) => {
    if (e.key === "Enter") searchHandler();
  };

  return (
    <Header.SpaceBetween>
      <Header.Back notBack>
        <StInput
          placeholder="일기 검색..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={searchKeyDownHandler}
        />
      </Header.Back>
      <Header.OnClickBtn color="#242424">
        <BsSearch onClick={searchHandler} />
        <CalendarModal>
          <FaRegCalendarAlt />
        </CalendarModal>
        <StButton onClick={() => setChangeHeader(false)}>취소</StButton>
      </Header.OnClickBtn>
    </Header.SpaceBetween>
  );
};

export default SearchHeader;

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

const StButton = styled.button`
  font-size: 1.5rem;
  color: #3cc7a6;
  border: 0;
  outline: none;
  background-color: inherit;
  cursor: pointer;
`;
