import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/userReducer";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const passwordCheck = () => {
    const firstPW = (document.querySelector(".pw1") as HTMLInputElement).value;
    const secondPW = (document.querySelector(".pw2") as HTMLInputElement).value;
    if (firstPW != secondPW) {
      document
        .getElementById("valid-pw2")
        ?.setAttribute("class", "display-input-validation");
    } else {
      document
        .getElementById("valid-pw2")
        ?.setAttribute("class", "input-validation");
    }
  };
  const valid_password = () => {
    const pw = (document.querySelector(".pw1") as HTMLInputElement).value
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
  const validate_all_fields = () => {
    let invalid_inputs = 0;
    const inputs = document.querySelectorAll("input");
    for (const i in inputs) {
      const input_value = inputs[i].value;
      const input_name = inputs[i].name;
      if (input_value === "" || input_value === undefined) {
        document
          .getElementById("valid-" + input_name)
          ?.setAttribute("class", "display-input-validation");
        invalid_inputs++;
      } else {
        document
          .getElementById("valid-" + input_name)
          ?.setAttribute("class", "input-validation");
      }
    }
    return invalid_inputs === 0;
  };
  const createUser = async () => {
    const firstPW = (document.querySelector(".pw1") as HTMLInputElement).value;
    const secondPW = (document.querySelector(".pw2") as HTMLInputElement).value;
    const userName = (document.querySelector(".username") as HTMLInputElement)
      .value;
    const emailAddress = (document.querySelector(".email") as HTMLInputElement)
      .value;
    const fullName = (document.querySelector(".full_name") as HTMLInputElement)
      .value;
    if (!validate_all_fields()) {
      valid_password();
      passwordCheck();
      return;
    }
    const validation = firstPW.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    );
    if (validation === null) {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "display-input-validation");
      return;
    } else {
      document
        .getElementById("valid-password")
        ?.setAttribute("class", "input-validation");
    }
    if (firstPW != secondPW) {
      document
        .getElementById("valid-pw2")
        ?.setAttribute("class", "display-input-validation");
      return;
    } else {
      document
        .getElementById("valid-pw2")
        ?.setAttribute("class", "input-validation");
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
    if (user_res.acknowledged) {
      const user_id = user_res.insertedId;
      const user_cache = await caches.open("user");
      user_cache.put(
        "current",
        await fetch("/api/user/add", {
          method: "POST",
          body: JSON.stringify({
            username: userName,
            password: firstPW,
            full_name: fullName,
          }),
        })
      );
      dispatch(
        loginUser({
          id: user_id,
          full_name: fullName,
          admin: false,
          editor: false,
        })
      );
      router.push("/");
    } else {
      alert(
        `there was a network error while logging into your account \n\n ${user_res.error}`
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
          name="username"
          className="username"
          placeholder="username_example_01"
          onBlur={validate_field}
        />
        <label className="input-validation" id="valid-username">
          Username is Required
        </label>
        <label className="input-label">Email Address</label>
        <input
          type="email"
          name="email"
          className="email"
          placeholder="example@email.com"
          onBlur={validate_field}
        />
        <label className="input-validation" id="valid-email">
          Email is Required
        </label>
        <label className="input-label">Full Name</label>
        <input
          type="text"
          name="full_name"
          className="full_name"
          placeholder="First Name Last Name"
          onBlur={validate_field}
        />
        <label className="input-validation" id="valid-full_name">
          Full Name is Required
        </label>
        <label className="input-label">Password</label>
        <input
          type="text"
          name="password"
          className="pw1"
          placeholder="*********"
          onBlur={valid_password}
        />
        <label className="input-validation" id="valid-password">
          Password must be eight characters long, contain an uppercase,
          lowercase, and numeric character
        </label>
        <label className="input-label">Confirm Password</label>
        <input
          type="text"
          name="pw2"
          className="pw2"
          onBlur={passwordCheck}
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
