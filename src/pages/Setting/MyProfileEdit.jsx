import { StContainer, StSection, StHeader, DisplayDiv } from "../../UI/common";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import NavigateBtn from "../../components/common/NavigateBtn";
import { TiPencil } from "react-icons/ti";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mypageApi } from "../../apis/axios";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { useForm } from "react-hook-form";
import useDispatchHook from "../../hooks/useDispatchHook";

const MyProfileEdit = () => {
  const { openAlertModal } = useDispatchHook();
  const { data, isLoading } = useQuery(["myProfileData"], mypageApi.read);
  const { mutate } = useMutation((formData) => mypageApi.update(formData), {
    onSuccess: (success) => {
      openAlertModal({ bigTxt: success.message, move: "/setting/profileEdit" }); //모달창에 전달하는 데이터
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
            <NavigateBtn prev sizeType="header" />
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
                <img src={image.preview_URL} onClick={() => inputRef.click()} />
                <div className="pencilIcon-box">
                  <Button type="button" onClick={() => inputRef.click()} icon={<TiPencil />} round></Button>
                </div>
              </div>
            </div>
            <AccountInfoBox>
              <div>
                <label>이메일</label>
                <span>{data?.userInfo.email}</span>
              </div>
              <div>
                <span className="nickName_txt">닉네임</span>
                <div className="nickName_container" style={{ flexDirection: "column" }}>
                  <input
                    id="nickname"
                    type="text"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요"
                    defaultValue={nick}
                    onChange={nickChangeHandle}
                    aria-invalid={!isDirty ? undefined : errors.nickname ? "true" : "false"}
                    {...register("nickname", {
                      minLength: {
                        value: 2,
                        message: "2자리 이상 닉네임을 사용하세요.",
                      },
                    })}
                  />
                  {errors.nickname && <small role="alert">{errors.nickname.message}</small>}
                </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .pencilIcon-box {
    width: 3.4rem;
    height: 3.4rem;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 17%;
    left: 55%;
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
    gap: 2rem;
  }
  label {
    font-size: 2.6rem;
    font-weight: 700;
  }
  span {
    font-size: 1.4rem;
    color: #8c8c8c;
  }
  input {
    width: 20rem;
    height: 4.5rem;
    padding: 0 1rem;
    border: none;
    border-radius: 8px;
    background: #f5f5f5;
  }
`;
