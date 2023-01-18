import { useState } from "react";
import styled from "styled-components";
import NavigateBtn from "../../components/common/NavigateBtn";
import { StContainer, StHeader, StSection } from "../../UI/common";
import LogoutModal from "../../components/mypage/LogoutModal";
import { useNavigate } from "react-router-dom";

const InfoEdit = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isModal && <LogoutModal onClose={setIsModal} />}
      <StContainer>
        <StHeader flex justify="flex-start">
          <NavigateBtn prev sizeType="header" />
          <h3>개인정보 수정</h3>
        </StHeader>
        <EditProfileSection flex derection="column" justify="flex-start">
          <div className="editProfileWrapper">
            <div onClick={() => navigate("/setting/password")}>
              비밀번호 변경
              <NavigateBtn />
            </div>
            <div
              onClick={() => {
                setIsModal(!isModal);
              }}
            >
              로그아웃
            </div>
            <div onClick={() => navigate("/setting/delete")}>
              <span>회원 탈퇴</span>
            </div>
          </div>
        </EditProfileSection>
      </StContainer>
    </>
  );
};

export default InfoEdit;

const EditProfileSection = styled(StSection)`
  overflow-x: hidden;
  .editProfileWrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 1.7rem;
    font-weight: 700;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    span {
      color: #ff5f5f;
    }
  }
`;