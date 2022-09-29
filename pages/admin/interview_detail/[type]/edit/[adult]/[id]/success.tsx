import { ObjectId } from "mongodb";
import Link from "next/link";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../../../../utils/mongodb";

export default function EditInterviewPage({ interview_record, gift_card }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const { type, _id, adult } = interview_record;
    return <main className="container">
        <h1>Edits Succesful!</h1>
        <hr />
        <Link href={`/admin/interview_detail/${type}/${_id}`}>Review Interview</Link>
        <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}`}>Make More Edits</Link>
        <Link href={`/gift_card/${gift_card._id}/disperse`}>Disperse Card</Link>
        <Link href={`/admin/interviews`}>Review Interviews</Link>
        <Link href={`/admin/clients`}>Review Clients</Link>
        <Link href={`/gift_card/records`}>Review Gift Cards</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    console.log(ctx.params.id)
    const interview_record = await db.collection(ctx.params.type).findOne({ _id: new ObjectId(ctx.params.id as string) }, { _id: 1, adult: 1, type: 1 })
    const gift_card = await db.collection('cards').findOne({interview_id: new ObjectId(ctx.params.id)}, {_id: 1})
    return {
        props: {
            interview_record: JSON.parse(JSON.stringify(interview_record)),
            gift_card: JSON.parse(JSON.stringify(gift_card))
        }
    }
}