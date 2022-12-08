import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../../../utils/mongodb";
import { getCookie } from "cookies-next";
export default function BasePage({
  answer_id,
  answer_choice,
  user_editor,
}: {
  user_editor;
  answer_choice;
  answer_id: string;
}) {
  const router = useRouter();
  const saveEdits = async () => {
    const answer_choices = document.getElementsByClassName("answer_choice");
    let choice_arr = [];
    for (let i = 0; i < answer_choices.length; i++) {
      const choice = (answer_choices[i] as HTMLInputElement).value;
      choice != "" && choice_arr.push(choice);
    }
    const response = await fetch("/api/answers/edit", {
      headers: { answer_id: answer_id, editor: JSON.stringify(user_editor) },
      body: JSON.stringify({
        type: answer_choice.type,
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
      <h1>Current Answer Choices</h1>
      {answer_choice.choices.map((choice: string) => (
        <input className="answer_choice" key={choice} defaultValue={choice} />
      ))}
      <h1>New Choices</h1>
      <span>Add Up to Five in One Update</span>
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <a className="button" onClick={saveEdits}>
        Save Changes
      </a>
      <Link href="/admin/add/answer_choice">Add New Answer Option</Link>
    </main>
  );
}

export async function getServerSideProps({
  req,
  query,
  res,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
  res: NextApiResponse;
}) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res }) as unknown as string;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        answer_choice: "",
        answer_id: "",
      },
    };
  }
  const answer_choice = await db
    .collection("answers")
    .findOne({ _id: query.id });
  return {
    props: {
      user_editor,
      answer_choice: JSON.parse(JSON.stringify(answer_choice)),
      answer_id: query.id,
    },
  };
}
