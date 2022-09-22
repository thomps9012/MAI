import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router"
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../utils/mongodb";

export default function CardDetailPage({ card_record }: any) {
    const router = useRouter();
    const user_data = useSelector((state: any) => state.user)
    const { received_date, amount, interview_id, PID, type, number, _id } = card_record;
    return <main className="landing">
        <h1>{PID} Received a {type} Card</h1>
        <h1>For ${amount} on {received_date}</h1>
        {number != 0 && <h1>Card Number: {number}</h1>}
        {user_data.admin && <Link href={`/gift_card/${_id}/edit`}><a>Edit Card Information</a></Link>}
        <Link href={`/admin/interview_detail/${interview_id}`}><a>Interview Detail</a></Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    console.log(ctx.params.id)
    const card_record = await db.collection('cards').findOne({ interview_id: new ObjectId(ctx.params.id as string) })
    return {
        props: {
            card_record: JSON.parse(JSON.stringify(card_record))
        }
    }
}