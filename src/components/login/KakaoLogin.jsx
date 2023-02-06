import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/axios";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");

  const authKakaoLogin = async () => {
    try {
      const res = await instance.get(
        `api/auth/login/kakao/callback?code=${code}`
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (err.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!code) return;
    authKakaoLogin();
  }, []);

  return <></>;
};

export default KakaoLogin;
