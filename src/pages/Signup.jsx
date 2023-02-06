import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { flex, StHeader } from "../UI/common";
import defaultImg from "../assets/images/default_image.png";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apis/axios";
import { Input, WorningWord } from "../components/common/Input";
import useDispatchHook from "../hooks/useDispatchHook";
import Buttons from "../components/common/Button/Buttons";

const Signup = () => {
  const [screenChange, setScreenChange] = useState("");
  const { openAlertModal } = useDispatchHook();
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImg,
  });

  const navigate = useNavigate();

  const onScreenChangeHandler = () => {
    setScreenChange(!screenChange);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

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
    localStorage.removeItem("token");
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

  const { mutate } = useMutation((formData) => loginApi.create(formData), {
    onSuccess: () => {
      openAlertModal({ bigTxt: "회원가입 성공!", move: "/login" }); //모달창에 전달하는 데이터
    },
    onError: (error) => {
      const msg = error.response.data.message;
      const errorStatus = error.response.status;

      if (errorStatus === 409) openAlertModal({ bigTxt: msg });
    },
  });

  return (
    <>
        <StSignupHeader>
          <BackButtonDiv>
            {screenChange ? (
              <GrPrevious onClick={onScreenChangeHandler} />
            ) : (
              <GrPrevious onClick={() => navigate("/login")} />
            )}
          </BackButtonDiv>
        </StSignupHeader>
        <SlideContainerForm
          screenChange={screenChange}
          onSubmit={handleSubmit((data) => {
            data.image = image.image_file;
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("nickname", data.nickname);
            formData.append("password", data.password);
            formData.append("image", data.image);
            mutate(formData);
          })}
        >
          <PasswordSection>
            <section>
              <h2>회원가입</h2>
              <div>
                <label htmlFor="email">이메일</label>
                <input
                  className={errors.email ? "fail" : "pass"}
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
              </div>
              <WorningWord color={errors.email}>
                {errors.email?.message}
              </WorningWord>
              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  className={errors.password ? "fail" : "pass"}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="*영문,숫자 조합 8자리 이상"
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? false : true
                  }
                  {...register("password", {
                    required: "필수 응답 항목입니다.",
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                      message: "영문, 숫자 조합 8자리 이상",
                    },
                  })}
                />
                <WorningWord color={errors.password}>
                  {errors.password?.message}
                </WorningWord>
                <input
                  className={errors.passwordCheck ? "fail" : "pass"}
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
                />
              </div>
              <WorningWord color={errors.passwordCheck}>
                {errors.passwordCheck?.message}
              </WorningWord>

              <SignupButtonBox>
                {isDirty &&
                watch("email") !== "" &&
                watch("password") !== "" &&
                watch("passwordCheck") !== "" &&
                !errors.email &&
                !errors.password &&
                !errors.passwordCheck ? (
                  <button type="button" onClick={onScreenChangeHandler}>
                    다음
                  </button>
                ) : (
                  <button disabled>다음</button>
                )}
              </SignupButtonBox>
            </section>
          </PasswordSection>
          <ProfileSection>
            <section>
              <div>
                <h2>나를 표현할</h2>
                <h2>프로필을 꾸며보세요</h2>
              </div>
              <div className="profileImg-box">
                <input
                  {...register("image")}
                  id="profileImg"
                  type="file"
                  name="profileImg"
                  accept="image/*"
                  onChange={imgOnChnageHandler}
                  onClick={(e) => (e.target.value = null)}
                  ref={(refParam) => (inputRef = refParam)}
                ></input>
                <img
                  src={image.preview_URL}
                  alt="프사"
                  onClick={() => inputRef.click()}
                />

                <Buttons.ProfileSetting
                  className="profile-setting"
                  onClick={() => inputRef.click()}
                />
              </div>
              <div className="nickInput-box">
                <label>닉네임</label>
                <input
                  className={errors.nickname ? "fail" : "pass"}
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
                    },
                    maxLength: {
                      value: 7,
                    },
                  })}
                />
              </div>
              <WorningWord color={errors.nickname}>
                2~7자리 닉네임을 사용하세요.
              </WorningWord>
              <SignupButtonBox>
                <button type="submit" disabled={isSubmitting}>
                  회원가입
                </button>
              </SignupButtonBox>
            </section>
          </ProfileSection>
        </SlideContainerForm>
    </>
  );
};

export default Signup;

const StSignupHeader = styled(StHeader)`
  background: var(--login_bg);
`;

const SlideContainerForm = styled.form`
  width: 200%;
  display: flex;
  transition: transform 0.4s ease-in-out;
  ${({ screenChange }) => {
    switch (screenChange) {
      case true:
        return css`
          transform: translateX(-50%);
        `;
      case false:
        return css`
          transform: translateX(0%);
        `;
      default:
        return ``;
    }
  }}
  ${Input}
`;

const BackButtonDiv = styled.div`
  font-size: 2.4rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const PasswordSection = styled.section`
  display: flex;
  justify-content: center;
  width: 50%;
  section {
    width: 80%;
    height: 90vh;
    padding-top: 10%;
  }
  div {
    padding-top: 10%;
  }
  #passwordCheck {
    margin-top: 2.8rem;
  }
`;

const SignupButtonBox = styled.div`
  position: absolute;
  bottom: 5%;
  button {
    width: 28.5rem;
    height: 5.3rem;
    color: white;
    background-color: #3cc7a6;
    border: none;
    border-radius: 10px;
    font-size: 1.7rem;
    font-weight: 700;
    cursor: pointer;
    :disabled {
      background-color: #b3e9dc;
      cursor: default;
    }
  }
`;

const ProfileSection = styled.section`
  display: flex;
  justify-content: center;
  width: 50%;
  section {
    width: 80%;
    height: 90vh;
    padding-top: 10%;
  }
  .profileImg-box {
    ${flex("", "")}
    padding-top: 20%;
    cursor: pointer;
    #profileImg {
      display: none;
    }
  }
  .profile-setting {
    position: absolute;
    top: 23rem;
    right: calc(50% - 23rem);
  }
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
  .nickInput-box {
    padding-top: 20%;
  }
  #nickname {
    display: block;
  }
`;
