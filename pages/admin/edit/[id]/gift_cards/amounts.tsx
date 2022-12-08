import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { connectToDatabase } from "../../../../../utils/mongodb";

export default function BasePage({
  answer_id,
  card_amounts,
  user_editor,
}: {
  user_editor: boolean;
  card_amounts: any;
  answer_id: string;
}) {
  const saveEdits = async (item_id: string) => {};
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
      <h1>Current Card Amounts</h1>
      <hr />
      {card_amounts.choices?.map((choice: string) => (
        <input key={choice} defaultValue={choice} />
      ))}
      <a className="button" onClick={() => saveEdits(answer_id)}>
        Save Changes
      </a>
      <Link href="/admin/add/gift_card/amount">Add New Card Amount</Link>
    </main>
  );
}

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
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        card_amounts: {},
        answer_id: "",
      },
    };
  }
  const card_amounts = await db
    .collection("answers")
    .findOne({ _id: query.id });
  return {
    props: {
      user_editor,
      card_amounts: JSON.parse(JSON.stringify(card_amounts)),
      answer_id: query.id,
    },
  };
}
