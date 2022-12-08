import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
export default function SignIn() {
  const router = useRouter();
  const valid_password = () => {
    const pw = document.querySelector(".pw").value;
    const validation = pw.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    );
    if (validation === null) {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "display-input-validation");
      return false;
    } else {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "input-validation");
      return true;
    }
  };
  const validate_user_id = () => {
    const userName = document.querySelector(".username").value;
    const email = document.querySelector(".email").value;
    if (userName === "" && email === "") {
      document
        .getElementById("valid-user-id")
        ?.setAttribute("class", "display-input-validation");
      return false;
    } else {
      document
        .getElementById("valid-user-id")
        ?.setAttribute("class", "input-validation");
      return true;
    }
  };
  const signIn = async () => {
    const firstPW = document.querySelector(".pw").value;
    const userName = document.querySelector(".username").value;
    const email = document.querySelector(".email").value;
    if (!valid_password() || !validate_user_id()) {
      return;
    }
    const user_res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        username: userName,
        password: firstPW,
      }),
    }).then((res) => res.json());
    if (user_res.error) {
      alert(user_res.error);
      router.reload();
      return;
    }
    const { _id, full_name, admin, editor } = user_res;
    setCookie("user_id", _id);
    setCookie("user_full_name", full_name);
    setCookie("logged_in", true);
    setCookie("user_editor", editor);
    setCookie("user_admin", admin);
    router.push("/");
  };
  return (
    <div className="landing">
      <form>
        <h1>Sign In</h1>
        <label className="input-label">Username</label>
        <input
          type="username"
          name="username"
          className="username"
          placeholder="username_example_01"
          onChange={validate_user_id}
        />
        <label className="input-label">Email Address</label>
        <input
          type="email"
          name="email"
          className="email"
          placeholder="example@email.com"
          onChange={validate_user_id}
        />
        <label className="input-validation" id="valid-user-id">
          Email or Username is Required
        </label>
        <label className="input-label">Password</label>
        <input
          type="text"
          name="password"
          className="pw"
          placeholder="*********"
          onChange={valid_password}
        />
        <label className="input-validation" id="valid-password">
          Valid password must be entered
        </label>
        <a className="button" onClick={signIn}>
          Sign In
        </a>
      </form>
    </div>
  );
}
