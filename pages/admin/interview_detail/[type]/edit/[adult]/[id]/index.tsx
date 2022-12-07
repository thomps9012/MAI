import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import titleCase from "../../../../../../../utils/titleCase";

export default function EditInterviewPage({
  interview_record,
  adult,
  user_editor,
}: any) {
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
  const { type, _id, agency, client_name, PID } = interview_record;
  return (
    <main className="container">
      <h1>Edit {titleCase(type.split("_").join(" "))} Interview</h1>
      <h2>{PID}</h2>
      <h2>{client_name}</h2>
      <h2>Tested by {agency}</h2>
      <h3>Editable Sections</h3>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/demographics`}
        >
          Demographics
        </Link>
      </a>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/risk_attitudes`}
        >
          Risk Attitudes
        </Link>
      </a>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/sexual_behavior`}
        >
          Sexual Behaviors
        </Link>
      </a>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/drug_behavior`}
        >
          Drug Behaviors
        </Link>
      </a>
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const user_editor = req.cookies.user_editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        interview_record: {},
        adult: false,
      },
    };
  }
  const interview_record = await db
    .collection(ctx.params.type)
    .findOne(
      { _id: new ObjectId(ctx.params.id as string) },
      { _id: 1, type: 1, agency: 1, client_name: 1 }
    );
  return {
    props: {
      user_editor,
      interview_record: JSON.parse(JSON.stringify(interview_record)),
      adult: JSON.parse(JSON.stringify(ctx.params.adult)),
    },
  };
}
