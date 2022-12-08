import { deleteCookie, getCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";
import titleCase from "../../utils/titleCase";
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const interview_id = getCookie("interview_id", { req, res });
  const gift_card_id = getCookie("gift_card_id", { req, res });
  const interview_type = getCookie("interview_type", { req, res });
  const client_PID = getCookie("client_PID", { req, res });
  const user_id = getCookie("user_id", { req, res }) as unknown as string;
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1 });
  return {
    props: {
      gift_card_id,
      interview_id,
      interview_type,
      client_PID,
      user_admin: user.admin,
    },
  };
}
export default function Success({
  gift_card_id,
  interview_id,
  interview_type,
  client_PID,
  user_admin,
}: {
  interview_id: string;
  interview_type: string;
  client_PID: string;
  user_admin;
  gift_card_id: string;
}) {
  const clear_data = () => {
    sessionStorage.clear();
    deleteCookie("interview_id");
    deleteCookie("interview_type");
    deleteCookie("interview_date");
    deleteCookie("testing_agency");
    deleteCookie("client_PID");
    deleteCookie("client_phone_number");
    deleteCookie("client_name");
    deleteCookie("client_adult");
    deleteCookie("gift_card_id");
  };
  const keep_basic_interview_data = () => {
    sessionStorage.clear();
    deleteCookie("client_phone_number");
    deleteCookie("client_adult");
    deleteCookie("client_name");
  };
  if (!user_admin) {
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
    return (
      <main className="landing">
        <h1>
          Thank you for submitting your questionnaire, please show this screen
          to a testing administrator to receive your Gift Card.
        </h1>
        <br />
        <h1>Your ID Number is: {client_PID}</h1>
      </main>
    );
  }
  return (
    <main>
      <h1>
        Client {client_PID} has successfully completed their{" "}
        {titleCase(interview_type.split("_").join(" "))} Interview
      </h1>
      <br />
      <a className="landing-link" onClick={keep_basic_interview_data}>
        <Link href={`/gift_card/${gift_card_id}/disperse`}>
          Disperse Gift Card
        </Link>
      </a>
      <a className="landing-link" onClick={clear_data}>
        <Link href="/interview">Enter New Interview</Link>
      </a>
      <a className="landing-link" onClick={keep_basic_interview_data}>
        <Link href={`/admin/client_detail/${client_PID}`}>
          <>Review Client {client_PID}</>
        </Link>
      </a>
      <a className="landing-link" onClick={clear_data}>
        <Link href="/admin/clients">Review All Clients</Link>
      </a>
      <a className="landing-link" onClick={keep_basic_interview_data}>
        <Link href={`/interview_detail/${interview_id}`}>
          <>
            Review Client {client_PID}{" "}
            {titleCase(interview_type.split("_").join(" "))} Interview
          </>
        </Link>
      </a>
      <a className="landing-link" onClick={clear_data}>
        <Link href="/admin/interviews">Review All Interviews</Link>
      </a>
    </main>
  );
}
