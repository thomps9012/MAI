import { deleteCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import Link from "next/link";
import { connectToDatabase } from "../utils/mongodb";
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const user_id = req.cookies.user_id;
  const logged_in = req.cookies.logged_in;
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1 });
  return {
    logged_in,
    admin: user.admin,
  };
}
export default function BasePage({
  admin,
  logged_in,
}: {
  admin: boolean;
  logged_in: boolean;
}) {
  const clear_data = () => {
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
  if (!admin || !logged_in) {
    return (
      <main className="landing">
        <Link href="/interview">
          <a className="landing-link" onClick={clear_data}>
            Begin New Interview
          </a>
        </Link>
      </main>
    );
  }
  return (
    <main className="landing">
      <Link href="/interview">
        <a className="landing-link" onClick={clear_data}>
          Begin New Interview
        </a>
      </Link>
      <Link href="/gift_card/records">
        <a className="landing-link">Disperse Gift Card</a>
      </Link>
      <Link href="/admin/interviews">
        <a className="landing-link">Review Interviews</a>
      </Link>
      <Link href="/admin/clients">
        <a className="landing-link">Review Clients</a>
      </Link>
    </main>
  );
}
