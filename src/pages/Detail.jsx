import React from "react";
import styled from "styled-components";
import Comment from "../components/detail/Comment";
import { StContainer, StHeader, StWrapper } from "../UI/common";
import CommonContainer from "../UI/CommonContainer";

const posts = {
  content: `안녕`,
  tags: [
    {
      tag: "감성",
    },
    {
      tag: "맑음",
    },
    {
      tag: "우울함",
    },
    {
      tag: "즐거움",
    },
    {
      tag: "소풍",
    },
    {
      tag: "즐거움",
    },
    {
      tag: "즐거움",
    },
  ],
};

const Detail = () => {
  return (
    <CommonContainer>
      <StHeader />
      <StWrapper>
        <InfoBox>
          <h5>다이어리 제목</h5>
          <h3>2022년 12월 31일</h3>
          <div className="tag-box">
            {posts?.tags.map((v, i) => (
              <Tag key={i}>#{v.tag}</Tag>
            ))}
          </div>
        </InfoBox>
        <ContentsBox>
          <div className="img-box">
            <img src="" alt="그림" />
          </div>
          {posts?.content ? <pre>{posts?.content}</pre> : null}
        </ContentsBox>
        <Buttonbox>
          <button>수정</button>
          <button>삭제</button>
        </Buttonbox>
        <CommentBox>
          <h3>코멘트 1</h3>
          <Comment />
          <Comment />
          <Comment />
          <div className="input-box">
            <input placeholder="댓글 작성하기" />
            <button>등록</button>
          </div>
        </CommentBox>
      </StWrapper>
    </CommonContainer>
  );
};

export default Detail;

const InfoBox = styled.div`
  .tag-box {
    margin-top: 1rem;
  }
`;

const Tag = styled.div`
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0.4rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;

const ContentsBox = styled.div`
  .img-box {
    display: flex;
    width: 100%;
    height: 30.7rem;
    background-color: #d9d9d9;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.7rem;
  }
  pre {
    width: 100%;
    white-space: pre-wrap;
    background-color: #d9d9d9;
    padding: 1rem;
  }
`;

const Buttonbox = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.3rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const CommentBox = styled.div`
  .input-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 85%;
      height: 3.4rem;
      ::placeholder {
        padding-left: 1rem;
      }
    }
  }
`;
