import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [user_exists, setUserExists] = useState(false);
  const passwordCheck = () => {
    const firstPW = document.querySelector(".pw1").value;
    const secondPW = document.querySelector(".pw2").value;
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
    const pw = document.querySelector(".pw1").value;
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
  const validate_field = (e) => {
    const { value, id } = e.target;
    if (value === "" || value === undefined) {
      document
        .getElementById("valid-" + id)
        ?.setAttribute("class", "display-input-validation");
    } else {
      document
        .getElementById("valid-" + id)
        ?.setAttribute("class", "input-validation");
    }
  };
  const validate_all_fields = (user_object) => {
    const { username, email, password, full_name } = user_object;
    const fields = document.getElementsByName("user-input");
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      const { value, id } = field;
      if (value === "" || value === undefined || !value) {
        document
          .getElementById(`valid-${id}`)
          ?.setAttribute("class", "display-input-validation");
      } else {
        document
          .getElementById(`valid-${id}`)
          ?.setAttribute("class", "input-validation");
      }
    }
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
  const check_username_email = async () => {
    const userName = document.querySelector(".username").value;
    const emailAddress = document.querySelector(".email").value;
    const user_exists = await fetch("/api/user/exists", {
      method: "POST",
      body: JSON.stringify({
        email: emailAddress,
        username: userName,
      }),
    }).then((res) => res.json());
    setUserExists(user_exists);
  };
  const createUser = async (e) => {
    e.preventDefault();
    const firstPW = document.querySelector(".pw1").value;
    const userName = document.querySelector(".username").value;
    const emailAddress = document.querySelector(".email").value;
    const fullName = document.querySelector(".full_name").value;
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
      setCookie("user_full_name", fullName);
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
          name="user-input"
          className="username"
          id="username"
          placeholder="username_example_01"
          onInput={check_username_email}
          onChange={validate_field}
        />
        <label className="input-validation" id="valid-username">
          Username is Required
        </label>
        <label className="input-label">Email Address</label>
        <input
          type="email"
          name="user-input"
          className="email"
          id="email"
          placeholder="example@email.com"
          onChange={validate_field}
          onInput={check_username_email}
        />
        <label className="input-validation" id="valid-email">
          Email is Required
        </label>
        <label className="input-label">Full Name</label>
        <input
          type="text"
          name="user-input"
          id="full_name"
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
          name="user-input"
          className="pw1"
          id="password"
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
          id="pw2"
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
