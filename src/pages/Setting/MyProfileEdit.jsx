import { StContainer, StSection, StHeader, DisplayDiv } from "../../UI/common";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import NavigateBtn from "../../components/common/NavigateBtn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mypageApi } from "../../apis/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDispatchHook from "../../hooks/useDispatchHook";
import { Input, WorningWord } from "../../components/common/Input";
import Buttons from "../../components/common/Button/Buttons";


const MyProfileEdit = () => {
  const { openAlertModal } = useDispatchHook();
  const { data, isLoading } = useQuery(["myProfileData"], mypageApi.read);
  const { mutate } = useMutation((formData) => mypageApi.update(formData), {
    onSuccess: (success) => {
      openAlertModal({ bigTxt: success.message, move: "/setting/" }); //모달창에 전달하는 데이터
    },
  });
  const [nick, setNick] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "",
  });
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({ mode: "onChange" });

  const nickChangeHandle = (event) => {
    setNick(event.target.value);
  };
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
  const onSubmit = (data) => {
    const formData = new FormData();
    if (!data.nickname) {
      formData.append("nickname", nick);
      formData.append("image", image.image_file);
    } else if (!image.image_file && nick !== data.nickname) {
      formData.append("nickname", data.nickname);
      formData.append("image", image.preview_URL);
    } else {
      formData.append("nickname", data.nickname);
      formData.append("image", image.image_file);
    }
    mutate(formData);
  };

  useEffect(() => {
    setNick(data?.userInfo.nickname);
    setImage({ preview_URL: data?.userInfo.profileImg });
  }, [isLoading]);

  let inputRef;

  return (
    <>
      <StContainer>
        <StHeader flex justify="space-between">
          <DisplayDiv flex>
            <NavigateBtn prev sizeType="header" link="/setting" />
            <h3>프로필 수정</h3>
          </DisplayDiv>
          <span onClick={handleSubmit(onSubmit)}>수정</span>
        </StHeader>
        <form>
          <MyProfileSection flex derection="column" justify="flex-start">
            <div>
              <input
                {...register("image")}
                id="profileImg"
                type="file"
                name="profileImg"
                accept="image/*"
                onChange={imgOnChnageHandler}
                onClick={(e) => (e.target.value = null)}
                ref={(refParam) => (inputRef = refParam)}
                style={{ display: "none " }}
              ></input>
              <div className="myProfileInfoWrapper">
                <img
                  src={image.preview_URL}
                  alt=""
                  onClick={() => inputRef.click()}
                />

                <Buttons.ProfileSetting
                  className="profile-edit"
                  onClick={() => inputRef.click()}
                />
              </div>
            </div>
            <AccountInfoBox>
              <div>
                <label>이메일</label>
                <span>{data?.userInfo.email}</span>
              </div>
              <div>
                <label>닉네임</label>
                <div
                  className="nickName_container"
                  style={{ flexDirection: "column" }}
                >
                  <input
                    className={errors.nickname ? "fail" : "pass"}
                    id="nickname"
                    type="text"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요"
                    defaultValue={nick}
                    onChange={nickChangeHandle}
                    aria-invalid={
                      !isDirty ? undefined : errors.nickname ? "true" : "false"
                    }
                    {...register("nickname", {
                      minLength: {
                        value: 2,
                      },
                      maxLength: {
                        value: 7,
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                <WorningWord
                  color={errors?.nickname?.type}
                  margin="-3rem 0 0 6.5rem"
                >
                  2~7자리 닉네임을 사용하세요.
                </WorningWord>
              </div>
            </AccountInfoBox>
          </MyProfileSection>
        </form>
        <Footer />
      </StContainer>
    </>
  );
};

export default MyProfileEdit;

const MyProfileSection = styled(StSection)`
  padding-top: 20%;
  overflow-x: hidden;
  .myProfileInfoWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .profile-edit {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nickName-box {
    padding: 10%;
    display: grid;
    width: 90%;
    gap: 1rem;
  }
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
`;

const AccountInfoBox = styled.div`
  width: 80%;
  padding-top: 10%;
  display: grid;
  gap: 3rem;
  div {
    display: flex;
    align-items: center;
    gap: 1.3rem;
  }
  label {
    font-size: 2rem;
    font-weight: 700;
  }
  span {
    font-size: 1.4rem;
    color: #8c8c8c;
  }
  ${Input("#F5F5F5", "105%", "0 0 0 0.3rem")}
`;
