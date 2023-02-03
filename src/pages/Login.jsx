import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LonginForm from "../components/login/LonginForm";
import naver from "../assets/images/naver.webp";
import kakao from "../assets/images/kakao.webp";
import { flex, StContainer } from "../UI/common";
import AlertModal from "../components/common/modal/AlertModal";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const NAVER_ID = process.env.REACT_APP_NAVER_ID;
  const NAVER_URL = process.env.REACT_APP_NAVER_URL;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&redirect_uri=${NAVER_URL}&state=asdf`;

  const naverLoginHandler = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    queryClient.clear();
    if (localStorage.getItem("token")) navigate("/");
  }, []);

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
        <AlertModal bigTxt={"승인 대기중이에요!"} smallTxt={"다음에 다시 시도해주세요"}>
          {/* <img src={naver} alt="네이버 로그인" onClick={naverLoginHandler} /> */}
          <img src={naver} alt="네이버 로그인" />
        </AlertModal>
        {/* <AlertModal bigTxt={"점검 중이예요!"}> */}
        <img src={kakao} alt="카카오 로그인" onClick={kakaoLoginHandler} />
        {/* </AlertModal> */}
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
