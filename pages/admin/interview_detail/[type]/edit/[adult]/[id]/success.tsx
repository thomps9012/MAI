import { ObjectId } from "mongodb";
import Link from "next/link";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../../../../utils/mongodb";

export default function EditInterviewPage({ interview_record, gift_card }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.user?.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1><br />or<br /> <h1>Not Signed in</h1><hr /><Link href='/sign_in'>Login</Link><br/><Link href='/sign_up'>Sign Up</Link>
        </main>
    }
    const { type, _id, adult } = interview_record;
    return <main className="container">
        <h1>Edits Succesful!</h1>
        <hr />
        <a className='landing-link' onClick={() => sessionStorage.clear()}><Link href={`/admin/interview_detail/${type}/${_id}`}>Review Interview</Link></a>
        <a className='landing-link' onClick={() => sessionStorage.clear()}><Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}`}>Make More Edits</Link></a>
        <a className='landing-link' onClick={() => sessionStorage.clear()}><Link href={`/gift_card/${gift_card._id}/disperse`}>Disperse Card</Link></a>
        <a className='landing-link' onClick={() => sessionStorage.clear()}><Link href={`/admin/interviews`}>Review Interviews</Link></a>
        <a className='landing-link' onClick={() => sessionStorage.clear()}><Link href={`/admin/clients`}>Review Clients</Link></a>
        <a className='landing-link' onClick={() => sessionStorage.clear()}><Link href={`/gift_card/records`}>Review Gift Cards</Link></a>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const interview_record = await db.collection(ctx.params.type).findOne({ _id: new ObjectId(ctx.params.id as string) }, { _id: 1, adult: 1, type: 1 })
    const gift_card = await db.collection('cards').findOne({ interview_id: new ObjectId(ctx.params.id) }, { _id: 1 })
    return {
        props: {
            interview_record: JSON.parse(JSON.stringify(interview_record)),
            gift_card: JSON.parse(JSON.stringify(gift_card))
        }
    }
}