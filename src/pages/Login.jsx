import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HookForm from "../components/login/HookForm";
import CommonContainer from "../UI/CommonContainer";
import naver from "../assets/images/naver.webp";
import kakao from "../assets/images/kakao.webp";

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
  }, []);

  return (
    <CommonContainer>
      <StContainer>
        <h2>로그인</h2>
        <HookForm />
        <div className="signup-box">
          아직 계정이 없으세요? <Link to="/signup">회원가입 {`>`} </Link>
        </div>
      </StContainer>
      <StLine>
        <hr />
        <span>간편로그인</span>
        <hr />
      </StLine>
      <SocialLogin>
        <img src={naver} alt="네이버 로그인" onClick={naverLoginHandler} />
        <img src={kakao} alt="카카오 로그인" onClick={kakaoLoginHandler} />
      </SocialLogin>
    </CommonContainer>
  );
};

export default Login;

const StContainer = styled.div`
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
  input {
    width: 27rem;
    height: 4.5rem;
  }
  a {
    font-weight: 700;
  }
`;

const StLine = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SocialLogin = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 15%;
  img {
    cursor: pointer;
  }
`;
