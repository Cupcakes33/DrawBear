import { StContainer, StSection, StHeader, DisplayDiv } from "../../UI/common";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import NavigateBtn from "../../components/common/NavigateBtn";
import { useForm } from "react-hook-form";

const MyPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData) => {};

  return (
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
              className={errors.currentPW?.type === undefined ? "pass" : "fail"}
              type="password"
              id="currentPW"
              name="currentPW"
              placeholder="영문, 숫자 조합 8자리 이상"
              {...register("currentPW", { required: true, pattern: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/ })}
              aria-invalid={errors?.currentPW ? "true" : "false"}
            />
            {errors?.currentPW && <span role="alert">비밀번호를 다시 한 번 확인해주세요.</span>}
          </div>
          <div className="PW-box changing">
            <label>새로 변경할 비밀번호</label>
            <input
              className={errors.newPW?.type === undefined ? "pass" : "fail"}
              type="password"
              id="newPW"
              name="newPW"
              placeholder="영문, 숫자 조합 8자리 이상"
              {...register("newPW", { required: true, pattern: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/ })}
              aria-invalid={errors?.newPW ? "true" : "false"}
            />
            {errors?.newPW && <span role="alert">영문, 숫자 조합 8자리 이상의 비밀번호를 입력해주세요.</span>}
            <input
              
            />
            {errors?.PWreconfirmation && <span role="alert">두 비밀번호가 달라요. 다시 한 번 확인해주세요.</span>}
          </div>
        </MypageSection>
      </form>
      <Footer />
    </StContainer>
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
