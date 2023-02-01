import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { instance } from "../../apis/axios";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const grantType = "authorization_code";
  const clientId = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const code = new URL(document.location.toString()).searchParams.get("code");
  const authKakaoLogin = async () => {
    const res = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    localStorage.setItem("token", res.data.access_token);
    console.log(res.data);
    // navigate("/");
  };

  useEffect(() => {
    if (!code) return;
    authKakaoLogin();
  }, []);

  return <></>;
};

export default KakaoLogin;
