import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../../../utils/mongodb";
import { getCookie } from "cookies-next";
export default function BasePage({ section_name, user_editor }) {
  const router = useRouter();
  const saveEdits = async () => {
    const response = await fetch("/api/questions/edit_section", {
      headers: {
        section_name: document.getElementById("section_name")?.value,
        editor: JSON.stringify(user_editor),
      },
    }).then((res) => res.json());
    response.acknowledged && router.push("/admin/questions");
  };
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
    <main className="container">
      <h1>Current Interview Section</h1>
      <input defaultValue={section_name} id="section_name" />
      <span>
        *** Warning this will update all questions within the section ***
      </span>
      <a className="button" onClick={saveEdits}>
        Save Changes
      </a>
      <p> -- or --</p>
      <Link href="/admin/add/interview_section">Add New Interview Section</Link>
    </main>
  );
}

export async function getServerSideProps({ req, query, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        section_name: "",
      },
    };
  }
  return {
    props: {
      user_editor,
      section_name: query.id,
    },
  };
}
