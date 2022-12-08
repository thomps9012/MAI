import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";
import titleCase from "../../../utils/titleCase";
import { InterviewOverview } from "../../../utils/types";
export async function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const { db } = await connectToDatabase();
  const user_id = req.cookies.user_id;
  const logged_in = req.cookies.logged_in;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1, editor: 1 });
  const user_editor = user.editor;
  const user_admin = user.admin;
  if (!user_admin || !logged_in) {
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
  const client_PID = query.id;
  const baseline_record = await db
    .collection("baseline")
    .findOne({ PID: client_PID }, { _id: 1, date: 1, type: 1, agency: 1 });
  const testing_only_record = await db
    .collection("testing_only")
    .findOne({ PID: client_PID }, { _id: 1, date: 1, type: 1, agency: 1 });
  const follow_up_record = await db
    .collection("follow_up")
    .findOne({ PID: client_PID }, { _id: 1, date: 1, type: 1, agency: 1 });
  const exit_record = await db
    .collection("exit")
    .findOne({ PID: client_PID }, { _id: 1, date: 1, type: 1, agency: 1 });
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
      client_PID: client_PID ? client_PID : "",
    },
  };
}

export default function ClientDetailPage({
  baseline_record,
  testing_only_record,
  follow_up_record,
  exit_record,
  client_PID,
  user_admin,
  user_editor,
  logged_in,
}: {
  baseline_record: InterviewOverview;
  testing_only_record: InterviewOverview;
  follow_up_record: InterviewOverview;
  exit_record: InterviewOverview;
  logged_in: boolean;
  user_admin: boolean;
  user_editor: boolean;
  client_PID: string;
}) {
  if (!user_admin || !logged_in) {
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
  if (!user_editor) {
    return (
      <main className="container">
        {" "}
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
                {titleCase(follow_up_record.type.split("_").join(" "))}{" "}
                Interview Detail
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
  return (
    <main className="container">
      <Link href={`/admin/client_detail/edit/${client_PID}`}>
        <a>Edit Client Demographics</a>
      </Link>
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
