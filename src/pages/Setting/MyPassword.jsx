import { StContainer, StSection, StHeader, DisplayDiv } from "../../UI/common";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import NavigateBtn from "../../components/common/NavigateBtn";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { passwordApi } from "../../apis/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/modules/UISlice";
import Alert from "../../components/common/modal/Alert";


const MyPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const { isModal } = useSelector((state) => state.UISlice);

  const { mutate } = useMutation((formData) => passwordApi.update(formData), {
    onSuccess: (data) => {
      dispatch(
        showModal({ isModal: true, content: data.message, move: "/setting" })
      );
    },
    onError: (error) => {
      const errorStatus = error.response.status;
      console.log(errorStatus);
      if (errorStatus === 401) {
        console.log();
        dispatch(
          showModal({
            isModal: true,
            content: "현재 비밀번호가 틀렸습니다.",
          })
        );
      }
    },
  });

  const onSubmit = (inputData) => {
    mutate(inputData);
  };

  return (
    <>
      {isModal && <Alert />}
      <StContainer>
        <StHeader flex justify="space-between">
          <DisplayDiv flex>
            <NavigateBtn prev sizeType="header" />
            <h3>비밀번호 변경</h3>
          </DisplayDiv>
          <div>
            <h3 onClick={handleSubmit(onSubmit)}>완료</h3>
          </div>
        </StHeader>
        <form>
          <MypageSection flex derection="column" justify="flex-start">
            <div className="PW-box current">
              <label>기존 비밀번호</label>
              <input
                id="currentPW"
                type="password"
                name="currentPW"
                placeholder="*영문,숫자 조합 8자리 이상"
                aria-invalid={
                  !isDirty ? undefined : errors.currentPW ? false : true
                }
                {...register("currentPW", {
                  required: "비밀번호는 필수 입력 입니다.",
                  minLength: {
                    value: 4,
                    message: "4자리 이상 비밀번호를 입력해주세요",
                  },
                })}
              />
              {errors.currentPW && (
                <small role="alert">{errors.currentPW.message}</small>
              )}
            </div>
            <div className="PW-box changing">
              <label>새로 변경할 비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="*영문,숫자 조합 8자리 이상"
                aria-invalid={
                  !isDirty ? undefined : errors.password ? false : true
                }
                {...register("password", {
                  required: "비밀번호는 필수 입력 입니다.",
                  minLength: {
                    value: 4,
                    message: "4자리 이상 비밀번호를 입력해주세요",
                  },
                })}
                style={{ top: "33rem" }}
              />
              {errors.password && (
                <small role="alert">{errors.password.message}</small>
              )}
              <input
                id="passwordCheck"
                type="password"
                name="passwordCheck"
                placeholder="비밀번호재입력"
                aria-invalid={
                  !isDirty ? undefined : errors.passwordCheck ? false : true
                }
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
              {errors.passwordCheck && (
                <small role="alert">{errors.passwordCheck.message}</small>
              )}
            </div>
          </MypageSection>
        </form>
        <Footer />
      </StContainer>
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
  span {
    font-size: 1rem;
    color: #ff5656;
  }
  input {
    height: 4.5rem;
    padding: 0 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    border: none;
    :last-child {
      margin-top: 2rem;
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
