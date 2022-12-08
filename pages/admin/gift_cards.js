import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";
import { AnswerChoice } from "../../utils/types";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, res }) {
  const user_id = getCookie("user_id", { req, res });
  const logged_in = getCookie("logged_in", { req, res });
  const { db } = await connectToDatabase();
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" });
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1, admin: 1 });
  return {
    props: {
      card_amounts: card_amounts
        ? JSON.parse(JSON.stringify(card_amounts))
        : [],
      card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : [],
      user_admin: user.admin,
      user_editor: user.editor,
      logged_in,
    },
  };
}
export default function BasePage({
  card_amounts,
  card_types,
  user_admin,
  user_editor,
  logged_in,
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
  if (!user_editor) {
    return (
      <main className="container">
        <h1>Gift Card Amounts</h1>
        <hr />
        {card_amounts.choices?.map((amount) => (
          <p key={amount}>{amount}</p>
        ))}
        <hr />
        <h2>Types</h2>
        {card_types.choices?.map((amount) => (
          <p key={amount}>{amount}</p>
        ))}
      </main>
    );
  }
  return (
    <main className="container">
      <h1>Edit Gift Card</h1>
      <h2>Amounts</h2>
      <hr />
      {card_amounts.choices?.map((amount) => (
        <p key={amount}>{amount}</p>
      ))}
      <Link href={`/admin/edit/${card_amounts._id}/gift_cards/amounts`}>
        Edit Amounts
      </Link>
      <Link href={`/admin/edit/${card_amounts._id}/gift_cards/amounts`}>
        Add New Amount
      </Link>
      <hr />
      <h2>Types</h2>
      {card_types.choices?.map((amount) => (
        <p key={amount}>{amount}</p>
      ))}
      <Link href={`/admin/edit/${card_types._id}/gift_cards/amounts`}>
        Edit Amounts
      </Link>
      <Link href={`/admin/edit/${card_types._id}/gift_cards/amounts`}>
        Add New Amount
      </Link>
    </main>
  );
}
