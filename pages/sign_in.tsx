import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/userReducer";
import cookieCutter from "cookie-cutter";
import Cookies from "cookies";
export async function getServerSideProps({ req, res }: any) {
  const cookies = new Cookies(req, res);
  const login_attempts = cookies.get("login_attempts");
  if (login_attempts === undefined) {
    cookies.set("login_attempts", "1");
  }
  return {
    props: { login_attempts: "login_attempts" },
  };
}
export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const valid_password = () => {
    const pw = (document.querySelector(".pw") as HTMLInputElement).value;
    const validation = pw.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    );
    if (validation === null) {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "display-input-validation");
    } else {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "input-validation");
    }
  };
  const validate_user_id = () => {
    const userName = (document.querySelector(".username") as HTMLInputElement)
      .value;
    const email = (document.querySelector(".email") as HTMLInputElement).value;
    if (userName === ""  && email === "") {
      document
        .getElementById("valid-user-id")
        ?.setAttribute("class", "display-input-validation");
    } else {
      document
        .getElementById("valid-user-id")
        ?.setAttribute("class", "input-validation");
    }
  };
  const signIn = async () => {
    const firstPW = (document.querySelector(".pw") as HTMLInputElement).value;
    const userName = (document.querySelector(".username") as HTMLInputElement)
      .value;
    const email = (document.querySelector(".email") as HTMLInputElement).value;
    valid_password();
    validate_user_id();
    if (email === "" && userName === "") return;
    let device = "Unknown Device";
    if (navigator.userAgent.indexOf("Win") != -1) {
      device = "Windows Device";
    }
    if (navigator.userAgent.indexOf("Mac") != -1) {
      device = "Mac Device";
    }
    if (navigator.userAgent.indexOf("Linux") != -1) {
      device = "Linux Device";
    }
    if (navigator.userAgent.indexOf("Android") != -1) {
      device = "Android Device";
    }
    if (
      navigator.userAgent.indexOf("Android") != -1 &&
      navigator.userAgent.indexOf("Linux") != -1
    ) {
      device = "Android/Linux Device";
    }
    const user_res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: userName,
        password: firstPW,
      }),
    }).then((res) => res.json());
    const device_info = await fetch("/api/user/device_info", {
      headers: { device: device, user_info: JSON.stringify(user_res) },
    }).then((res) => res.json());

    device_info &&
      (await fetch("/api/user/email_smtp", {
        method: "POST",
        body: JSON.stringify(device_info),
      }));
    if (user_res.error) {
      alert(
        `there was an error while logging into your account \n\n ${user_res.error}`
      );
    } else {
      const user_cache = await caches.open("user");
      user_cache.put(
        "current",
        await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            username: userName,
            password: firstPW,
          }),
        })
      );
      cookieCutter.set("user_admin", user_res.admin, {
        path: "/",
      });
      cookieCutter.set("user_editor", user_res.editor, {
        path: "/",
      });
      cookieCutter.set("user_id", user_res._id, {
        path: "/",
      });
      dispatch(
        loginUser({
          id: user_res._id,
          full_name: user_res.full_name,
          admin: user_res.admin,
          editor: user_res.editor,
        })
      );
      router.push("/");
    }
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
          onBlur={validate_user_id}
        />
        <label className="input-label">Email Address</label>
        <input
          type="email"
          name="email"
          className="email"
          placeholder="example@email.com"
          onBlur={validate_user_id}
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
          onBlur={valid_password}
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
