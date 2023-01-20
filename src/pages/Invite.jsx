import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StContainer, StHeader, StSection } from "../UI/common";
import { BsSearch } from "react-icons/bs";

const userData = [
  {
    id: 1,
    name: "김철수",
    email: "abc@naver.com",
    profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  },
  {
    id: 2,
    name: "김영희",
    email: "eieke@naver.com",
    profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  },
  {
    id: 1,
    name: "이수",
    email: "3209@naver.com",
    profile: "https://cdn-icons-png.flaticon.com/512/5312/5312933.png",
  },
];

const Invite = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <StHeader flexCenter>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </button>
        <h3>같이 쓰는 멤버 초대</h3>
      </StHeader>
      <StInviteSection>
        <StSearchInputWrapper>
          <input placeholder="초대 할 멤버의 아이디를 입력해주세요."></input>
          <StSearchBtn />
        </StSearchInputWrapper>
        <StSearchUserInfoWrapper>
          {userData.map((user) => (
            <StSearchUserInfo key={`userId${user.id}`}>
              <img src={user.profile} alt="profile" />
              <div>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
              <button>초대</button>
            </StSearchUserInfo>
          ))}
        </StSearchUserInfoWrapper>
      </StInviteSection>
    </StContainer>
  );
};

export default Invite;

const StInviteSection = styled(StSection)``;

const StSearchInputWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 1rem;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px palevioletred;
      transition: box-shadow 0.15s ease-in-out;
    }
  }
`;

const StSearchBtn = styled(BsSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.8rem;
  cursor: pointer;
`;

const StSearchUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;
`;

const StSearchUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    span {
      font-size: 1.4rem;
      font-weight: 600;
      &:last-child {
        font-size: 1.2rem;
        font-weight: 400;
        color: #d9d9d9;
      }
    }
  }
  button {
    width: 5rem;
    height: 3rem;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
  }
`;
