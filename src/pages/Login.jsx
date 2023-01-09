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
            {errors.email?.type && <span role="alert">⚠ 이메일 형식에 맞지 않습니다.</span>}
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
            {errors?.password && <span role="alert">⚠ 4~16자 이내로 적어주세요</span>}
          </div>
          <div>
            <StBtn>로그인</StBtn>
          </div>
        </StForm>
        <div>
          아직 계정이 없으세요? <Link to="/singup">회원가입 {`>`} </Link>
        </div>
      </StContainer>
    </CommonContainer>
  );
};

export default Login;

const StContainer = styled.div`
  width: 27rem;
  margin: auto;
  background-color: pink;

  label {
    display: block;
    font-size: 1.8rem;
  }
  input {
    width: 26.2rem;
    height: 4.5rem;
  }
`;

const StForm = styled.form`
  span {
    color: red;
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
`;
