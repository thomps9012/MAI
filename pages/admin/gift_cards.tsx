import Link from "next/link";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";

export default function BasePage({
  card_amounts,
  card_types,
  user_admin,
  user_editor,
}: any) {
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
      <h1>Edit Gift Card</h1>
      <h2>Amounts</h2>
      <hr />
      {card_amounts.choices?.map((amount: string) => (
        <p key={amount}>{amount}</p>
      ))}
      {user_editor && (
        <>
          <Link href={`/admin/edit/${card_amounts._id}/gift_cards/amounts`}>
            Edit Amounts
          </Link>
          <Link href={`/admin/edit/${card_amounts._id}/gift_cards/amounts`}>
            Add New Amount
          </Link>
        </>
      )}
      <h2>Types</h2>
      {card_types.choices?.map((amount: string) => (
        <p key={amount}>{amount}</p>
      ))}
      {user_editor && (
        <>
          <Link href={`/admin/edit/${card_types._id}/gift_cards/amounts`}>
            Edit Amounts
          </Link>
          <Link href={`/admin/edit/${card_types._id}/gift_cards/amounts`}>
            Add New Amount
          </Link>
        </>
      )}
      <hr />
    </main>
  );
}
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  const { db } = await connectToDatabase();
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" });
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" });
  const user_admin = req.cookies.user_admin;
  const user_editor = req.cookies.user_editor;
  return {
    props: {
      card_amounts: card_amounts
        ? JSON.parse(JSON.stringify(card_amounts))
        : [],
      card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : [],
      user_admin,
      user_editor,
    },
  };
}
