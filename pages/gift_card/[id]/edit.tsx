import { getCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { connectToDatabase } from "../../../utils/mongodb";
import titleCase from "../../../utils/titleCase";
import { AnswerChoice, GiftCardData } from "../../../utils/types";
export async function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const { db } = await connectToDatabase();
  const user_id = req.cookies.user_id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1, editor: 1 });
  const user_admin = user.admin;
  const user_editor = user.editor;
  if (!user_admin) {
    return {
      props: {
        user_admin: false,
        user_editor: false,
        card_amounts: {},
        card_record: {},
        card_types: {},
      },
    };
  }
  const card_record = await db
    .collection("cards")
    .findOne({ _id: new ObjectId(query._id as string) });
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" });
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" });
  return {
    props: {
      user_admin,
      user_editor,
      card_record,
      card_amounts,
      card_types,
    },
  };
}
export default function EditCardPage({
  user_admin,
  user_editor,
  card_record,
  card_amounts,
  card_types,
}: {
  user_admin: boolean;
  user_editor: boolean;
  card_record: GiftCardData;
  card_amounts: AnswerChoice;
  card_types: AnswerChoice;
}) {
  if (!user_admin || !user_editor) {
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
    interview_type,
    PID,
    interview_id,
    _id,
    amount,
    number,
    received_date,
    type,
  } = card_record;
  const router = useRouter();
  const [date, setReceivedDate] = useState(received_date);
  const [card_amount, setAmount] = useState(amount);
  const [card_type, setType] = useState(type);
  const [card_number, setCardNumber] = useState(number);
  const interview_data = JSON.parse(getCookie("interview_data") as string);
  useEffect(() => {
    card_amount != -1 &&
      card_type != "" &&
      card_number != -1 &&
      document
        .getElementById("page_submit")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
  }, [card_amount, card_type, card_number]);
  const disperseCard = async (
    type: string,
    amount: number,
    card_number: number,
    date: string,
    record_id: string
  ) => {
    const res = await fetch("/api/cards/disperse", {
      headers: { admin: JSON.stringify(user_admin) },
      method: "POST",
      body: JSON.stringify({
        interview_id,
        PID,
        amount,
        type: type,
        received_date: date,
        interview_type,
        card_number,
        record_id,
      }),
    }).then((response) => response.json());
    res.acknowledged && router.push("/gift_card/records");
  };
  return (
    <main className="container">
      <h1>
        Edit Gift Card for {PID} {titleCase(interview_type)} Interview
      </h1>
      <form>
        <h2>Received Date</h2>
        <input
          type="date"
          value={date}
          onChange={(e: any) =>
            setReceivedDate(
              new Intl.DateTimeFormat("en", {
                dateStyle: "short",
              }).format(new Date(e.target.value))
            )
          }
        />
        <h2>Type</h2>
        <select
          name="type"
          value={type}
          onChange={(e: any) => setType(e.target.value)}
        >
          <option hidden value="" disabled>
            Select...
          </option>
          {card_types.choices.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <h2>Amount</h2>
        <select
          name="amount"
          value={amount}
          onChange={(e: any) => setAmount(parseInt(e.target.value))}
        >
          <option hidden value={-1} disabled>
            Select...
          </option>
          <option value={0}>N/A</option>
          {card_amounts.choices.map((option: string) => (
            <option key={option} value={option}>
              ${option}
            </option>
          ))}
        </select>
        <h2>Card Number</h2>
        <span>Enter 0 if Tester Distributed</span>
        <br />
        <input
          name="card_number"
          placeholder="************"
          defaultValue={card_number}
          onChange={(e: any) => setCardNumber(parseInt(e.target.value))}
        />
        <a
          className="page_button"
          id="page_submit"
          onClick={() =>
            disperseCard(
              card_type,
              card_amount,
              card_number,
              date,
              JSON.stringify(_id)
            )
          }
        >
          Disperse Card
        </a>
      </form>
    </main>
  );
}
