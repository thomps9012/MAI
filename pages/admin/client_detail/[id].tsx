import Link from "next/link";
import { connectToDatabase } from "../../../utils/mongodb";

export default function ClientDetailPage({ baseline_record, testing_only_record, follow_up_record, exit_record, client_PID }: any) {
    return <main className="container">
        <h1>{client_PID} Interviews</h1>
        {baseline_record._id != null && <section className="interview_overview">
            <Link href={`/admin/interview_detail/${baseline_record._id}`}>{baseline_record.type} Interview Detail</Link>
            <h1>{baseline_record.date}</h1>
            <h2>Conducted by {baseline_record.agency}</h2>
        </section>}
        {testing_only_record._id != null && <section className="interview_overview">
            <Link href={`/admin/interview_detail/${testing_only_record._id}`}>{testing_only_record.type} Interview Detail</Link>
            <h1>{testing_only_record.date}</h1>
            <h2>Conducted by {testing_only_record.agency}</h2>
        </section>}
        {follow_up_record._id != null && <section className="interview_overview">
            <Link href={`/admin/interview_detail/${follow_up_record._id}`}>{follow_up_record.type} Interview Detail</Link>
            <h1>{follow_up_record.date}</h1>
            <h2>Conducted by {follow_up_record.agency}</h2>
        </section>}
        {exit_record._id != null && <section className="interview_overview">
            <Link href={`/admin/interview_detail/${exit_record._id}`}>{exit_record.type} Interview Detail</Link>
            <h1>{exit_record.date}</h1>
            <h2>Conducted by {exit_record.agency}</h2>
        </section>}
        <Link href={`/admin/client_detail/edit/${client_PID}`}><a>Edit Client Demographics</a></Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const baseline_record = await db.collection('baseline').findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 })
    const testing_only_record = await db.collection('testing_only').findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 })
    const follow_up_record = await db.collection('follow_up').findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 })
    const exit_record = await db.collection('exit').findOne({ PID: ctx.params.id }, { _id: 1, date: 1, type: 1, agency: 1 })
    return {
        props: {
            baseline_record: baseline_record ? JSON.parse(JSON.stringify(baseline_record)) : {},
            testing_only_record: testing_only_record ? JSON.parse(JSON.stringify(testing_only_record)) : {},
            follow_up_record: follow_up_record ? JSON.parse(JSON.stringify(follow_up_record)) : {},
            exit_record: exit_record ? JSON.parse(JSON.stringify(exit_record)) : {},
            client_PID: ctx.params.id ? ctx.params.id : ""
        }
    }
}