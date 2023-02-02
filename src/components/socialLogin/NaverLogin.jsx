import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/axios";

const NaverLogin = () => {
  const navigate = useNavigate();
  const code = new URL(document.location).searchParams.get("code");
  const state = new URL(document.location).searchParams.get("state");

  const getNaverToken = async () => {
    const res = await instance.get(
      `/api/auth/login/naver/callback?code=${code}&state=${state}`
    );
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  useEffect(() => {
    if (!code) return;
    getNaverToken();
  }, []);

  // const naverLogout = () => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .post(
  //       `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return <></>;
};

export default NaverLogin;
