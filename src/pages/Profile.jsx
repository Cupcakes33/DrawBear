import { useState } from "react";
import styled from "styled-components";
import NavigateBtn from "../components/common/NavigateBtn";
import { StContainer, StHeader, StSection } from "../UI/common";
import LogoutModal from "../components/mypage/LogoutModal";

const Profile = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      {isModal && <LogoutModal onClose={setIsModal} />}
      <StContainer>
        <StHeader flex justify="flex-start">
          <NavigateBtn prev sizeType="header" />
          <h3>개인정보 설정</h3>
        </StHeader>
        <StEditProfileSection flex derection="column" justify="flex-start">
          <div className="editProfileWrapper">
            <div>
              내 프로필 관리
              <NavigateBtn link={""} />
            </div>
            <div>
              비밀번호 변경
              <NavigateBtn link={""} />
            </div>
            <div
              onClick={() => {
                setIsModal(!isModal);
              }}
            >
              로그아웃
            </div>

            <div></div>
            <div>
              회원 탈퇴
              <NavigateBtn link={""} />
            </div>
          </div>
        </StEditProfileSection>
      </StContainer>
    </>
  );
};

export default Profile;

const StEditProfileSection = styled(StSection)`
  .editProfileWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
