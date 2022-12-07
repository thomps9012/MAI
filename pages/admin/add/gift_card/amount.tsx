import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ card_amounts, user_editor }: any) {
  const router = useRouter();
  const [new_amount, setNewAmount] = useState(0);
  const addNew = async () => {
    const response = await fetch("/api/answers/edit", {
      headers: { answer_id: card_amounts._id, editor: user_editor },
      body: JSON.stringify({
        type: "CARD_AMOUNTS",
        choices: [...card_amounts.choices, new_amount],
      }),
    }).then((res) => res.json());
    response.acknowledged && router.push("/admin/answer_choices");
    const answer_cache = await caches.open("answers");
    answer_cache.put("/all", await fetch("/api/answers/all"));
  };
  if (!user_editor) {
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
      <h1>Add New Gift Card Amount</h1>
      <input
        name="amount"
        value={new_amount}
        onChange={(e: any) => setNewAmount(parseInt(e.target.value))}
      />
      <a className="button" onClick={addNew}>
        Add Amount
      </a>
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const user_editor = req.cookies.user_editor;
  if (!user_editor) {
    return {
      props: {
        user_editor: false,
        card_amounts: {},
      },
    };
  }
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" }, { _id: 1, choices: 1 });
  return {
    props: {
      user_editor: true,
      card_amounts: card_amounts
        ? JSON.parse(JSON.stringify(card_amounts))
        : {},
    },
  };
}
