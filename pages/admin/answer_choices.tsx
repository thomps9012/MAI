import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import titleCase from "../../utils/titleCase";
export async function getServerSideProps({ req, res, ctx }: any) {
  const user_editor = req.cookies.user_editor;
  const user_admin = req.cookies.user_admin;
  return {
    props: {
      user_editor,
      user_admin,
    },
  };
}
export default function AnswersPage({
  user_editor,
  user_admin,
}: {
  user_editor: boolean;
  user_admin: boolean;
}) {
  const { data, error } = useSWR("/api/answers/all", fetcher);
  if (!user_admin) {
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
  if (error)
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  return (
    <main className="container">
      <h1>Edit Answers</h1>
      <h1>
        <Link href="/admin/add/answer_choice">
          <a>Add New Option</a>
        </Link>
      </h1>
      {data?.map((answer: any) => (
        <div className="answer_choice_section" key={answer?._id}>
          <h3>Type - {titleCase(answer.type.split("_").join(" "))}</h3>
          <h3>Choices</h3>
          {answer.choices.map((choice: string) => (
            <p key={choice}>{choice}</p>
          ))}
          {user_editor && (
            <Link href={`/admin/edit/${answer._id}/answer_choice`}>
              Edit Answer
            </Link>
          )}
          <hr />
        </div>
      ))}
    </main>
  );
}
