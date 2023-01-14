import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import defaultImg from "../assets/images/default_image.png";
import { StHeader } from "../UI/common";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImg,
  });

  let inputRef;

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

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

  return (
    <>
      <StHeader />
      <StSginupForm
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => {
            setTimeout(r, 1000);
          });
          alert(JSON.stringify(data));
        })}
      >
        <div
          style={{
            width: "36rem",
            height: "100rem",
            backgroundColor: "green",
            position: "relative",
          }}
        >
          <StSignupTitle>회원가입</StSignupTitle>
          <div>
            <span
              style={{
                position: "absolute",
                width: "4.2rem",
                height: "2.2rem",
                left: "4.2rem",
                top: "18.5rem",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "1.5rem",
                lineHeight: "2.2rem",
                color: "#000000",
              }}
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
            {errors.email && <small role="alert">{errors.email.message}</small>}
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
          </div>
          <div>
            <StSignupInput
              id="passwordComfile"
              type="password"
              name="passwordComfile"
              placeholder="비밀번호재입력"
              aria-invalid={
                !isDirty ? undefined : errors.passwordComfile ? "true" : "false"
              }
              {...register("passwordComfile", {
                required: "비밀번호는 필수 입력 입니다.",
                minLength: {
                  value: 4,
                  message: "4자리 이상 비밀번호를 입력해주세요",
                },
              })}
              style={{ top: "38.5rem" }}
            />
            {errors.passwordComfile && (
              <small role="alert">{errors.passwordComfile.message}</small>
            )}
          </div>

          <div>
            <StButton>다음</StButton>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <StProfilitle>당신의 프로필을 꾸며주세요 :)</StProfilitle>
          <div className="uploader-wrapper">
            <input
              id="profileImg"
              type="file"
              accept="images/*"
              onChange={imgOnChnageHandler}
              onClick={(e) => (e.target.value = null)}
              ref={(refParam) => (inputRef = refParam)}
              name="profileImg"
              placeholder="이미지를 선택해주세요"
              style={{ display: "none" }}
            />
            <div className="img-wrapper">
              <img
                src={image.preview_URL}
                alt="profileImg"
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
            <StButton type="submit" disabled={isSubmitting}>
              회원가입
            </StButton>
          </div>
        </div>
      </StSginupForm>
    </>
  );
};
export default Signup;

const StSginupForm = styled.form`
  width: 72rem;
  height: 100rem;
  background-color: gray;
  display: flex;
`;
const StSignupTitle = styled.span`
  position: absolute;
  width: 8.1rem;
  height: 3.2rem;
  top: 10.6rem;
  left: 4.2rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3.2rem;
  color: #000000;
`;
const StProfilitle = styled.span`
  position: absolute;
  width: 14.7rem;
  height: 6.4rem;
  top: 10.6rem;
  left: 4.2rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3.2rem;

  color: #000000;
`;
const StSignupInput = styled.input`
  position: absolute;
  width: 27rem;
  height: 4.5rem;
  left: 4.2rem;
  top: 22.3rem;
  border: none;
  background: #d9d9d9;
`;
const StButton = styled.button`
  position: absolute;
  width: 36rem;
  height: 5.5rem;
  left: none;
  bottom: 0;

  background: #d9d9d9;
`;
