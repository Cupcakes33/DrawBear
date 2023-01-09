import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommonContainer from "../UI/CommonContainer";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data); // console.log 대신 디스패치 들어가면 됨

  return (
    <CommonContainer>
      <StContainer>
        <h2>로그인</h2>
        <StForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              className={errors.email?.type === undefined ? "pass" : "fail"}
              type="email"
              id="email"
              name="email"
              {...register("email", { required: true, pattern: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              className={errors.password?.type === undefined ? "pass" : "fail"}
              type="password"
              id="password"
              name="password"
              {...register("password", { required: true, pattern: /^[a-z0-9_-]{4,16}$/ })}
              aria-invalid={errors?.password ? "true" : "false"}
            />
          </div>
          <StBtn>로그인</StBtn>
        </StForm>
        <div>
          아직 계정이 없으세요? <Link to="/singup">회원가입 {`>`} </Link>
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
  margin: 20% auto 20% auto;
  label {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  input {
    width: 26.2rem;
    height: 4.5rem;
  }
`;

const StForm = styled.form`
  div {
    margin-top: 20%;
  }
  .pass:focus {
    border: 1px solid green;
    box-shadow: 0 0 5px green;
    outline: none;
    transition: box-shadow 0.4s;
  }
  .fail:focus {
    border: 1px solid red;
    box-shadow: 0 0 5px red;
    outline: none;
    transition: box-shadow 0.4s;
  }
`;

const StBtn = styled.button`
  width: 27rem;
  height: 4.5rem;
  margin: 5% 0px;
`;

const StLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin: auto -2rem;
  }
  hr {
    width: 9rem;
    height: 0.1rem;
    border: 0;
    background-color: gray;
  }
`;
