import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LonginForm from "../components/login/LonginForm";
import naver from "../assets/images/naver.webp";
import kakao from "../assets/images/kakao.webp";
import { flex, StContainer } from "../UI/common";
import AlertModal from "../components/common/modal/AlertModal";

const Login = () => {
  const queryClient = useQueryClient();
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const naverLoginHandler = () => {
    window.location.href = "http://localhost:4000/auth/naver";
  };

  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    queryClient.clear();
    localStorage.removeItem("token");
  }, [queryClient]);

  return (
    <StContainer bgColor="#eef3e3;">
      <LocalLoginBox>
        <h2>로그인</h2>
        <LonginForm />
        <div className="signup-box">
          아직 계정이 없으세요? <Link to="/signup">회원가입 {`>`} </Link>
        </div>
      </LocalLoginBox>
      <BoundaryLine>
        <hr />
        <span>간편로그인</span>
        <hr />
      </BoundaryLine>
      <SocialLoginBox>
        <AlertModal
          bigTxt={"준비중입니다."}
          // move={"/login"}
        >
          <img
            src={naver}
            alt="네이버 로그인"
            // onClick={naverLoginHandler}
          />
        </AlertModal>
        <AlertModal
          bigTxt={"준비중입니다."}
          // move={"/login"}
        >
          <img
            src={kakao}
            alt="카카오 로그인"
            // onClick={kakaoLoginHandler}
          />
        </AlertModal>
      </SocialLoginBox>
    </StContainer>
  );
};

export default Login;

const LocalLoginBox = styled.div`
  width: 27rem;
  margin: auto;
  padding-top: 15%;
  .signup-box {
    padding-top: 10%;
  }
  label {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  a {
    font-weight: 700;
  }
`;

const BoundaryLine = styled.div`
  ${flex("", "between", "")}
  padding-top: 10%;
  span {
    margin: auto -2rem;
  }
  hr {
    width: 8rem;
    height: 0.1rem;
    border: 0;
    background-color: gray;
    margin: auto;
  }
`;

const SocialLoginBox = styled.div`
  ${flex}
  width: 100%;
  gap: 2rem;
  padding-top: 15%;
  img {
    cursor: pointer;
  }
`;
