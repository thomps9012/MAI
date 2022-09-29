import { ObjectId } from "mongodb";
import Link from "next/link";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import titleCase from "../../../../../../../utils/titleCase";

export default function EditInterviewPage({ interview_record, adult }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const { type, _id, agency, client_name, PID } = interview_record;
    return <main className="container">
        <h1>Edit {titleCase(type.split("_").join(" "))} Interview</h1>
        <h2>{PID}</h2>
        <h2>{client_name}</h2>
        <h2>Tested by {agency}</h2>
        <h3>Editable Sections</h3>
        <a className="landing-link"><Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/demographics`}>Demographics</Link></a>
        <a className="landing-link"><Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/risk_attitudes`}>Risk Attitudes</Link></a>
        <a className="landing-link"><Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/sexual_behavior`}>Sexual Behaviors</Link></a>
        <a className="landing-link"><Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/drug_behavior`}>Drug Behaviors</Link></a>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    console.log(ctx.params.id)
    const interview_record = await db.collection(ctx.params.type).findOne({ _id: new ObjectId(ctx.params.id as string) }, { _id: 1, type: 1, agency: 1, client_name: 1 })
    return {
        props: {
            interview_record: JSON.parse(JSON.stringify(interview_record)),
            adult: JSON.parse(JSON.stringify(ctx.params.adult))
        }
    }
}