import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LonginForm from "../components/login/LonginForm";
import { flex } from "../UI/common";
import SocialLogin from "../components/login/SocialLogin";
import { useSelector } from "react-redux";
import LoginSuccessModal from "../components/login/LoginSuccessModal";
import Layout from "../components/common/Layout";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { loginModal } = useSelector((state) => state.UISlice);

  useEffect(() => {
    queryClient.clear();
    if (localStorage.getItem("token")) navigate("/");
    else if (!!localStorage.getItem("token")) return;
  }, []);

  return (
    <>
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
      <SocialLogin />
      {loginModal && <LoginSuccessModal showModal />}
    </>
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
  ${flex("space-between", "")}
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
