import { StSection } from "../../UI/common";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input, WorningWord } from "../../components/common/Input";
import { mypageApi } from "../../apis/axios";
import styled from "styled-components";
import useDispatchHook from "../../hooks/useDispatchHook";
import { Header } from "../../components/common/header/Header";

const MyPassword = () => {
  const { openAlertModal } = useDispatchHook();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const { mutate } = useMutation((formData) => mypageApi.PWupdate(formData), {
    onSuccess: (data) => {
      openAlertModal({ bigTxt: data.message, move: "/setting" });
    },
    onError: (error) => {
      const errorStatus = error.response.status;
      if (errorStatus === 401) openAlertModal({ bigTxt: "현재 비밀번호가 틀렸습니다." });
    },
  });

  const onSubmit = (inputData) => {
    mutate(inputData);
  };

  return (
    <>
      <Header>
        <Header.SpaceBetween>
          <Header.Back link="/setting/infoEdit/">비밀번호 변경</Header.Back>
          <Header.OnClickBtn onClick={handleSubmit(onSubmit)}>완료</Header.OnClickBtn>
        </Header.SpaceBetween>
      </Header>
      <form>
        <MypageSection flex derection="column" justify="flex-start">
          <div className="PW-box current">
            <label>기존 비밀번호</label>
            <input
              className={errors?.currentPW ? "fail" : "pass"}
              id="currentPW"
              type="password"
              name="currentPW"
              placeholder="*영문,숫자 조합 8자리 이상"
              aria-invalid={!isDirty ? undefined : errors.currentPW ? false : true}
              {...register("currentPW", {
                required: "비밀번호는 필수 입력 입니다.",
                minLength: {
                  value: 4,
                  message: "4자리 이상 비밀번호를 입력해주세요",
                },
              })}
            />
            <WorningWord color={errors?.currentPW}>{errors.currentPW?.message}</WorningWord>
          </div>
          <div className="PW-box changing">
            <label>새로 변경할 비밀번호</label>
            <input
              className={errors?.password ? "fail" : "pass"}
              id="password"
              type="password"
              name="password"
              placeholder="*영문,숫자 조합 8자리 이상"
              aria-invalid={!isDirty ? undefined : errors.password ? false : true}
              {...register("password", {
                required: "비밀번호는 필수 입력 입니다.",
                minLength: {
                  value: 4,
                  message: "4자리 이상 비밀번호를 입력해주세요",
                },
              })}
              style={{ top: "33rem" }}
            />
            <WorningWord color={errors?.password}>{errors.password?.message}</WorningWord>
            <input
              className={errors?.passwordCheck ? "fail" : "pass"}
              id="passwordCheck"
              type="password"
              name="passwordCheck"
              placeholder="비밀번호재입력"
              aria-invalid={!isDirty ? undefined : errors.passwordCheck ? false : true}
              {...register("passwordCheck", {
                required: true,
                validate: (val) => {
                  if (watch("password") != val) {
                    return "비밀번호가 다릅니다.";
                  }
                },
              })}
              style={{ top: "33rem" }}
            />
            <WorningWord color={errors?.passwordCheck}>{errors.passwordCheck?.message}</WorningWord>
          </div>
        </MypageSection>
      </form>
    </>
  );
};

export default MyPassword;

const MypageSection = styled(StSection)`
  padding-top: 20%;
  overflow-x: hidden;
  .PW-box {
    display: grid;
    width: 100%;
    gap: 1rem;
  }
  .current {
    padding: 10%;
  }
  .changing {
    padding: 10%;
    margin-top: -4rem;
  }
  label {
    font-size: 2.6rem;
    font-weight: 700;
  }
  ${Input("#F5F5F5")}
`;
