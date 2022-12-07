import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
export async function getServerSideProps({ req, res }: any) {
  const login_attempts = getCookie("login_attempts", { req, res }) as string;
  return {
    props: { login_attempts: login_attempts ? parseInt(login_attempts) : 0 },
  };
}
export default function SignIn({ login_attempts }: { login_attempts: any }) {
  if (login_attempts > 10) {
    return (
      <main>
        <h1>Access Denied Due to an Inordinate Amount of Login Attempts</h1>
      </main>
    );
  }
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
      return false;
    } else {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "input-validation");
      return true;
    }
  };
  const validate_user_id = () => {
    const userName = (document.querySelector(".username") as HTMLInputElement)
      .value;
    const email = (document.querySelector(".email") as HTMLInputElement).value;
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
    const firstPW = (document.querySelector(".pw") as HTMLInputElement).value;
    const userName = (document.querySelector(".username") as HTMLInputElement)
      .value;
    const email = (document.querySelector(".email") as HTMLInputElement).value;
    if (!valid_password() || !validate_user_id()) {
      return;
    }
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
    console.log(login_attempts);
    const user_res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login_attempts,
        email,
        username: userName,
        password: firstPW,
      }),
    }).then((res) => res.json());
    if (user_res.error) {
      alert(user_res.error);
      router.reload();
      // if (login_attempts === NaN) {
      //   setCookie("login_attempts", 1);
      //   router.reload();
      //   return;
      // }
      // setCookie("login_attempts", login_attempts++);
      // router.reload();
      return;
    }
    const device_info = await fetch("/api/user/device_info", {
      headers: { device: device, user_info: JSON.stringify(user_res) },
    }).then((res) => res.json());
    device_info &&
      (await fetch("/api/user/email_smtp", {
        method: "POST",
        body: JSON.stringify(device_info),
      }));
    const { admin, editor, _id, full_name } = user_res;
    setCookie("user_admin", admin);
    setCookie("user_editor", editor);
    setCookie("user_id", _id);
    setCookie("user_full_name", full_name);
    setCookie("logged_in", true);
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
