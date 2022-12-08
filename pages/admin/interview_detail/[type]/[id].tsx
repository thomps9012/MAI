import { setCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { connectToDatabase } from "../../../../utils/mongodb";
import titleCase from "../../../../utils/titleCase";
import { InterviewData } from "../../../../utils/types";
export async function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const user_id = req.cookies.user_id;
  const logged_in = req.cookies.logged_in;
  const interview_type = query.type;
  const interview_id = query.id;
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1, editor: 1 });
  const admin_status = user.admin;
  const editor_status = user.editor;
  if (!admin_status || !logged_in) {
    return {
      props: {
        logged_in,
        user_admin: admin_status,
        user_editor: false,
        interview_record: {},
      },
    };
  }
  const interview_record = await db
    .collection(interview_type)
    .findOne({ _id: new ObjectId(interview_id as string) });
  return {
    props: {
      logged_in,
      user_admin: admin_status,
      user_editor: editor_status,
      interview_record: JSON.parse(JSON.stringify(interview_record)),
    },
  };
}
export default function InterviewDetailPage({
  interview_record,
  user_admin,
  user_editor,
  logged_in,
}: {
  user_admin: boolean;
  user_editor: boolean;
  logged_in: boolean;
  interview_record: InterviewData;
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
    phone_number,
    agency,
  } = interview_record;
  setCookie("interview_type", type);
  setCookie("interview_date", date);
  setCookie("testing_agency", agency);
  setCookie("client_PID", PID);
  setCookie("client_phone_number", phone_number);
  setCookie("client_name", client_name);
  setCookie("client_adult", JSON.stringify(adult));
  setCookie("interview_id", _id);
  sessionStorage.setItem("interview_type", type);
  sessionStorage.setItem("interview_date", date);
  sessionStorage.setItem("testing_agency", agency);
  sessionStorage.setItem("client_PID", PID);
  sessionStorage.setItem("client_phone_number", phone_number);
  sessionStorage.setItem("client_name", client_name);
  sessionStorage.setItem("client_adult", JSON.stringify(adult));
  sessionStorage.setItem("interview_id", JSON.stringify(_id));
  if (!user_editor) {
    return (
      <main className="container">
        <h2>{date}</h2>
        <h1>{titleCase(type.split("_").join(" "))} Interview</h1>
        <h3>PID: {PID}</h3>
        <h3>{client_name}</h3>
        <h3> Tested by {agency}</h3>
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
  return (
    <main className="container">
      <h2>{date}</h2>
      <h1>{titleCase(type.split("_").join(" "))} Interview</h1>
      <h3>PID: {PID}</h3>
      <h3>{client_name}</h3>
      <h3> Tested by {agency}</h3>
      <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}`}>
        <a className="page-link">Edit Interview</a>
      </Link>
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
