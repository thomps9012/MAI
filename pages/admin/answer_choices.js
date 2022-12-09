import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";
import titleCase from "../../utils/titleCase";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, res }) {
  const user_id = getCookie("user_id", { req, res });
  const logged_in = getCookie("logged_in", { req, res });
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1, editor: 1 });
  const answers = await db.collection("answers").find().toArray();
  return {
    logged_in,
    admin: user?.admin ? user.admin : false,
    editor: user?.editor ? user.editor : false,
    answers: JSON.parse(JSON.stringify(answers)),
  };
}
export default function AnswersPage({ logged_in, admin, editor, answers }) {
  if (!admin || !logged_in) {
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
  if (!editor) {
    return (
      <main className="container">
        <h1>View Answers</h1>
        {answers?.map((answer) => (
          <div className="answer_choice_section" key={answer?.type}>
            <h3>Type - {titleCase(answer.type.split("_").join(" "))}</h3>
            <h3>Choices</h3>
            {answer.choices.map((choice) => (
              <p key={choice}>{choice}</p>
            ))}
            <hr />
          </div>
        ))}
      </main>
    );
  }
  return (
    <main className="container">
      <h1>Edit Answers</h1>
      <h1>
        <Link href="/admin/add/answer_choice">
          <a>Add New Option</a>
        </Link>
      </h1>
      {answers?.map((answer) => (
        <div className="answer_choice_section" key={answer?.type}>
          <h3>Type - {titleCase(answer.type.split("_").join(" "))}</h3>
          <h3>Choices</h3>
          {answer.choices.map((choice) => (
            <p key={choice}>{choice}</p>
          ))}
          <Link href={`/admin/edit/${answer._id}/answer_choice`}>
            Edit Answer
          </Link>
          <hr />
        </div>
      ))}
    </main>
  );
}
