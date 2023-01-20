import styled from "styled-components";
import Comment from "../components/detail/Comment";
import Back from "../components/header/Back";
import HeaderText from "../components/header/HeaderText";
import { StHeader, StWrapper, StContainer, StSection } from "../UI/common";
import CommonContainer from "../UI/CommonContainer";
import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../apis/axios";
import { useParams } from "react-router-dom";
import NavigateBtn from "../components/common/NavigateBtn";
import { StWeatherIconMini } from "../components/write/WeatherPicker";

const Detail = () => {
  const diaryId = useParams().id;
  const diaryName = localStorage.getItem("diaryName");

  const {
    data = {},
    error,
    isError,
    isLoading,
  } = useQuery(["posts"], () => postsApi.get(diaryId));

  const {
    title,
    createdAt,
    content,
    image,
    tag,
    weather,
    profileImg,
    nickname,
  } = data;

  console.log(data);
  // const { title } = data;

  const locailDate = (date) => {
    if (!date) return;
    const temp = date.slice(0, 10);
    return new Date(temp).toLocaleDateString("ko-KR");
  };
  return (
    <StContainer>
      <StHeader>
        <NavigateBtn prev />
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
          <StWeatherIconMini weatherTypeMini={weather} />
        </div>
        <div className="detailPageProfileInfoWrapper">
          <div className="tagBox">
            {tag?.split(",").map((tag) => {
              return <span>{tag}</span>;
            })}
          </div>
          <div className="profileBox">
            <img src={profileImg} alt="프로필" />
            <span>{nickname}</span>
          </div>
        </div>
        <ContentsBox>
          <div className="img-box">
            <img src={image} alt="그림" />
          </div>
          {/* {posts?.content ? <pre>{posts?.content}</pre> : null} */}
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
      </StDetailPageSection>
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
        object-fit: cover;
      }
    }
  }
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
