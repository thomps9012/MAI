import { setCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../../../utils/mongodb";
import titleCase from "../../../../utils/titleCase";

export default function InterviewDetailPage({
  interview_record,
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
  setCookie(
    "interview_data",
    JSON.stringify({
      ...interview_record,
    })
  );
  const {
    type,
    _id,
    adult,
    date,
    PID,
    client_name,
    behaviors,
    demographics,
    risk_attitudes,
    agency,
  } = interview_record;
  return (
    <main className="container">
      <h2>{date}</h2>
      <h1>{titleCase(type.split("_").join(" "))} Interview</h1>
      <h3>PID: {PID}</h3>
      <h3>{client_name}</h3>
      <h3> Tested by {agency}</h3>
      {user_editor && (
        <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}`}>
          <a className="page-link">Edit Interview</a>
        </Link>
      )}
      <h4>Demographics</h4>
      <hr />
      <pre>{JSON.stringify(demographics, null, "\t")}</pre>
      <h4>Drug Behaviors</h4>
      <hr />
      <pre>{JSON.stringify(behaviors.drug, null, "\t")}</pre>
      <h4>Sexual Behaviors</h4>
      <hr />
      <pre>{JSON.stringify(behaviors.sexual, null, "\t")}</pre>
      <h4>Risk Attitudes</h4>
      <hr />
      <pre>{JSON.stringify(risk_attitudes, null, "\t")}</pre>
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const admin_status = req.cookies.user_admin;
  const editor_status = req.cookies.user_editor;
  if (!admin_status) {
    return {
      props: {
        user_admin: false,
        user_editor: false,
        users: [],
      },
    };
  }
  const interview_record = await db
    .collection(ctx.params.type)
    .findOne({ _id: new ObjectId(ctx.params.id as string) });
  return {
    props: {
      user_admin: admin_status,
      user_editor: editor_status,
      interview_record: JSON.parse(JSON.stringify(interview_record)),
    },
  };
}
