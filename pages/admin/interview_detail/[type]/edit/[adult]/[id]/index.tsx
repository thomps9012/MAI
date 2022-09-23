import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import titleCase from "../../../../../../../utils/titleCase";

export default function EditInterviewPage({ interview_record, adult }: any) {
    const { type, _id, agency, client_name } = interview_record;
    return <main className="container">
        <h1>Edit {titleCase(type)} Interview</h1>
        <h2>{client_name}</h2>
        <h2>Tested by {agency}</h2>
        <h1>Sections</h1>
        <hr />
        <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/demographics`}><a>Demographics</a></Link>
        <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/risk_attitudes`}><a>Risk Attitudes</a></Link>
        <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/sexual_behavior`}><a>Sexual Behaviors</a></Link>
        <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}/drug_behavior`}><a>Drug Behaviors</a></Link>
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