import { useForm } from "react-hook-form";
import styled from "styled-components";

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
