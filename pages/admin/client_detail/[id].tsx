import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";
import titleCase from "../../../utils/titleCase";

export default function ClientDetailPage({
  baseline_record,
  testing_only_record,
  follow_up_record,
  exit_record,
  client_PID,
  user_admin,
  user_editor,
}: any) {
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
  return (
    <main className="container">
      {user_editor && (
        <Link href={`/admin/client_detail/edit/${client_PID}`}>
          <a>Edit Client Demographics</a>
        </Link>
      )}
      <h1>{client_PID} Interviews</h1>
      {baseline_record._id != null && (
        <section className="interview_overview">
          <h1>{baseline_record.date}</h1>
          <Link href={`/admin/interview_detail/${baseline_record._id}`}>
            <a>
              {titleCase(baseline_record.type.split("_").join(" "))} Interview
              Detail
            </a>
          </Link>
          <h2>Conducted by {baseline_record.agency}</h2>
        </section>
      )}
      {testing_only_record._id != null && (
        <section className="interview_overview">
          <h1>{testing_only_record.date}</h1>
          <Link href={`/admin/interview_detail/${testing_only_record._id}`}>
            <a>
              {titleCase(testing_only_record.type.split("_").join(" "))}{" "}
              Interview Detail
            </a>
          </Link>
          <h2>Conducted by {testing_only_record.agency}</h2>
        </section>
      )}
      {follow_up_record._id != null && (
        <section className="interview_overview">
          <h1>{follow_up_record.date}</h1>
          <Link href={`/admin/interview_detail/${follow_up_record._id}`}>
            <a>
              {titleCase(follow_up_record.type.split("_").join(" "))} Interview
              Detail
            </a>
          </Link>
          <h2>Conducted by {follow_up_record.agency}</h2>
        </section>
      )}
      {exit_record._id != null && (
        <section className="interview_overview">
          <h1>{exit_record.date}</h1>
          <Link href={`/admin/interview_detail/${exit_record._id}`}>
            <a>
              {titleCase(exit_record.type.split("_").join(" "))} Interview
              Detail
            </a>
          </Link>
          <h2>Conducted by {exit_record.agency}</h2>
        </section>
      )}
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const user_admin = req.cookies.user_admin;
  const user_editor = req.cookies.user_editor;
  if (!user_admin) {
    return {
      props: {
        user_admin,
        user_editor,
        baseline_record: {},
        testing_only_record: {},
        follow_up_record: {},
        exit_record: {},
        client_PID: "",
      },
    };
  }
  const baseline_record = await db
    .collection("baseline")
    .findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 });
  const testing_only_record = await db
    .collection("testing_only")
    .findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 });
  const follow_up_record = await db
    .collection("follow_up")
    .findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 });
  const exit_record = await db
    .collection("exit")
    .findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 });
  return {
    props: {
      user_admin,
      user_editor,
      baseline_record: baseline_record
        ? JSON.parse(JSON.stringify(baseline_record))
        : {},
      testing_only_record: testing_only_record
        ? JSON.parse(JSON.stringify(testing_only_record))
        : {},
      follow_up_record: follow_up_record
        ? JSON.parse(JSON.stringify(follow_up_record))
        : {},
      exit_record: exit_record ? JSON.parse(JSON.stringify(exit_record)) : {},
      client_PID: ctx.params.id ? ctx.params.id : "",
    },
  };
}
