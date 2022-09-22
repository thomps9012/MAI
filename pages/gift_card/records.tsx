import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";

export default function CardRecordsPage({ card_records }: any) {
    return <main className="container">
        {card_records.map((record: any) => <div className="gift_card_card">
            <h1>{record.PID}</h1>
            <h1>{record.date}</h1>
            <Link href={`/gift_card/${record._id}/detail`}><a>Card Detail</a></Link>
        </div>)}
    </main>
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const card_records = await db.collection('cards').find({}, { _id: 1, PID: 1, date: 1 })
    return {
        props: {
            card_records: JSON.parse(JSON.stringify(card_records))
        }
    }
}