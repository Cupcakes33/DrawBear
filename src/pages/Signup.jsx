import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });
  return (
    <>
      <h2>회원가입</h2>
      <h2>당신의 프로필을 꾸며주세요 :)</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => {
            setTimeout(r, 1000);
          });
          alert(JSON.stringify(data));
        })}
      >
        {/* <label htmlFor="profileImg">프로필사진</label>
      <input
        id="profileImg"
        type="file"
        name="profileImg"
        placeholder="이미지를 선택해주세요"
      /> */}
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : false}
          {...register("email", {
            required: "이메일은 필수 입력 값입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email.message}</small>}
        {/* <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          aria-invalid={
            !isDirty ? undefined : errors.nickname ? "true" : "false"
          }
          {...register("nickname", {
            required: "닉네임은 필수 입력 입니다.",
            minLength: {
              value: 2,
              message: "2자리 이상 닉네임을 사용하세요.",
            },
          })}
        />
        {errors.nickname && (
          <small role="alert">{errors.nickname.message}</small>
        )} */}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="***********"
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
          {...register("password", {
            required: "비밀번호는 필수 입력 입니다.",
            minLength: {
              value: 4,
              message: "4자리 이상 비밀번호를 입력해주세요",
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password.message}</small>
        )}
        <input
          id="passwordComfile"
          type="password"
          name="passwordComfile"
          placeholder="비밀번호재입력"
          aria-invalid={
            !isDirty ? undefined : errors.passwordComfile ? "true" : "false"
          }
          {...register("passwordComfile", {
            required: "비밀번호는 필수 입력 입니다.",
            minLength: {
              value: 4,
              message: "4자리 이상 비밀번호를 입력해주세요",
            },
          })}
        />
        {errors.passwordComfile && (
          <small role="alert">{errors.passwordComfile.message}</small>
        )}
        <button type="submit" disabled={isSubmitting}>
          회원가입
        </button>
      </form>
    </>
  );
};
export default Signup;
