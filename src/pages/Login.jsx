import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HookForm from "../components/login/HookForm";
import CommonContainer from "../UI/CommonContainer";

const Login = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();
  }, []);

  return (
    <CommonContainer>
      <StContainer>
        <h2>로그인</h2>
        <HookForm />
        <div>
          아직 계정이 없으세요? <Link to="/signup">회원가입 {`>`} </Link>
        </div>
      </StContainer>
      <StLine>
        <hr />
        <span>간편로그인</span>
        <hr />
      </StLine>
      {/* <소셜></소셜> */}
    </CommonContainer>
  );
};

export default Login;

const StContainer = styled.div`
  width: 27rem;
  margin: 25% auto 20% auto;
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
