import { setCookie, getCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../utils/mongodb";
import titleCase from "../../utils/titleCase";

export async function getServerSideProps({ req, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  const interview_type = getCookie("interview_type", { req, res });
  const interview_id = getCookie("interview_id", { req, res });
  const client_PID = getCookie("client_PID", { req, res });
  const interview_data = await db
    .collection(interview_type)
    .findOne({ _id: new ObjectId(interview_id) });
  const gift_card = await db.collection("cards").findOne({
    interview_id: new ObjectId(interview_id),
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
    agency,
  } = interview_data;
  const success = async (e) => {
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
    res.acknowledged && sessionStorage.setItem("gift_card_id", res.insertedId);
    res.acknowledged && router.push("/interview/success");
  };
  if (!user_editor) {
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
      <hr />
      <a className="page_button" onClick={success}>
        The Information Above is Correct
      </a>
    </main>
  );
}
