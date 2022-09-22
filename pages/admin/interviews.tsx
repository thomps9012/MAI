import InterviewOverview from "../../components/interviewOverview";
import { connectToDatabase } from "../../utils/mongodb";

export default function InterviewRecordsPage({ baseline_records, testing_only_records, follow_up_records, exit_records }: any) {
    return <main className="container">
        {baseline_records?.length > 0 && <section className="interview_overviews">
            <h1>Baseline Interviews</h1>
            {baseline_records.map((record: any) => <InterviewOverview record={record} type={'baseline'} />)}
        </section>}
        {testing_only_records?.length > 0 && <section className="interview_overviews">
            <h1>Testing Only Interviews</h1>
            {testing_only_records.map((record: any) => <InterviewOverview record={record} type={'testing_only'} />)}
        </section>}
        {follow_up_records?.length > 0 && <section className="interview_overviews">
            <h1>Follow Up Interviews</h1>
            {follow_up_records.map((record: any) => <InterviewOverview record={record} type={'follow_up'} />)}
        </section>}
        {exit_records?.length > 0 && <section className="interview_overviews">
            <h1>Exit Interviews</h1>
            {exit_records.map((record: any) => <InterviewOverview record={record} type={'exit'} />)}
        </section>}
    </main>
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const baseline_records = await db.collection('baseline').find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 }).toArray()
    const testing_only_records = await db.collection('testing_only').find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 }).toArray()
    const follow_up_records = await db.collection('follow_up').find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 }).toArray()
    const exit_records = await db.collection('exit').find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 }).toArray()
    return {
        props: {
            baseline_records: baseline_records ? JSON.parse(JSON.stringify(baseline_records)) : [],
            testing_only_records: testing_only_records ? JSON.parse(JSON.stringify(testing_only_records)) : [],
            follow_up_records: follow_up_records ? JSON.parse(JSON.stringify(follow_up_records)) : [],
            exit_records: exit_records ? JSON.parse(JSON.stringify(exit_records)) : []
        }
    }
}