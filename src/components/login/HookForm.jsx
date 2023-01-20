import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { loginApi } from "../../apis/axios";
import Alert from "../common/modal/Alert";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/modules/UISlice";

const HookForm = () => {
  const dispatch = useDispatch();
  const { isModal } = useSelector((state) => state.UISlice);

  const { mutate } = useMutation((inputData) => loginApi.login(inputData), {
    onError: (error) => {
      const status = error?.response.request.status;
      if (status === undefined || null) return;
      else if (status === 412) dispatch(showModal({ isModal: true, content: "이메일 또는 패스워드를 확인해주세요." }));
      else if (status === 400)
        dispatch(showModal({ isModal: true, content: "해당 아이디는 소셜로그인으로 시도해주세요." }));
      else dispatch(showModal({ isModal: true, content: "로그인에 실패하였습니다." }));
    },
    onSuccess: () => {
      dispatch(showModal({ isModal: true, content: "로그인 성공!", move: "/" }));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData) => {
    return mutate(inputData);
  };

  return (
    <>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            className={errors.email?.type === undefined ? "pass" : "fail"}
            type="text"
            id="email"
            name="email"
            placeholder="example@email.com"
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
            placeholder="영문, 숫자 조합 8자리 이상"
            {...register("password", { required: true, pattern: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/ })}
            aria-invalid={errors?.password ? "true" : "false"}
          />
        </div>
        <div>
          <StBtn disabled={errors.email?.type === undefined && errors.password?.type === undefined ? false : true}>
            로그인
          </StBtn>
        </div>
      </StForm>
      {isModal && <Alert />}
    </>
  );
};

export default HookForm;

const StForm = styled.form`
  div {
    padding-top: 20%;
  }
  input {
    border: none;
    border-radius: 10px;
    padding: 1rem;
    ::placeholder {
      color: #dedede;
    }
  }
  .pass:focus {
    border: 1px solid #3cc7a5;
    box-shadow: 0 0 5px #3cc7a5;
    outline: none;
    transition: box-shadow 0.4s;
  }
  .fail:focus {
    border: 1px solid #ff5656;
    box-shadow: 0 0 5px #ff5656;
    outline: none;
    transition: box-shadow 0.4s;
  }
`;

const StBtn = styled.button.attrs((props) => ({
  disabled: props.disabled,
}))`
  width: 27rem;
  height: 4.5rem;
  color: white;
  background-color: #3cc7a6;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  :disabled {
    background-color: #b3e9dc;
    cursor: default;
  }
`;
