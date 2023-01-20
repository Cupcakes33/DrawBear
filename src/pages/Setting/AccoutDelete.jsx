import { StContainer, StSection, StHeader } from "../../UI/common";
import styled from "styled-components";
import NavigateBtn from "../../components/common/NavigateBtn";
import AccountDeleteBear from "../../assets/images/account_delete_bear.webp";
import Button from "../../components/common/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mypageApi } from "../../apis/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/modules/UISlice";
import Alert from "../../components/common/modal/Alert";

const AccoutDelete = () => {
  const { data, isLoading } = useQuery(["myProfileData"], mypageApi.read);
  const dispatch = useDispatch();
  const { isModal } = useSelector((state) => state.UISlice);
  const { mutate } = useMutation((inputData) => mypageApi.delete(inputData), {
    onError: (error) => {
      if (error.response.status === 401) {
        dispatch(
          showModal({
            isModal: true,
            content: "비밀번호가 틀렸습니다.",
            move: "/setting/delete",
          })
        );
      }
    },
    onSuccess: (success) => {
      dispatch(
        showModal({
          isModal: true,
          content: "탈퇴가 완료 되었습니다.",
          move: "/login",
        }),
        localStorage.removeItem("token")
      );
    },
  });
  const [userinfo, setUserInfo] = useState({
    nickName: "",
  });
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
  }, [isLoading]);
  return (
    <>
      {isModal && <Alert />}
      <StContainer>
        <StHeader flex justify="flex-start">
          <NavigateBtn prev sizeType="header" />
          <h3>회원 탈퇴</h3>
        </StHeader>
        <StMypageSection flex derection="column" justify="flex-start">
          <form>
            <div className="myProfileInfoWrapper">
              <img src={AccountDeleteBear} alt="탈퇴곰돌이" />
            </div>
            <div className="warning">
              <h2>{userinfo.nickName}님</h2>
              <h2>정말 떠나시겠어요? {": ("}</h2>
              <h4>
                내 프로필 사진, 댓글, 다이어리, 내용 등 모든 활동 정보가 삭제되며, 삭제된 데이터는 복구할 수 없어요.
              </h4>
            </div>
            <div className="delete-button" onClick={handleSubmit(onSubmit)}>
              <Button fullWidth color="button_alart">
                네, 탈퇴할래요.
              </Button>
            </div>
            <div>
              <h4>회원탈퇴를 위해 비밀번호를 입력해주세요</h4>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                aria-invalid={!isDirty ? undefined : errors.password ? false : true}
                {...register("password", {
                  required: "비밀번호는 필수 입력 입니다.",
                })}
              />
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </div>
          </form>
        </StMypageSection>
      </StContainer>
    </>
  );
};

export default AccoutDelete;

const StMypageSection = styled(StSection)`
  padding-top: 20%;
  overflow-x: hidden;
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  img {
    width: 13.5rem;
    height: 11.3rem;
  }
  .warning {
    padding-top: 5%;
    width: 80%;
    word-break: keep-all;
  }
  h4 {
    margin-top: 1rem;
  }
  .delete-button {
    position: absolute;
    top: 90%;
    width: 80%;
    button {
      width: 100%;
      height: 5.5rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
`;
