import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";

export default function ManageUsers({ users, user_editor }: any) {
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
      {users?.map((user: any) => (
        <section key={user._id}>
          <h4>{user.full_name}</h4>
          <Link href={`/admin/users/${user._id}`}>
            <a>
              <h5>Edit User</h5>
            </a>
          </Link>
          <p>{user.username}</p>
          <p>{user.admin ? "Admin" : "No Admin Capabilities"}</p>
          <p>{user.editor ? "Editor" : "No Edit Capabilities"}</p>
        </section>
      ))}
    </main>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const admin_status = req.cookies.user_admin;
  const editor_status = req.cookies.user_editor;
  if (!admin_status) {
    return {
      props: {
        user_admin: false,
        user_editor: false,
        users: [],
      },
    };
  }
  const { db } = await connectToDatabase();
  const users = await db.collection("users").find({}).toArray();
  return {
    props: {
      user_admin: admin_status,
      user_editor: editor_status,
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
