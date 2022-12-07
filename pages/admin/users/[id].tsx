import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectToDatabase } from "../../../utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
export default function EditUser({ user, editor_status }: any) {
  const router = useRouter();
  const [full_name, setFullName] = useState(user.full_name);
  const [username, setUserName] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [admin, setAdmin] = useState(user.admin);
  const [editor, setEditor] = useState(user.editor);
  const [email_exists, setEmailExists] = useState(false);
  const [username_exists, setUserNameExists] = useState(false);
  const check_username = async () => {
    const exists = await fetch(
      `/api/user/username_exists?username=${username}`
    ).then((res) => res.json());
    setUserNameExists(exists);
  };
  const check_email = async () => {
    const exists = await fetch(`/api/user/email_exists?email=${email}`).then(
      (res) => res.json()
    );
    setEmailExists(exists);
  };
  const saveEdits = async () => {
    if (username_exists) {
      alert("username is already taken");
      return;
    }
    if (email_exists) {
      alert("email is already taken");
      return;
    }
    if (password === "") {
      const res = await fetch("/api/user/edit", {
        method: "POST",
        body: JSON.stringify({
          id: user._id,
          full_name: full_name,
          username: username,
          email: email,
          admin: admin,
          editor: editor,
        }),
      }).then((response) => response.json());
      res.acknowledged && router.push("/");
    } else {
      const res = await fetch("/api/user/edit", {
        method: "POST",
        body: JSON.stringify({
          id: user._id,
          full_name: full_name,
          username: username,
          password: password,
          email: email,
          admin: admin,
          editor: editor,
        }),
      }).then((response) => response.json());
      res.acknowledged && router.push("/");
    }
  };
  if (!editor_status && !user) {
    return (
      <main className="landing">
        <h1>You are Unauthorized to View this Page</h1>
        <br />
        or
        <br /> <h1>Not Signed in</h1>
        <hr />
        <Link href="/sign_in">Login</Link>
        <br />
        <Link href="/sign_up">Sign Up</Link>
      </main>
    );
  }
  return (
    <main className="landing">
      <h1>Edit {full_name}</h1>
      <form className="container">
        <p>Full Name</p>
        <input
          type="text"
          name="full_name"
          defaultValue={full_name}
          onChange={(e: any) => setFullName(e.target.value)}
        />
        <p>Username</p>
        <input
          type="text"
          name="username"
          defaultValue={username}
          onChange={(e: any) => setUserName(e.target.value)}
          onInput={check_username}
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          defaultValue={email}
          onChange={(e: any) => setEmail(e.target.value)}
          onInput={check_email}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="New Password..."
          onChange={(e: any) => setPassword(e.target.value)}
        />
        {editor_status && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <h3>Admin</h3>
              <input
                onChange={() => setAdmin(!admin)}
                checked={admin}
                type="checkbox"
                className="checkbox"
                name="admin"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <h3>Editor</h3>
              <input
                onChange={() => setEditor(!editor)}
                checked={editor}
                type="checkbox"
                className="checkbox"
                name="editor"
              />
            </div>
          </>
        )}
        <a className="button" onClick={saveEdits}>
          Save Edits
        </a>
      </form>
    </main>
  );
}

export async function getServerSideProps({
  req,
  res,
  query,
}: {
  req: NextRequest;
  res: NextResponse;
  query: NextApiRequestQuery;
}) {
  const admin_status = req.cookies.user_admin;
  const cookie_user_id = req.cookies.user_id;
  console.log(query);
  const user_id = query.id;
  if (!admin_status && user_id != cookie_user_id) {
    return {
      props: {
        user: {},
      },
    };
  }
  const { db } = await connectToDatabase();
  const user_info = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id as string) });
  console.log(user_info);
  return {
    props: {
      user: JSON.parse(JSON.stringify(user_info)),
      editor_status: user_info.editor,
    },
  };
}
