import styled from "styled-components";
import NavigateBtn from "../components/common/NavigateBtn";
import { StContainer, StHeader, StSection } from "../UI/common";

const Profile = () => {
  return (
    <StContainer>
      <StHeader flex justify="flex-start">
        <NavigateBtn prev sizeType="header" />
        <h3>개인정보 수정</h3>
      </StHeader>
      <StEditProfileSection flex derection="column" justify="flex-start">
        <div className="editProfileWrapper">
          <div>내 프로필 관리</div>
          <div>비밀번호 변경</div>
          <div>로그아웃</div>

          <div></div>
          <div>회원 탈퇴</div>
        </div>
      </StEditProfileSection>
    </StContainer>
  );
};

export default Profile;

const StEditProfileSection = styled(StSection)`
  .editProfileWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }
`;
