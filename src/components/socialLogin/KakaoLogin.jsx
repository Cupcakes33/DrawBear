import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/axios";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");

  const authKakaoLogin = async () => {
    const res = await instance.get(
      `api/auth/login/kakao/callback?code=${code}`
    );
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  useEffect(() => {
    if (!code) return;
    authKakaoLogin();
  }, []);

  return <></>;
};

export default KakaoLogin;
