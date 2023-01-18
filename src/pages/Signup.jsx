import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import defaultImg from "../assets/images/default_image.png";
import { StHeader } from "../UI/common";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const [signUpClassName, setsignUpClassName] = useState("active-form-slide");
  const [profilIsClassName, setprofilIsClassName] = useState("form-slide");

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImg,
  });
  let inputRef;
  const imgOnChnageHandler = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);
  const changeNextBtnClassName = () => {
    setsignUpClassName("left-form-slide");
    setprofilIsClassName("active-form-slide");
  };
  const changeBeforeBtnClassName = () => {
    setsignUpClassName("active-form-slide");
    setprofilIsClassName("form-slide");
  };
  return (
    <>
      <SignupContainer>
        <SginupForm
          onSubmit={handleSubmit((data) => {
            console.log(image.image_file);
            data.image = image.image_file;
            console.log(data);
          })}
        >
          <div className={signUpClassName}>
            <SignupTitle>회원가입</SignupTitle>
            <SginupText>
              <span className="email_txt">이메일</span>
              <div className="email_container">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  aria-invalid={
                    !isDirty ? undefined : errors.email ? false : true
                  }
                  {...register("email", {
                    required: "이메일은 필수 입력 값입니다.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "이메일 형식에 맞지 않습니다.",
                    },
                  })}
                />
                {errors.email && (
                  <small role="alert">{errors.email.message}</small>
                )}
              </div>
            </SginupText>
            <SginupText>
              <span className="password_txt">비밀번호</span>
              <div className="password_container">
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
              </div>
              <div className="passwordCheck_container">
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
            </SginupText>
            {isDirty &&
              watch("email") !== "" &&
              watch("password") !== "" &&
              watch("passwordCheck") !== "" &&
              !errors.email &&
              !errors.password &&
              !errors.passwordCheck && (
                <SignUpNextBtn
                  onClick={() => {
                    changeNextBtnClassName();
                  }}
                  type="button"
                >
                  다음
                </SignUpNextBtn>
              )}
          </div>
          <div className={profilIsClassName}>
            <SignupTitle>당신의 프로필을 꾸며주세요 :)</SignupTitle>
            <div>
              <input
                {...register("image")}
                id="profileImg"
                type="file"
                accept="image/*"
                onChange={imgOnChnageHandler}
                onClick={(e) => (e.target.value = null)}
                ref={(refParam) => (inputRef = refParam)}
                style={{
                  position: "absolute",
                  width: "3.7rem",
                  height: "3.7rem",
                  left: "19.3rem",
                  top: "27rem",
                  borderRadius: "100%",
                  background: "#888888",
                  display: "none",
                }}
              />
              <div className="img-wrapper">
                <img
                  src={image.preview_URL}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "100%",
                    position: "absolute",
                    left: "13rem",
                    top: "20.7rem",
                  }}
                  onClick={() => inputRef.click()}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "3.7rem",
                    height: "3.7rem",
                    left: "19.3rem",
                    top: "27rem",
                    borderRadius: "100%",
                    background: "#888888",
                  }}
                  onClick={() => inputRef.click()}
                ></div>
              </div>
            </div>
            <div></div>
            <div>
              <label
                htmlFor="nickname"
                style={{
                  position: "absolute",
                  width: "4.2rem",
                  height: "2.2rem",
                  left: "4.2rem",
                  top: "32.5rem",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  lineHeight: "2.2rem",
                  color: "#000000",
                }}
              >
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                aria-invalid={
                  !isDirty ? undefined : errors.nickname ? "true" : "false"
                }
                {...register("nickname", {
                  required: "닉네임은 필수 입력 입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 닉네임을 사용하세요.",
                  },
                })}
                style={{
                  position: "absolute",
                  width: "27rem",
                  height: "4.5rem",
                  left: "4.2rem",
                  top: "36.3rem",
                  background: "#D9D9D9",
                  border: "0",
                }}
              />
              {errors.nickname && (
                <small role="alert">{errors.nickname.message}</small>
              )}
            </div>
            <div>
              <SignUpNextBtn
                onClick={() => {
                  changeBeforeBtnClassName();
                }}
              >
                이전
              </SignUpNextBtn>
              <SignUpNextBtn type="submit" disabled={isSubmitting}>
                회원가입
              </SignUpNextBtn>
            </div>
          </div>
        </SginupForm>
      </SignupContainer>
    </>
  );
};
export default Signup;
const SignupContainer = styled.div`
  width: 36rem;
  height: 100rem;
  background-color: #eef3e3;
  margin: 0 auto;
  overflow: hidden;
`;
const SginupForm = styled.form`
  display: flex;
  position: relative;
  transition: 0.2s;
  left: 0;

  .active-form-slide {
    display: flex;
    flex-direction: column;
    height: 500px;
    min-width: 100%;
    transition: 0.5s;
    position: absolute;
    transform: translateX(0%);
  }
  .form-slide {
    display: flex;
    flex-direction: column;
    height: 500px;
    min-width: 100%;
    transition: 0.5s;
    position: absolute;
    transform: translateX(150%);
  }
  .left-form-slide {
    display: flex;
    flex-direction: column;
    height: 500px;
    min-width: 100%;
    transition: 0.5s;
    position: absolute;
    transform: translateX(-150%);
  }
`;
const SignupTitle = styled.span`
  position: absolute;
  width: 9.3rem;
  height: 3.9rem;
  left: 2.2rem;
  top: 8.2rem;

  font-family: "UhBee ZIGLE";
  font-style: normal;
  font-weight: 700;
  font-size: 3.4rem;
  line-height: 3.9rem;
  color: #5f4c36;
`;
const SginupText = styled.div`
  position: absolute;

  height: 2.7rem;
  left: 2.2rem;
  font-family: "UhBee ZIGLE";
  font-style: normal;
  font-weight: 400;
  font-size: 2.2rem;
  line-height: 2.7rem;
  color: #5f4c36;
  .email_txt {
    position: absolute;
    width: 4rem;
    line-height: 2.7rem;
    top: 16.1rem;
  }
  .password_txt {
    position: absolute;
    width: 5.1rem;
    top: 27.6rem;
  }
  & input {
    width: 31.6rem;
    height: 5.2rem;
    background: #ffffff;
    border-radius: 1rem;
    border: 0;
  }
  & .email_container {
    position: absolute;
    top: 19.2rem;
    small {
      color: red;
    }
  }
  & .password_container {
    position: absolute;
    top: 30.7rem;
    small {
      color: red;
    }
  }
  & .passwordCheck_container {
    position: absolute;
    top: 38.7rem;
    border: 0;
    small {
      color: red;
    }
  }
`;
const SignUpNextBtn = styled.button`
  position: absolute;
  width: 31.6rem;
  height: 4.9rem;
  left: 2.2rem;
  top: 56rem;
  /* button */
  border: 0;
  background: #3cc7a6;
  border-radius: 1rem;
`;
const StProfilitle = styled.span`
  /* position: absolute;
  width: 14.7rem;
  height: 6.4rem;
  top: 10.6rem;
  left: 4.2rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3.2rem;

  color: #000000; */
`;
// const Signup = styled.input`
//   position: absolute;
//   width: 316px;
//   height: 52px;
//   left: 22px;
//   top: 192px;

//   background: #ffffff;
//   border-radius: 10px;
// `;
const StSpan = styled.span``;
