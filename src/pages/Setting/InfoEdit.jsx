import styled from "styled-components";
import NavigateBtn from "../../components/common/NavigateBtn";
import { flex, StContainer, StHeader, StSection } from "../../UI/common";
import { useNavigate } from "react-router-dom";

const InfoEdit = () => {
  const navigate = useNavigate();

  return (
    <>
      <StContainer>
        <StHeader flex justify="flex-start">
          <NavigateBtn prev sizeType="header" link="/setting" />
          <h3>개인정보 수정</h3>
        </StHeader>
        <EditProfileSection flex derection="column" justify="flex-start">
          <div className="editProfileWrapper">
            <div onClick={() => navigate("/setting/infoEdit/password")}>
              비밀번호 변경
              <NavigateBtn />
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
      ${flex("space-between", "")}
      cursor: pointer;
    }
    span {
      color: #ff5f5f;
    }
  }
`;
