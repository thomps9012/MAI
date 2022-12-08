import { setCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../utils/mongodb";
import titleCase from "../../utils/titleCase";
import { InterviewData } from "../../utils/types";

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const interview_type = req.cookies.interview_type;
  const interview_id = req.cookies.interview_id;
  const user_editor = req.cookies.user_editor;
  const client_PID = req.cookies.client_PID;
  const { db } = await connectToDatabase();
  const interview_data = await db
    .collection(interview_type)
    .findOne({ _id: new ObjectId(interview_id) });
  const gift_card = await db.collection("cards").findOne({
    interview_id: new ObjectId(interview_id as string),
  });
  if (gift_card) {
    setCookie("gift_card_id", gift_card._id, { req, res });
  }
  return {
    props: {
      interview_type,
      interview_id,
      client_PID,
      user_editor,
      interview_data,
      gift_card_exists: gift_card._id ? true : false,
      gift_card_id: gift_card._id,
    },
  };
}

export default function DataReview({
  interview_type,
  interview_id,
  client_PID,
  user_editor,
  interview_data,
  gift_card_exists,
  gift_card_id,
}: {
  gift_card_id: string;
  gift_card_exists: boolean;
  interview_type: string;
  interview_id: string;
  client_PID: string;
  user_editor: boolean;
  interview_data: InterviewData;
}) {
  const router = useRouter();
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
  } = interview_data;
  const success = async (e: any) => {
    e.preventDefault();
    if (gift_card_exists) {
      sessionStorage.setItem("gift_card_id", gift_card_id);
      router.push("/interview/success");
    }
    const res = await fetch("/api/cards/create", {
      method: "POST",
      body: JSON.stringify({
        interview_id,
        interview_type,
        PID: client_PID,
      }),
    }).then((response) => response.json());
    const interviewSMTP = await fetch("/api/interviews/complete", {
      method: "POST",
      body: JSON.stringify({
        interview_date: date,
        interview_type,
        agency,
        PID: client_PID,
        client_phone: phone_number,
        interview_id,
        card_id: res.insertedId,
      }),
    }).then((res) => res.json());
    if (interviewSMTP[0].statusCode != 202)
      alert("error processing email notification of completion");
    res.acknowledged && sessionStorage.setItem("gift_card_id", res.insertedId);
    res.acknowledged && router.push("/interview/success");
  };
  return (
    <main className="container">
      <h2 style={{ textAlign: "center" }}>
        Please Review Your Data before Submitting
      </h2>
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
      <hr />
      <a className="page_button" onClick={success}>
        The Information Above is Correct
      </a>
    </main>
  );
}
