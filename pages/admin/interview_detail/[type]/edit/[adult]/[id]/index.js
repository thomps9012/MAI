import { deleteCookie, getCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import titleCase from "../../../../../../../utils/titleCase";
export async function getServerSideProps({ req, query, res }) {
  const { db } = await connectToDatabase();
  const logged_in = getCookie("logged_in", { req, res });
  const user_id = getCookie("user_id", { req, res });
  const interview_type = query.type;
  const client_adult = query.adult;
  const interview_id = query.id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        adult: false,
        logged_in,
        interview_type: "",
        interview_id: "",
        interview_record: {},
      },
    };
  }
  const interview_record = await db
    .collection(interview_type)
    .findOne(
      { _id: new ObjectId(interview_id) },
      { client_name: 1, agency: 1, PID: 1 }
    );
  return {
    props: {
      user_editor,
      adult: JSON.parse(JSON.stringify(client_adult)),
      interview_type,
      interview_id,
      logged_in,
      interview_record,
    },
  };
}
export default function EditInterviewPage({
  user_editor,
  adult,
  interview_type,
  interview_id,
  logged_in,
  interview_record,
}) {
  const clear_interview_data = () => {
    sessionStorage.clear();
    deleteCookie("interview_type");
    deleteCookie("interview_date");
    deleteCookie("testing_agency");
    deleteCookie("client_PID");
    deleteCookie("client_phone_number");
    deleteCookie("client_name");
    deleteCookie("client_adult");
    deleteCookie("interview_id");
    deleteCookie("gift_card_id");
  };
  if (!user_editor || !logged_in) {
    clear_interview_data();
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
  const { client_name, PID, agency } = interview_record;
  return (
    <main className="container">
      <h1>Edit {titleCase(interview_type.split("_").join(" "))} Interview</h1>
      <h2>{PID}</h2>
      <h2>{client_name}</h2>
      <h2>Tested by {agency}</h2>
      <h3>Editable Sections</h3>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${interview_type}/edit/${adult}/${interview_id}/demographics`}
        >
          Demographics
        </Link>
      </a>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${interview_type}/edit/${adult}/${interview_id}/risk_attitudes`}
        >
          Risk Attitudes
        </Link>
      </a>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${interview_type}/edit/${adult}/${interview_id}/sexual_behavior`}
        >
          Sexual Behaviors
        </Link>
      </a>
      <a className="landing-link">
        <Link
          href={`/admin/interview_detail/${interview_type}/edit/${adult}/${interview_id}/drug_behavior`}
        >
          Drug Behaviors
        </Link>
      </a>
    </main>
  );
}
