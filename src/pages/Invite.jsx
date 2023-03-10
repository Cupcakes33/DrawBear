import styled from "styled-components";
import { flex, StSection } from "../UI/common";
import { BsSearch } from "react-icons/bs";
import NavigateBtn from "../components/common/NavigateBtn";
import { useRef, useState } from "react";
import Toast from "./Toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { inviteApi, mypageApi } from "../apis/axios";
import { useQueryClient } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import useDispatchHook from "../hooks/useDispatchHook";
import Buttons from "../components/common/Button/Buttons";
import {Header} from "../components/common/header/Header";

const Invite = () => {
  const [name, setName] = useState("");
  const [isInvite, setIsInvite] = useState(false);
  const [inviteUserInfo, setInviteUserInfo] = useState({});
  const [hostUserInfo, setHostUserInfo] = useState({});
  const [popup, setPopup] = useState(false);
  const queryClient = useQueryClient();
  const { openAlertModal } = useDispatchHook();
  const socket = useRef(null);
  const { id } = useParams();
  const { data } = useQuery(["setting"], mypageApi.read);
  const nameChangeHandle = (event) => {
    setName(event.target.value);
  };
  const { mutate: inviteSearchMutate } = useMutation(
    (name) => inviteApi.search(name),
    {
      onError: (error) => {
        const status = error?.response.status;
        if (status === 404) {
          openAlertModal({ isModal: true, bigTxt: "닉네임을 입력해주세요" });
        }
        if (status === 500) {
          openAlertModal({
            bigTxt: "다른 사람의 닉네임을 입력해주세요",
          });
          setName("");
        }
      },
      onSuccess: ({ userInfo }) => {
        setInviteUserInfo({ ...userInfo });
        queryClient.setQueryData(["searchNickname"], userInfo);
      },
    }
  );
  const { mutate: inviteMutate } = useMutation(
    (inviteData) => inviteApi.invite(inviteData),
    {
      onError: (error) => {
        const status = error.response.status;
        if (status === 401)
          openAlertModal({ bigTxt: "이미 공유하고있는 다이어리 입니다." });
      },
      onSuccess: () => {
        setIsInvite(!isInvite);
        setPopup(!popup);
      },
    }
  );

  const userSearchOnclickHandle = () => {
    inviteSearchMutate(name);
    setHostUserInfo({ ...data.userInfo });
  };
  const userInviteOnClickHandle = () => {
    const inviteData = {
      diaryId: Number(id),
      invitedId: inviteUserInfo.userId,
    };
    inviteMutate(inviteData);
  };

  return (
    <>
      <Header flex justify="flex-start">
        <NavigateBtn prev sizeType="header" link="/" />
        <h3>같이 쓰는 멤버 초대</h3>
      </Header>
      <StInviteSection>
        <StSearchInputWrapper>
          <div>
            <input
              type="text"
              onChange={nameChangeHandle}
              value={name}
              placeholder="초대 할 멤버의 닉네임을 입력해주세요."
            ></input>
          </div>
          <Buttons.Small onClick={userSearchOnclickHandle}>검색</Buttons.Small>
        </StSearchInputWrapper>
        {Object.keys(inviteUserInfo).length !== 0 && (
          <StSearchUserInfoWrapper>
            <StSearchUserInfo key={`userId${inviteUserInfo.userId}`}>
              <img src={inviteUserInfo.profileImg} alt="profile" />
              <div>
                <span>{inviteUserInfo.nickname}</span>
                <span>{inviteUserInfo.email}</span>
              </div>
              <StIsviteBtn
                isinvite={isInvite.toString()}
                disabled={isInvite ? true : false}
                onClick={userInviteOnClickHandle}
                type="button"
              >
                {isInvite ? "초대 중" : "초대하기"}
              </StIsviteBtn>
            </StSearchUserInfo>
            {popup && (
              <Toast
                nickName={inviteUserInfo.nickname}
                setPopup={setPopup}
                text="님을 초대하였습니다."
              />
            )}
          </StSearchUserInfoWrapper>
        )}
      </StInviteSection>
    </>
  );
};

export default Invite;

const StInviteSection = styled(StSection)``;

const StSearchInputWrapper = styled.div`
  ${flex("", "")}
  position: relative;
  gap: 1rem;
  width: 100%;
  height: 5rem;
  & div {
    width: 100%;
    height: 100%;
  }
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 1rem;
    display: block;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px palevioletred;
      transition: box-shadow 0.15s ease-in-out;
    }
  }
`;

const StSearchBtn = styled(BsSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.8rem;
  cursor: pointer;
`;

const StSearchUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;
`;

const StSearchUserInfo = styled.div`
  ${flex("space-between", "")}
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  div {
    ${flex("", "flex-start", "column")}
    width: 100%;
    height: 100%;
    span {
      font-size: 1.4rem;
      font-weight: 600;
      &:last-child {
        font-size: 1.2rem;
        font-weight: 400;
        color: #d9d9d9;
      }
    }
  }
`;
const StIsviteBtn = styled.button`
  width: 8.2rem;
  height: 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: ${(props) => (props.isinvite === "false" ? "#FF7070" : "#9E9E9E")};
  cursor: pointer;
`;
