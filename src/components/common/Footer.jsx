import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChatLeftTextFill, BsFillPersonFill } from "react-icons/bs";
import { IoMdBookmark } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { alarmApi } from "../../apis/axios";
import useDispatchHook from "../../hooks/useDispatchHook";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { changeDiaryView } = useDispatchHook();

  const { pathname } = location;

  const footerIconState = queryClient?.getQueryData(["footerIcons"]);
  // const { diaries } = queryClient?.getQueryData(["main"]);

  const { data = [] } = useQuery(["allAlarm"], alarmApi.read, {
    refetchInterval: 3000,
  });

  const changeChatList = () => {
    queryClient.setQueryData(["footerIcons"], "chatlist");
    navigate("/chatlist");
    // const result = diaries.find((diary) => {
    //   if (diary.couple === 1) {
    //     return navigate("/chatlist");
    //   } else {
    //     return navigate("/");
    //   }
    // });
    // return result;
  };

  return (
    <Container>
      <button
        className={
          footerIconState === "solo" || (footerIconState === undefined && pathname !== "/setting")
            ? "icons selected"
            : "icons"
        }
        onClick={() => changeDiaryView({ icon: "solo", couple: 0, bookmark: 0 })}
      >
        <BsFillPersonFill />
        <span>혼자 써요</span>
      </button>
      <button
        className={footerIconState === "couple" ? "icons selected" : "icons"}
        onClick={() => changeDiaryView({ icon: "couple", couple: 1, bookmark: 0 })}
      >
        <MdPeopleAlt />
        <span>같이 써요</span>
      </button>
      <button
        className={footerIconState === "bookmark" ? "icons selected" : "icons"}
        onClick={() => changeDiaryView({ icon: "bookmark", couple: 2, bookmark: 1 })}
      >
        <IoMdBookmark />
        <span>책갈피</span>
      </button>
      <button className={footerIconState === "chatlist" ? "chaticons selected" : "chaticons"} onClick={changeChatList}>
        <BsChatLeftTextFill />
        <span className="chatSpanTag">채팅</span>
      </button>
      <button
        className={footerIconState === "setting" || pathname === "/setting" ? "icons selected" : "icons"}
        onClick={() => changeDiaryView({ icon: "setting", couple: 1, bookmark: 0, move: "/setting" })}
      >
        {data?.Notifications?.length !== 0 && <BsDot className="alarm-dot" />}
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
  .alarm-dot {
    font-size: 3rem;
    color: red;
    position: fixed;
    bottom: 4%;
    right: calc(50% - 16.5rem);
  }
`;
