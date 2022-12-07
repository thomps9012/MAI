import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";

export default function CardDetailPage({ card_record, user_admin }: any) {
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
  return (
    <main className="landing">
      <h1>
        {PID} Received a {type} Card
      </h1>
      <h1>
        For ${amount} on {received_date}
      </h1>
      {number != 0 && <h1>Card Number: {number}</h1>}
      {user_admin && (
        <Link href={`/gift_card/${_id}/edit`}>
          <a>Edit Card Information</a>
        </Link>
      )}
      {user_admin && (
        <Link
          href={`/admin/interview_detail/${interview_type}/${interview_id}`}
        >
          <a>Interview Detail</a>
        </Link>
      )}
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const user_admin = req.cookies.user_admin;
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
    .findOne({ _id: new ObjectId(ctx.params.id as string) });
  return {
    props: {
      user_admin,
      card_record: JSON.parse(JSON.stringify(card_record)),
    },
  };
}
