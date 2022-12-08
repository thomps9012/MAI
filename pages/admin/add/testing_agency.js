import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectToDatabase } from "../../../utils/mongodb";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor: false,
        agencies: {},
      },
    };
  }
  const agencies = await db
    .collection("answers")
    .findOne({ type: "TESTING_AGENCIES" }, { _id: 1, choices: 1 });
  return {
    props: {
      user_editor,
      agencies: agencies ? JSON.parse(JSON.stringify(agencies)) : {},
    },
  };
}

export default function BasePage({ agencies, user_editor }) {
  const router = useRouter();
  const [new_agency, setNewAgency] = useState("");
  const addNew = async () => {
    const response = await fetch("/api/answers/edit", {
      headers: { answer_id: agencies._id, editor: user_editor },
      body: JSON.stringify({
        type: "TESTING_AGENCIES",
        choices: [
          ...agencies.choices,
          new_agency.toUpperCase().split(" ").join("_"),
        ],
      }),
    }).then((res) => res.json());
    response.acknowledged && router.push("/admin/answer_choices");
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
      <h1>Add New Testing Agency</h1>
      <input
        name="agency"
        value={new_agency}
        onChange={(e) => setNewAgency(e.target.value)}
      />
      <a className="button" onClick={addNew}>
        Add Agency
      </a>
    </main>
  );
}
