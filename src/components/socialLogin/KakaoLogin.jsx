import axios from "axios";

const KakaoLogin = () => {
  const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLoginHandler = () => {
    window.location.replace(KAKAO_AUTH_URL);
  };

  const getAuthCode = () => {
    const code = new URL(document.location).searchParams.get("code");
    return code;
  };

  const getKakaoToken = () => {
    const code = getAuthCode();
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const token = res.data.access_token;
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewKakaoToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
  };

  const kakaoLoginUserInfo = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const kakaoLogout = () => {
    const token = localStorage.getItem("token");
    axios

      .post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={kakaoLoginHandler}>카카오로그인</button>
      <button onClick={getAuthCode}>인가코드받기</button>
      <button onClick={getKakaoToken}>토큰받아서 저장하기</button>
      <button onClick={viewKakaoToken}>토큰보기</button>
      <button onClick={kakaoLoginUserInfo}>정보보기</button>
      <button onClick={kakaoLogout}>로그아웃</button>
    </>
  );
};

export default KakaoLogin;
