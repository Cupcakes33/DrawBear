import React from "react";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../../../apis/axios";
import AlertModal from "../modal/AlertModal";
import useDispatchHook from "../../../hooks/useDispatchHook";

const ListPageDropdown = ({ postId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openAlertModal } = useDispatchHook();

  const { mutate: postDeleteMutate } = useMutation({
    mutationFn: () => postsApi.delete(postId),
    onError: (err) => {
      const status = err?.response.request.status;
      status === 401 && openAlertModal({ bigTxt: "권한이 없습니다" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Allposts"]);
      openAlertModal({ bigTxt: "성공적으로 삭제했어요 !" });
    },
  });

  const postUpdateHandler = () => {
    navigate(`/detail/${postId}/update`);
  };

  const postDeleteHandler = () => {
    postDeleteMutate(postId);
  };

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
            <StMenu onClick={postUpdateHandler}>
              <span>수정</span>
            </StMenu>
          </Dropdown.Menu>
          <Dropdown.Menu>
            <AlertModal
              select
              bigTxt={"정말 일기를 삭제할까요?"}
              smallTxt={"삭제한 일기는 복구할 수 없어요"}
              onClick={postDeleteHandler}
            >
              <StMenu>
                <span className="deleteBtn">삭제</span>
              </StMenu>
            </AlertModal>
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
    color: var(--negative);
  }
`;
