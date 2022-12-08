import { deleteCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import { GiftCardData } from "../../../../../../../utils/types";
export async function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const { db } = await connectToDatabase();
  const logged_in = req.cookies.logged_in;
  const user_id = req.cookies.user_id;
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
        gift_card: {},
      },
    };
  }
  const gift_card = await db
    .collection("cards")
    .findOne(
      { interview_id: new ObjectId(interview_id as string) },
      { _id: 1 }
    );
  return {
    props: {
      user_editor,
      adult: JSON.parse(JSON.stringify(client_adult)),
      interview_type,
      interview_id,
      logged_in,
      gift_card,
    },
  };
}
export default function EditInterviewPage({
  interview_id,
  adult,
  user_editor,
  interview_type,
  logged_in,
  gift_card,
}: {
  gift_card: GiftCardData;
  interview_type: string;
  interview_id: string;
  logged_in: boolean;
  adult: boolean;
  user_editor: boolean;
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

  return (
    <main className="container">
      <h1>Edits Succesful!</h1>
      <hr />
      <a className="landing-link" onClick={clear_interview_data}>
        <Link
          href={`/admin/interview_detail/${interview_type}/${interview_id}`}
        >
          Review Interview
        </Link>
      </a>
      <a className="landing-link" onClick={clear_interview_data}>
        <Link
          href={`/admin/interview_detail/${interview_type}/edit/${adult}/${interview_id}`}
        >
          Make More Edits
        </Link>
      </a>
      <a className="landing-link" onClick={clear_interview_data}>
        <Link href={`/gift_card/${gift_card._id}/disperse`}>Disperse Card</Link>
      </a>
      <a className="landing-link" onClick={clear_interview_data}>
        <Link href={`/admin/interviews`}>Review Interviews</Link>
      </a>
      <a className="landing-link" onClick={clear_interview_data}>
        <Link href={`/admin/clients`}>Review Clients</Link>
      </a>
      <a className="landing-link" onClick={clear_interview_data}>
        <Link href={`/gift_card/records`}>Review Gift Cards</Link>
      </a>
    </main>
  );
}
