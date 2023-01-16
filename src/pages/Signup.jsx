import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import defaultImg from "../assets/images/default_image.png";
import { StHeader } from "../UI/common";
const Signup = () => {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  //이미지 미리보기
  const [imagePreview, setImagePreview] = useState(defaultImg);
  const image = watch("image");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);
  const [isEnable, setIsEnable] = useState(true); //버튼 비활성화
  const [signUpClassName, setsignUpClassName] = useState("active-form-slide");
  const [profilIsClassName, setprofilIsClassName] = useState("form-slide");
  const [pageShow, setPageShow] = useState(false);
  const emailCheck = !isDirty ? undefined : errors.email ? "true" : false;
  const passwordCheck = !isDirty ? undefined : errors.password ? "true" : false;
  const passwordComfileCheck = !isDirty
    ? undefined
    : errors.passwordComfile
    ? "true"
    : false;
  const changeNextBtnClassName = () => {
    // if (
    //   emailCheck === false &&
    //   passwordCheck === false &&
    //   passwordComfileCheck === false
    // ) {
    //   setIsEnable(false);
    setsignUpClassName("left-form-slide");
    setprofilIsClassName("active-form-slide");
    // } else {
    //   setIsEnable(true);
    // }
  };
  const changeBeforeBtnClassName = () => {
    setsignUpClassName("active-form-slide");
    setprofilIsClassName("form-slide");
  };
  return (
    <>
      <div
        style={{
          width: "400px",
          height: "700px",
          border: "1px solid #acacac",
          margin: "0 auto",
          padding: "50px",
          overflow: "hidden",
        }}
      >
        {/* <StHeader /> */}
        <StSginupForm
          onSubmit={handleSubmit(async (data) => {
            await new Promise((r) => {
              setTimeout(r, 1000);
            });
            alert(JSON.stringify(data));
          })}
          style={{
            display: "flex",
            position: "relative",
            transition: "0.2s",
            left: 0,
          }}
        >
          <div
            className={signUpClassName}
            style={
              {
                // width: "36rem",
                // height: "100rem",
                // backgroundColor: "green",
                // position: "relative",
              }
            }
          >
            <StSignupTitle>회원가입</StSignupTitle>
            <div>
              <span
                style={
                  {
                    // position: "absolute",
                    // width: "4.2rem",
                    // height: "2.2rem",
                    // left: "4.2rem",
                    // top: "18.5rem",
                    // fontStyle: "normal",
                    // fontWeight: "700",
                    // fontSize: "1.5rem",
                    // lineHeight: "2.2rem",
                    // color: "#000000",
                  }
                }
              >
                이메일
              </span>
              <StSignupInput
                id="email"
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                aria-invalid={
                  !isDirty ? undefined : errors.email ? "true" : false
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
            <div>
              <span
                style={{
                  position: "absolute",
                  width: "5.6rem",
                  height: "2.2rem",
                  left: "4.2rem",
                  top: "29.2rem",
                  fontFamily: "Noto Sans KR",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  lineHeight: "2.2rem",
                  color: "#000000",
                }}
              >
                비밀번호
              </span>
              <StSignupInput
                id="password"
                type="password"
                name="password"
                placeholder="*영문,숫자 조합 8자리 이상"
                aria-invalid={
                  !isDirty ? undefined : errors.password ? "true" : "false"
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
              <StSignupInput
                id="passwordComfile"
                type="password"
                name="passwordComfile"
                placeholder="비밀번호재입력"
                aria-invalid={
                  !isDirty
                    ? undefined
                    : errors.passwordComfile
                    ? "true"
                    : "false"
                }
                {...register("passwordComfile", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "비밀번호가 다릅니다.";
                    }
                  },
                })}
                style={{ top: "33rem" }}
              />
              {errors.passwordComfile && (
                <small role="alert">{errors.passwordComfile.message}</small>
              )}
            </div>
            <StSignUpBtn
              onClick={() => {
                changeNextBtnClassName();
              }}
              disabled={
                emailCheck === false &&
                passwordCheck === false &&
                passwordComfileCheck === false
                  ? false
                  : true
              }
            >
              다음
            </StSignUpBtn>
          </div>
          <div className={profilIsClassName}>
            <StProfilitle>당신의 프로필을 꾸며주세요 :)</StProfilitle>
            <div>
              <img
                style={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "100%",
                  position: "absolute",
                  left: "13rem",
                  top: "20.7rem",
                }}
                src={imagePreview}
              />
              <input
                {...register("image")}
                id="profileImg"
                type="file"
                style={{
                  position: "absolute",
                  width: "3.7rem",
                  height: "3.7rem",
                  left: "19.3rem",
                  top: "27rem",
                  borderRadius: "100%",
                  background: "#888888",
                }}
              />
            </div>
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
              <StSignUpBtn
                onClick={() => {
                  changeBeforeBtnClassName();
                }}
              >
                이전
              </StSignUpBtn>
              <StSignUpBtn type="submit" disabled={isSubmitting}>
                회원가입
              </StSignUpBtn>
            </div>
          </div>
        </StSginupForm>
      </div>
    </>
  );
};
export default Signup;

const StSginupForm = styled.form`
  /* width: 72rem;
  height: 100rem;
  display: flex;
  justify-content: center;
  align-items: center; */

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
const StSignupTitle = styled.span`
  /* position: absolute;
  width: 8.1rem;
  height: 3.2rem;
  top: 10.6rem;
  left: 4.2rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3.2rem;
  color: #000000; */
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
const StSignupInput = styled.input`
  /* position: absolute;
  width: 27rem;
  height: 4.5rem;
  left: 4.2rem;
  top: 22.3rem;
  border: none;
  background: #d9d9d9; */
`;
const StSpan = styled.span``;
const StSignUpBtn = styled.button`
  /* position: absolute;
  width: 36rem;
  height: 5.5rem;
  left: none;
  bottom: 0;
  border: none;
  background: #d9d9d9; */
`;
