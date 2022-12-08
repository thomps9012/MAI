import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ card_types, user_editor }: any) {
  const router = useRouter();
  const [new_type, setNewCardType] = useState("");
  const addNew = async () => {
    const response = await fetch("/api/answers/edit", {
      headers: { answer_id: card_types._id },
      body: JSON.stringify({
        type: "CARD_TYPES",
        choices: [...card_types.choices, new_type],
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
      <h1>Add New Gift Card Type</h1>
      <input
        name="agency"
        value={new_type}
        onChange={(e: any) => setNewCardType(e.target.value)}
      />
      <a className="button" onClick={addNew}>
        Add Type
      </a>
    </main>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const { db } = await connectToDatabase();
  const user_id = req.cookies.user_id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        card_types: {},
      },
    };
  }
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" }, { _id: 1, choices: 1 });
  return {
    props: {
      user_editor,
      card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : {},
    },
  };
}
