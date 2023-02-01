import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StContainer, StHeader } from "../../UI/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";
import { mypageApi } from "../../apis/axios";
import { Input } from "../../components/common/Input";
import AccountDeleteBear from "../../assets/images/account_delete_bear.webp";
import useDispatchHook from "../../hooks/useDispatchHook";

const AccoutDelete = () => {
  const [screenChange, setScreenChange] = useState("");
  const [userinfo, setUserInfo] = useState({
    nickName: "",
  });
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["myProfileData"], mypageApi.read);
  const { openAlertModal } = useDispatchHook;

  const { mutate } = useMutation((inputData) => mypageApi.delete(inputData), {
    onError: (error) => {
      if (error.response.status === 401) openAlertModal({ bigTxt: "비밀번호가 틀렸습니다." });
    },
    onSuccess: () => {
      openAlertModal({ bigTxt: "탈퇴가 완료 되었습니다.", move: "/login" });
      return localStorage.removeItem("token");
    },
  });

  const onScreenChangeHandler = () => {
    setScreenChange(!screenChange);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onchange" });

  const onSubmit = (inputData) => {
    mutate(inputData);
  };

  useEffect(() => {
    setUserInfo({
      nickName: data?.userInfo.nickname,
    });
  }, []);

  return (
    <>
      <StContainer>
        <StHeader flex justify="flex-start">
          <BackButtonDiv>
            {screenChange ? (
              <GrPrevious onClick={onScreenChangeHandler} />
            ) : (
              <GrPrevious onClick={() => navigate("/setting/infoEdit")} />
            )}
          </BackButtonDiv>
          <h3>회원 탈퇴</h3>
        </StHeader>
        <SlideContainerForm screenChange={screenChange} onSubmit={handleSubmit(onSubmit)}>
          <AccountDeleteLeftSection>
            <section>
              <div className="myProfileInfoWrapper">
                <img src={AccountDeleteBear} alt="탈퇴곰돌이" />
              </div>
              <div className="warning">
                <h2>{userinfo.nickName}님</h2>
                <h2>정말 떠나시겠어요? {": ("}</h2>
              </div>
              <div>
                <span>
                  내 프로필 사진, 댓글, 다이어리, 내용 등 모든 활동 정보가 삭제되며, 삭제된 데이터는 복구할 수 없어요.
                </span>
              </div>
              <AccountDeleteButtonBox>
                <button type="button" onClick={onScreenChangeHandler}>
                  네, 탈퇴할래요.
                </button>
              </AccountDeleteButtonBox>
            </section>
          </AccountDeleteLeftSection>
          <AccountDeleteRightSection>
            <section>
              <div className="alert-box">
                <h3>안전한 회원탈퇴를 위해</h3>
                <h3>
                  <span>비밀번호를 확인</span>
                  해주세요.
                </h3>
              </div>
              <div className="email-box">
                <label>이메일</label>
                <span>{data?.userInfo.email}</span>
              </div>
              <div className="password-box">
                <label htmlFor="password">비밀번호</label>
                <div>
                  <input
                    className={errors.password ? "fail" : "pass"}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    aria-invalid={!isDirty ? undefined : errors.password ? false : true}
                    {...register("password", {
                      required: "비밀번호는 필수 입력 입니다.",
                    })}
                  />
                </div>
              </div>
            </section>
            <AccountDeleteButtonBox>
              <button disabled={isSubmitting}>회원탈퇴</button>
            </AccountDeleteButtonBox>
          </AccountDeleteRightSection>
        </SlideContainerForm>
      </StContainer>
    </>
  );
};

export default AccoutDelete;

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

const AccountDeleteLeftSection = styled.section`
  display: flex;
  justify-content: center;
  width: 50%;
  section {
    width: 80%;
    height: 90vh;
    padding-top: 20%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-align: center;
  }
  span {
    color: #939393;
    line-height: 140%;
  }
`;

const BackButtonDiv = styled.div`
  font-size: 2.4rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const AccountDeleteButtonBox = styled.div`
  position: absolute;
  bottom: 5%;
  button {
    width: 28.5rem;
    height: 5.3rem;
    color: white;
    background-color: #ff5656;
    border: none;
    border-radius: 10px;
    font-size: 1.7rem;
    font-weight: 700;
    cursor: pointer;
    :disabled {
      background-color: #ffb4b4;
      cursor: default;
    }
  }
`;

const AccountDeleteRightSection = styled.section`
  display: flex;
  justify-content: center;
  width: 50%;
  section {
    width: 80%;
    height: 50vh;
    padding-top: 20%;
  }
  label {
    font-weight: 700;
    font-size: 17px;
  }
  .alert-box {
    span {
      color: #ff5656;
    }
  }
  .email-box {
    padding-top: 20%;
    span {
      color: #939393;
      margin-left: 3rem;
    }
  }
  .password-box {
    display: flex;
    align-items: center;
    padding-top: 10%;
    input {
      margin-left: 1.4rem;
    }
    ${Input("#F5F5F5", "105%")}
  }
`;
