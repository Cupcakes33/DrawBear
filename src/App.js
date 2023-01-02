import KakaoLogin from "./components/socialLogin/KakaoLogin";
import NaverLogin from "./components/socialLogin/NaverLogin";
function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", gap: "30px" }}
    >
      <div>
        <KakaoLogin />
      </div>
      <div>
        <NaverLogin />
      </div>
    </div>
  );
}

export default App;
