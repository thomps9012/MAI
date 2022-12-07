import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const passwordCheck = () => {
    const firstPW = (document.querySelector(".pw1") as HTMLInputElement).value;
    const secondPW = (document.querySelector(".pw2") as HTMLInputElement).value;
    if (firstPW != secondPW) {
      document
        .getElementById("valid-pw2")
        ?.setAttribute("class", "display-input-validation");
      return false;
    } else {
      document
        .getElementById("valid-pw2")
        ?.setAttribute("class", "input-validation");
      return true;
    }
  };
  const valid_password = () => {
    const pw = (document.querySelector(".pw1") as HTMLInputElement).value;
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
  const validate_field = (e: any) => {
    const input_value = e.target.value;
    if (input_value === "" || input_value === undefined) {
      document
        .getElementById("valid-" + e.target.name)
        ?.setAttribute("class", "display-input-validation");
    } else {
      document
        .getElementById("valid-" + e.target.name)
        ?.setAttribute("class", "input-validation");
    }
  };
  interface UserInput {
    username: string;
    email: string;
    password: string;
    full_name: string;
  }
  const validate_all_fields = (user_object: UserInput) => {
    const { username, email, password, full_name } = user_object;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      full_name === ""
    ) {
      return false;
    }
    return true;
  };
  const createUser = async (e: any) => {
    e.preventDefault();
    const firstPW = (document.querySelector(".pw1") as HTMLInputElement).value;
    const userName = (document.querySelector(".username") as HTMLInputElement)
      .value;
    const emailAddress = (document.querySelector(".email") as HTMLInputElement)
      .value;
    const fullName = (document.querySelector(".full_name") as HTMLInputElement)
      .value;
    if (
      !validate_all_fields({
        username: userName,
        email: emailAddress,
        password: firstPW,
        full_name: fullName,
      }) ||
      !valid_password() ||
      !passwordCheck()
    ) {
      return;
    }
    const user_exists = await fetch("/api/user/exists", {
      method: "POST",
      body: JSON.stringify({
        email: emailAddress,
        username: userName,
      }),
    }).then((res) => res.json());
    console.log(user_exists);
    if (user_exists) {
      alert("username or email is already taken");
      return;
    }
    const user_res = await fetch("/api/user/add", {
      method: "POST",
      body: JSON.stringify({
        username: userName,
        email: emailAddress,
        password: firstPW,
        full_name: fullName,
      }),
    }).then((res) => res.json());
    console.log(user_res);
    if (user_res.acknowledged) {
      const user_id = user_res.insertedId;
      setCookie("user_id", user_id);
      setCookie("logged_in", true);
      setCookie("username", userName);
      setCookie("full_name", fullName);
      setCookie("user_editor", false);
      setCookie("user_admin", false);
      router.push("/");
    } else {
      alert(
        `there was a network error while setting up your account \n\n ${user_res.error}`
      );
    }
  };
  return (
    <div className="landing">
      <form>
        <h1>Sign Up</h1>
        <label className="input-label">Username</label>
        <input
          type="username"
          name="user-inputrname"
          className="username"
          placeholder="username_example_01"
          onChange={validate_field}
        />
        <label className="input-validation" id="valid-username">
          Username is Required
        </label>
        <label className="input-label">Email Address</label>
        <input
          type="email"
          name="user-inputil"
          className="email"
          placeholder="example@email.com"
          onChange={validate_field}
        />
        <label className="input-validation" id="valid-email">
          Email is Required
        </label>
        <label className="input-label">Full Name</label>
        <input
          type="text"
          name="user-inputl_name"
          className="full_name"
          placeholder="First Name Last Name"
          onChange={validate_field}
        />
        <label className="input-validation" id="valid-full_name">
          Full Name is Required
        </label>
        <label className="input-label">Password</label>
        <input
          type="text"
          name="user-inputsword"
          className="pw1"
          placeholder="*********"
          onChange={valid_password}
          onInput={passwordCheck}
        />
        <label className="input-validation" id="valid-password">
          Password must be eight characters long, contain an uppercase,
          lowercase, and numeric character
        </label>
        <label className="input-label">Confirm Password</label>
        <input
          type="text"
          name="user-input"
          className="pw2"
          onChange={passwordCheck}
          placeholder="*********"
        />
        <label className="input-validation" id="valid-pw2">
          Passwords must match
        </label>
        <a className="button" onClick={createUser}>
          Create Account
        </a>
      </form>
    </div>
  );
}
