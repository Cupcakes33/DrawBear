import styled from "styled-components";
import kakao from "../../assets/images/kakao.webp";
import { flex } from "../../UI/common";

const SocialLogin = () => {
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <SocialLoginBox>
      <a href={KAKAO_AUTH_URL}>
        <img src={kakao} alt="카카오 로그인" />
      </a>
    </SocialLoginBox>
  );
};

export default SocialLogin;

const SocialLoginBox = styled.div`
  ${flex}
  width: 100%;
  gap: 2rem;
  padding-top: 15%;
  img {
    cursor: pointer;
  }
`;
