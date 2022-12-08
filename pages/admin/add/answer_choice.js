import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectToDatabase } from "../../../utils/mongodb";
import { getCookie } from "cookies-next";
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res }) as unknown as string;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  return {
    props: {
      user_editor: user.editor,
    },
  };
}
export default function BasePage({ user_editor }: { user_editor }) {
  const router = useRouter();
  const [answer_type, setAnswerType] = useState("");
  const addNew = async () => {
    const answer_choices = document.getElementsByClassName("answer_choice");
    let choice_arr = [];
    for (let i = 0; i < answer_choices.length; i++) {
      const choice = (answer_choices[i] as HTMLInputElement).value;
      choice != "" && choice_arr.push(choice);
    }
    const response = await fetch("/api/answers/all/add", {
      headers: { editor: JSON.stringify(user_editor) },
      body: JSON.stringify({
        type: answer_type.toUpperCase().split(" ").join("_"),
        choices: choice_arr,
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
      <h1>Add New Answer</h1>
      <h2>Type</h2>
      <span>
        Use the Category for the Question it is Responsible for Answering i.e.
        risk
      </span>
      <input
        name="agency"
        value={answer_type}
        onChange={(e) => setAnswerType(e.target.value)}
      />
      <h2>Choices</h2>
      <span>Add up to five at one time</span>
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <a className="button" onClick={addNew}>
        Add Answer
      </a>
    </main>
  );
}
