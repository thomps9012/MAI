import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../../../utils/mongodb";
import titleCase from "../../../utils/titleCase";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, query, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1 });
  const user_admin = user.admin ? user.admin : false;
  if (!user_admin) {
    return {
      props: {
        user_admin: false,
        card_amounts: {},
        card_record: {},
        card_types: {},
      },
    };
  }
  const card_record = await db
    .collection("cards")
    .findOne({ _id: new ObjectId(query._id) });
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" });
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" });
  return {
    props: {
      user_admin,
      card_record,
      card_amounts,
      card_types,
    },
  };
}

export default function DisperseCardPage({
  card_record,
  card_types,
  card_amounts,
  user_admin,
}) {
  const { interview_type, PID, interview_id, _id } = card_record;
  const router = useRouter();
  const [date] = useState(
    new Intl.DateTimeFormat("en", {
      dateStyle: "short",
    }).format(Date.now())
  );
  const [amount, setAmount] = useState(-1);
  const [type, setType] = useState("");
  const [card_number, setCardNumber] = useState(-1);
  useEffect(() => {
    amount != -1 &&
      type != "" &&
      card_number != -1 &&
      document
        .getElementById("page_submit")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
  }, [amount, type, card_number]);
  const disperseCard = async () => {
    const res = await fetch("/api/cards/disperse", {
      headers: { admin: JSON.stringify(user_admin) },
      method: "POST",
      body: JSON.stringify({
        interview_id: interview_id,
        amount: amount,
        type: type,
        received_date: date,
        interview_type: type,
        card_id: _id,
        card_number: card_number,
      }),
    }).then((response) => response.json());
    res.acknowledged && router.push("/gift_card/records");
  };
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
  return (
    <main className="container">
      <h1>
        Disperse Gift Card for {PID} {titleCase(interview_type)} Interview
      </h1>
      <form>
        <h2>Type</h2>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option hidden value="" disabled>
            Select...
          </option>
          {card_types.choices.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <h2>Amount</h2>
        <select
          name="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        >
          <option hidden value={-1} disabled>
            Select...
          </option>
          <option value={0}>N/A</option>
          {card_amounts.choices.map((option) => (
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
          onChange={(e) => setCardNumber(parseInt(e.target.value))}
        />
        <a className="page_button" id="page_submit" onClick={disperseCard}>
          Disperse Card
        </a>
      </form>
    </main>
  );
}
