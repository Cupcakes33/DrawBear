import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LonginForm from "../components/login/LonginForm";
import CommonContainer from "../UI/CommonContainer";
import naver from "../assets/images/naver.webp";
import kakao from "../assets/images/kakao.webp";
import { flex } from "../UI/common";

const Login = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();
    localStorage.removeItem("token");
  }, [queryClient]);

  return (
    <CommonContainer>
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
        <img src={naver} alt="네이버 로그인" />
        <img src={kakao} alt="카카오 로그인" />
      </SocialLoginBox>
    </CommonContainer>
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
