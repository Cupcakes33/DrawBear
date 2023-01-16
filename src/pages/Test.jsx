import { useState } from "react";
import styled from "styled-components";

const Test = () => {
  const [isEnable, setIsEnable] = useState(true); //버튼 비활성화
  const [signUpClassName, setsignUpClassName] = useState("active-form-slide");
  const [profilIsClassName, setprofilIsClassName] = useState("form-slide");
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
        <StSginupForm
          action=""
          style={{
            display: "flex",
            position: "relative",
            transition: "0.2s",
            left: 0,
          }}
        >
          <div>
            <div className={signUpClassName}>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="비번을 입력해주세요"
                />
                <input
                  type="password"
                  id="passwordCheck"
                  name="passwordCheck"
                  placeholder="중복확인"
                />
              </div>
              <div>
                <button
                  onClick={() => {
                    changeNextBtnClassName();
                  }}
                  // disabled={isEnable}
                >
                  다음
                </button>
              </div>
            </div>
            <div className={profilIsClassName}>
              <div>
                이미지 <input type="file" />
              </div>
              <div>
                닉네임 <input type="text" />
              </div>
              <div>
                <button
                  onClick={() => {
                    changeBeforeBtnClassName();
                  }}
                >
                  이전
                </button>
                <button type="submit">회원가입</button>
              </div>
            </div>
          </div>
        </StSginupForm>
      </div>
    </>
  );
};

export default Test;

const StSginupForm = styled.form`
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
