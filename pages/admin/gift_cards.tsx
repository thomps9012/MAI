import Link from "next/link";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../utils/mongodb";

export default function BasePage({ card_amounts, card_types }: any) {
  const user_data = useSelector((state: any) => state.user);
  if (!user_data.user?.admin) {
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
      {user_data.editor && (
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
      {user_data.editor && (
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
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" });
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" });
  return {
    props: {
      card_amounts: card_amounts
        ? JSON.parse(JSON.stringify(card_amounts))
        : [],
      card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : [],
    },
  };
}
