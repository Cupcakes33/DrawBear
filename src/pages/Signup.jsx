import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { StContainer, StHeader } from "../UI/common";
import defaultImg from "../assets/images/default_image.png";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/common/Button";
import { AiOutlineSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../redux/modules/UISlice";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apis/axios";
import Alert from "../components/common/modal/Alert";

const Signup = () => {
  const [screenChange, setScreenChange] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImg,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const { isModal } = useSelector((state) => state.UISlice); //모달창을 사용하기 위한 값?

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

  const { mutate } = useMutation((formData) => loginApi.create(formData), {
    onSuccess: () => {
      dispatch(
        showModal({ isModal: true, content: "회원가입 성공!", move: "/login" }) //모달창에 전달하는 데이터
      );
    },
    onError: (error) => {
      console.log(error);
      const msg = error.response.data.message;
      const errorStatus = error.response.status;
      console.log(errorStatus);
      if (errorStatus === 409) {
        console.log();
        dispatch(showModal({ isModal: true, content: msg }));
      }
    },
  });

  return (
    <>
      {isModal && <Alert />}
      <StContainer bgColor="#EEF3E3;">
        <StHeader>
          <BackButtonDiv>
            {screenChange ? (
              <GrPrevious onClick={onScreenChangeHandler} />
            ) : (

              <GrPrevious onClick={() => navigate("/login")} />

            )}
          </BackButtonDiv>
        </StHeader>
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
              <div>
                <label htmlFor="password">비밀번호</label>
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
                    },
                    message: "4자리 이상 비밀번호를 입력해주세요",
                  })}
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
                />
                {errors.passwordCheck && (
                  <small role="alert">{errors.passwordCheck.message}</small>
                )}
              </div>
              {isDirty &&
                watch("email") !== "" &&
                watch("password") !== "" &&
                watch("passwordCheck") !== "" &&
                !errors.email &&
                !errors.password &&
                !errors.passwordCheck && (
                  <SignupButtonBox>
                    <button type="button" onClick={onScreenChangeHandler}>
                      다음
                    </button>
                  </SignupButtonBox>
                )}
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
                <Button
                  className="profile-setting"
                  type="button"
                  onClick={() => inputRef.click()}
                  icon={<AiOutlineSetting />}
                  round
                >
                  파일
                </Button>
              </div>
              <div className="nickInput-box">
                <label>닉네임</label>
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
                />
                {errors.nickname && (
                  <small role="alert">{errors.nickname.message}</small>
                )}
              </div>
              <SignupButtonBox>
                <button type="submit" disabled={isSubmitting}>
                  회원가입
                </button>
              </SignupButtonBox>
            </section>
          </ProfileSection>
        </SlideContainerForm>
      </StContainer>
    </>
  );
};

export default Signup;

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
  input {
    display: block;
    width: 100%;
    height: 5.2rem;
    border: none;
    border-radius: 10px;
    margin-top: 1rem;
    padding: 0 1rem;
    ::placeholder {
      color: #dedede;
    }
  }
  small {
    color: #ff5656;
  }
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
    display: flex;
    align-items: center;
    justify-content: center;
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
