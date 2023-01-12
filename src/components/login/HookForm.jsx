import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginApi } from "../../apis/axios";
import { __login } from "../../redux/modules/diarySlice";

const HookForm = () => {
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.diarySlice);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, mutate, error, isError } = useMutation(["user"], (v) => loginApi.login(v));

  const onSubmit = (loginData) => {
    return mutate(loginData);
    // dispatch(__login(loginData));
    // axios
    //   .post(`${process.env.REACT_APP_MY_API}/api/auth/login`, { email: loginData.email, password: loginData.password })
    //   .then((response) => {
    //     localStorage.setItem("token", response.data.token);
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    //     navigate("/");
    //   });
  };

  useEffect(() => {
    if (data?.result) {
      alert("로그인 성공!");
      return navigate("/");
    } else if (isError) alert("로그인 실패!");
  }, [data, isError, navigate]);

  return (
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
  );
};

export default HookForm;

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
