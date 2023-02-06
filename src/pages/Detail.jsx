import styled from "styled-components";
import Comment from "../components/detail/Comment";

import HeaderText from "../components/header/HeaderText";
import { StHeader, StContainer, StSection, StFooter } from "../UI/common";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi, postsApi } from "../apis/axios";
import { useNavigate, useParams } from "react-router-dom";
import NavigateBtn from "../components/common/NavigateBtn";
import Button from "../components/common/Button";
import borderLine from "../assets/images/borderLine.png";
import { AiOutlineArrowUp } from "react-icons/ai";
import { weatherIcon } from "../assets/images/weather";
import AlertModal from "../components/common/modal/AlertModal";
import Buttons from "../components/common/Button/Buttons";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams().id;
  const diaryName = localStorage.getItem("diaryName");
  const queryClient = useQueryClient();

  const {
    data = {},
    error,
    isError,
    isLoading,
  } = useQuery(["posts"], () => postsApi.get(params));

  const {
    postId,
    diaryId,
    title,
    createdAt,
    content,
    image,
    tag,
    weather,
    profileImg,
    nickname,
    commentsCount,
    comments,
    bookmark,
  } = data;

  const { mutate: postMutate } = useMutation({
    mutationFn: (comments) => commentsApi.post(comments),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const { mutate: postDeleteMutate } = useMutation({
    mutationFn: () => postsApi.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["Allposts"]);
      navigate(`/list/${diaryId}`);
    },
  });

  const { mutate: postBookmarkMutate } = useMutation({
    mutationFn: () => postsApi.bookmark(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const commentsSubmitHandler = (event) => {
    event.preventDefault();
    const comment = event.target.children.comment.value.trim();
    if (comment === "") return;
    postMutate({ comment, postId });
    event.target.children.comment.value = "";
  };

  const locailDate = (date) => {
    if (!date) return;
    const temp = date.slice(0, 10);
    return new Date(temp).toLocaleDateString("ko-KR");
  };

  const postBookmarkHandler = () => {
    postBookmarkMutate();
  };

  const postDeleteHandler = () => {
    postDeleteMutate();
  };

  const postUpdateHandler = () => {
    navigate(`/detail/${postId}/update`);
  };

  if (isLoading) return <div>isLoading...</div>;
  if (isError) return console.error(error);
  return (
    <StContainer>
      <StHeader>
        <NavigateBtn prev link={`/list/${diaryId}`} />
        <HeaderText>{diaryName}</HeaderText>
      </StHeader>

      <StDetailPageSection>
        <div className="detailPageTitleInfoWrapper">
          <div className="TitleInfoBox">
            <div>
              <p>{diaryName}</p>
              <span>{locailDate(createdAt)}</span>
            </div>
            <h3>{title}</h3>
          </div>
          <img src={weatherIcon[weather]} alt="날씨" />
        </div>
        <div className="detailPageProfileInfoWrapper">
          <div className="tagBox">
            {tag?.split(",").map((tag, n) => {
              return <span key={`tag${n}`}>{tag}</span>;
            })}
          </div>
          <div className="profileBox">
            <img src={profileImg} alt="프로필" />
            <span>{nickname}</span>
          </div>
        </div>
        <div className="detailPageImageWrapper">
          <img src={image} alt="그림" />
        </div>
        <div className="detailPageContentWrapper">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="content"
          />
        </div>

        <div className="detailPageButtonWrapper">
          <Buttons.Bookmark
            isBookmarked={bookmark}
            onClick={postBookmarkHandler}
          />
          <Buttons.Option
            onClick={() => {
              navigate(-1);
            }}
          >
            목록
          </Buttons.Option>
          <Buttons.Option onClick={postUpdateHandler}>수정</Buttons.Option>
          <AlertModal
            select
            bigTxt={"정말 일기를 삭제할까요?"}
            smallTxt={"삭제한 일기는 복구할 수 없어요"}
            onClick={postDeleteHandler}
          >
            <Buttons.Option negative>삭제</Buttons.Option>
          </AlertModal>
        </div>
        <CommentBox>
          <h3>댓글 {commentsCount}</h3>

          <Comment comments={comments} />
        </CommentBox>
      </StDetailPageSection>
      <DetailPageFooter>
        <form onSubmit={commentsSubmitHandler}>
          <input id="comment" placeholder="댓글 작성하기" />
          <Buttons.AddComment />
        </form>
      </DetailPageFooter>
    </StContainer>
  );
};

export default Detail;

const StDetailPageSection = styled(StSection)`
  font-family: ZigleTTF;

  .detailPageTitleInfoWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 5rem;
      height: 5rem;
    }
  }

  .TitleInfoBox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      p {
        font-size: 2rem;
        font-weight: 700;
      }
      span {
        font-size: 1rem;
        color: #a9a9a9;
      }
    }
    h3 {
      font-size: 3rem;
      font-weight: 700;
    }
  }
  .detailPageProfileInfoWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .tagBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;

      span {
        font-size: 1.5rem;
        background-color: #f5f5f5;
        padding: 0.6rem 1.3rem;
        border-radius: 1.5rem;
      }
    }

    .profileBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      img {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
      }
    }
  }

  .detailPageImageWrapper {
    width: 100%;
    height: 30.7rem;
    border: 3px solid #ebebeb;
    border-radius: 6px;
    margin-bottom: 1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .detailPageContentWrapper {
    .content {
      p {
        position: relative;
        margin-bottom: 2rem;
        padding: 0 1.5rem;
      }

      p::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1rem;
        width: 100%;
        height: 1.5rem;
        background-image: url(${borderLine});
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .detailPageButtonWrapper {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    button {
      font-family: ZigleTTF;
    }
  }
`;

const DetailPageFooter = styled(StFooter)`
  height: 7rem;
  border-top: 1px solid #e8e8e8;
  background: #ffffff;
  padding: 0 1.5rem;
  form {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.6rem;
    gap: 1rem;
    input {
      flex-grow: 1;
      height: 3.7rem;
      padding: 1rem;
      border: 1px solid #e8e8e8;
      border-radius: 33px;
      background-color: #f8f8f8;
    }
  }
`;

const CommentBox = styled.div`
  width: 100%;
  height: 30rem;
  overflow-y: scroll;
  margin-bottom: 5rem;
`;
