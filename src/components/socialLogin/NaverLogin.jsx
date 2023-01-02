import axios from "axios";
import { useEffect } from "react";

const NaverLogin = () => {
  const { naver } = window;

  const naverLogin = () => {
    const login = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      clientSecret: process.env.REACT_APP_NAVER_CLIENT_SECRET,
      callbackUrl: "http://localhost:3000/naverlogin",
      isPopup: false,
      callbackHandle: true,
      loginButton: { color: "green", type: 1, height: 20 },
    });
    login.init();
  };

  useEffect(() => {
    naverLogin();
  }, []);

  const getNaverToken = () => {
    const code = new URL(document.location).searchParams.get("code");
    const state = new URL(document.location).searchParams.get("state");
    axios

      .post(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
      )
      .then((res) => {
        const token = res.data.access_token;
        localStorage
          .setItem("token", token)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const viewNaverToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
  };

  const naverLoginUserInfo = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://openapi.naver.com/v1/nid/me", {
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


  const naverLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`
      )
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div id="naverIdLogin" />
      <button onClick={getNaverToken}>네이버 토큰 받기</button>
      <button onClick={viewNaverToken}>네이버 토큰 보기</button>
      <button onClick={naverLoginUserInfo}>네이버 유저 정보</button>
      <button onClick={naverLogout}>네이버 로그아웃</button>
    </>
  );
};

export default NaverLogin;
