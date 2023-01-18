import { StContainer, StSection, StHeader, PrevPageInfo } from "../UI/common";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import NavigateBtn from "../components/common/NavigateBtn";
import { TiPencil } from "react-icons/ti";

const myProfileData = {
  id: 1,
  name: "김철수",
  email: "abc@naver.com",
  profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
};

const MyProfileEdit = () => {
  return (
    <StContainer>
      <StHeader flex justify="space-between">
        <PrevPageInfo flex>
          <NavigateBtn prev sizeType="header" />
          <h3>프로필 수정</h3>
        </PrevPageInfo>
        <div>
          <span>수정</span>
        </div>
      </StHeader>
      <MyProfileSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={myProfileData.profile} alt="myProfileImg" />
          <div className="pencilIcon-box">
            <TiPencil />
          </div>
        </div>
        <AccountInfoBox>
          <div>
            <label>이메일</label>
            <span>{myProfileData.email}</span>
          </div>
          <div>
            <label>닉네임</label>
            <input />
          </div>
        </AccountInfoBox>
      </MyProfileSection>
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
