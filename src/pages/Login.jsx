import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data); // console.log 대신 디스패치 들어가면 됨

  return (
    <TestForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          className={errors?.email?.type === undefined ? "pass" : "fail"}
          type="email"
          id="email"
          name="email"
          {...register("email", { required: true, pattern: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
          aria-invalid={errors.email ? "true" : "false"}
        ></input>
        {errors?.email?.type && <span role="alert">⚠이메일 형식에 맞지 않습니다.</span>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          className={errors?.password?.type === undefined ? "pass" : "fail"}
          type="password"
          id="password"
          name="password"
          {...register("password", { required: true, pattern: /^[a-z0-9_-]{4,16}$/ })}
          aria-invalid={errors?.password ? "true" : "false"}
        ></input>
        {errors?.password && <span role="alert">⚠4~16자 이내로 적어주세요</span>}
      </div>
      <div>
        <button>로그인</button>
        <button type="button">회원가입</button>
      </div>
    </TestForm>
  );
};

const TestForm = styled.form`
  span {
    color: red;
  }
  .pass:focus {
    transition: box-shadow 0.4s;
    border: 1px solid green;
    box-shadow: 0 0 5px green;
    outline: none;
  }
  .fail:focus {
    transition: box-shadow 0.4s;
    border: 1px solid red;
    box-shadow: 0 0 5px red;
    outline: none;
  }
`;

export default Login;
