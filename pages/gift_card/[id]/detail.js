import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, query, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1 });
  const user_admin = user.admin;
  if (!user_admin) {
    return {
      props: {
        user_admin,
        card_record: {},
      },
    };
  }
  const card_record = await db
    .collection("cards")
    .findOne({ _id: new ObjectId(query.id) });
  console.log(card_record);
  return {
    props: {
      user_admin,
      card_record: JSON.parse(JSON.stringify(card_record)),
    },
  };
}
export default function CardDetailPage({ card_record, user_admin }) {
  const {
    received_date,
    amount,
    interview_id,
    PID,
    type,
    number,
    _id,
    interview_type,
  } = card_record;
  if (!user_admin) {
    return (
      <main className="landing">
        <h1>
          {PID} Received a {type} Card
        </h1>
        <h1>
          For ${amount} on {received_date}
        </h1>
        {number != 0 && <h1>Card Number: {number}</h1>}
      </main>
    );
  }
  return (
    <main className="landing">
      <h1>
        {PID} Received a {type} Card
      </h1>
      <h1>
        For ${amount} on {received_date}
      </h1>
      {number != 0 && <h1>Card Number: {number}</h1>}
      <Link href={`/gift_card/${_id}/edit`}>
        <a>Edit Card Information</a>
      </Link>
      <Link href={`/admin/interview_detail/${interview_type}/${interview_id}`}>
        <a>Interview Detail</a>
      </Link>
    </main>
  );
}
