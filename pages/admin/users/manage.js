import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";
import { UserInfo } from "../../../utils/types";
import { getCookie } from "cookies-next";
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user_id = getCookie("user_id", { req, res }) as unknown as string;
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .find({ _id: new ObjectId(user_id) }, { editor: 1, admin: 1 });
  const admin_status = user.admin;
  const editor_status = user.editor;
  if (!admin_status) {
    return {
      props: {
        user_admin: false,
        user_editor: false,
        users: [],
      },
    };
  }
  const users = await db.collection("users").find({}).toArray();
  return {
    props: {
      user_admin: admin_status,
      user_editor: editor_status,
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
export default function ManageUsers({ users, user_editor }) {
  if (!user_editor) {
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
      <h1>User Management</h1>
      {users?.map((user: UserInfo) => {
        const { _id, full_name, username, admin, editor } = user;
        return (
          <section key={JSON.stringify(_id)}>
            <h4>{full_name}</h4>
            <Link href={`/admin/users/${_id}`}>
              <a>
                <h5>Edit User</h5>
              </a>
            </Link>
            <p>{username}</p>
            <p>{admin ? "Admin" : "No Admin Capabilities"}</p>
            <p>{editor ? "Editor" : "No Edit Capabilities"}</p>
          </section>
        );
      })}
    </main>
  );
}
