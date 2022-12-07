import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectToDatabase } from "../../../utils/mongodb";

export default function BasePage({ agencies, user_editor }: any) {
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
    const answer_cache = await caches.open("answers");
    answer_cache.put("/all", await fetch("/api/answers/all"));
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
        onChange={(e: any) => setNewAgency(e.target.value)}
      />
      <a className="button" onClick={addNew}>
        Add Agency
      </a>
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const editor_status = req.cookies.user_editor;
  if (!editor_status) {
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
      user_editor: true,
      agencies: agencies ? JSON.parse(JSON.stringify(agencies)) : {},
    },
  };
}
