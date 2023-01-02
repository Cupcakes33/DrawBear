import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSubmit = (data) => console.log(data); // console.log 대신 디스패치 들어가면 됨

  return (
    <TestForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"}></input>
        {errors?.email && <span role="alert">⚠이메일을 적어주세요.</span>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password", { required: true, minLength: 3, maxLength: 10 })}
          aria-invalid={errors?.password ? "true" : "false"}
        ></input>
        {errors?.password && <span role="alert">⚠3~10자 이내로 적어주세요</span>}
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
  input:focus {
    /* border-color: red;
    outline: none; */
  }
`;

export default Login;
