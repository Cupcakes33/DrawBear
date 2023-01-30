import { IoMdBookmark } from "react-icons/io";
import { BsChatLeftTextFill, BsFillPersonFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { diaryType } from "../../redux/modules/diarySlice";
import styled from "styled-components";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const footerIconState = queryClient?.getQueryData(["footerIcons"]);
  const { diaries } = queryClient?.getQueryData(["main"]);

  const diaryViewState = (state) => {
    dispatch(diaryType(state));
  };

  const changeSoloView = () => {
    queryClient.setQueryData(["footerIcons"], "solo");
    diaryViewState({ couple: 0 });
    navigate("/");
  };

  const changeCoupleView = () => {
    queryClient.setQueryData(["footerIcons"], "couple");
    diaryViewState({ couple: 1, bookmark: 0 });
    navigate("/");
  };

  const changeFavoriteView = () => {
    queryClient.setQueryData(["footerIcons"], "bookmark");
    diaryViewState({ couple: 2, bookmark: 1 });
    navigate("/");
  };

  const changeChatList = () => {
    queryClient.setQueryData(["footerIcons"], "chatlist");
    const result = diaries.find((diary) => {
      if (diary.couple === 1) {
        return navigate("/chatlist");
      } else {
        return navigate("/");
      }
    });
    return result;
  };

  const changeToSetting = () => {
    queryClient.setQueryData(["footerIcons"], "setting");
    navigate("/setting");
  };

  return (
    <Container>
      <button className={footerIconState === "solo" ? "icons selected" : "icons"} onClick={changeSoloView}>
        <BsFillPersonFill />
        <span>혼자 써요</span>
      </button>
      <button className={footerIconState === "couple" ? "icons selected" : "icons"} onClick={changeCoupleView}>
        <MdPeopleAlt />
        <span>같이 써요</span>
      </button>
      <button className={footerIconState === "bookmark" ? "icons selected" : "icons"} onClick={changeFavoriteView}>
        <IoMdBookmark />
        <span>책갈피</span>
      </button>
      <button className={footerIconState === "chatlist" ? "chaticons selected" : "chaticons"} onClick={changeChatList}>
        <BsChatLeftTextFill />
        <span className="chatSpanTag">채팅</span>
      </button>
      <button className={footerIconState === "setting" ? "icons selected" : "icons"} onClick={changeToSetting}>
        <MdMoreHoriz />
        <span>더보기</span>
      </button>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  button {
    display: grid;
    color: #cccccc;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    :focus {
      color: #3cc7a6;
    }
  }
  .selected {
    color: #3cc7a6;
  }
  span {
    text-align: center;
    font-size: 0.9rem;
  }
  .icons {
    font-size: 4rem;
  }
  .chaticons {
    font-size: 3rem;
  }
  .chatSpanTag {
    margin: 0.5rem 0 -0.5rem 0;
  }
`;
