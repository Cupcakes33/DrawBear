import { StContainer, StSection, StHeader, DisplayDiv } from "../../UI/common";
import styled from "styled-components";
import Footer from "../../components/common/Footer";
import NavigateBtn from "../../components/common/NavigateBtn";
import { TiPencil } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import { mypageApi } from "../../apis/axios";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import defaultImg from "../../assets/images/default_image.png";
import { useForm } from "react-hook-form";
const MyProfileEdit = () => {
  const { data, isLoading } = useQuery(["myProfileData"], mypageApi.read);
  const [nick, setNick] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });
  const nickChangeHandle = (e) => {
    setNick(e.target.value);
  };
  useEffect(() => {
    setNick(data?.userInfo.nickname);
  }, [isLoading]);

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: data?.userInfo.profileImg,
  });

  let inputRef;

  const imgOnChnageHandler = (e) => {
    console.log("ggg");
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
    <StContainer>
      <StHeader flex justify="space-between">
        <DisplayDiv flex>
          <NavigateBtn prev sizeType="header" />
          <h3>프로필 수정</h3>
        </DisplayDiv>
        <div>
          <span>수정</span>
        </div>
      </StHeader>
      <form>
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
          ></input>
          <div className="img-wrapper">
            <img
              src={image.preview_URL}
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
            <div className="profilImg_button">
              <Button
                onClick={() => inputRef.click()}
                icon={<TiPencil />}
                round
              >
                파일
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label>이메일</label>
          <span>{data?.userInfo.email}</span>
        </div>
        <div>
          <span className="nickName_txt">닉네임</span>
          <div className="nickName_container">
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              value={nick || ""}
              onChange={nickChangeHandle}
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
        </div>
      </form>
      {/* <MyProfileSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={data?.userInfo.profileImg} alt="myProfileImg" />
          <div className="pencilIcon-box">
            <TiPencil />
          </div>
        </div>
        <AccountInfoBox>
          <div>
            <label>이메일</label>
            <span>{data?.userInfo.email}</span>
          </div>
          <div>
            <label>닉네임</label>
            <input value={nick || ""} onChange={nickChangeHandle} />
          </div>
        </AccountInfoBox>
      </MyProfileSection> */}
      <Footer />
    </StContainer>
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
