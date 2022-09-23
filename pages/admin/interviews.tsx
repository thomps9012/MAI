import InterviewOverview from "../../components/interviewOverview";
import { connectToDatabase } from "../../utils/mongodb";

export default function InterviewRecordsPage({ baseline_records, testing_only_records, follow_up_records, exit_records }: any) {
    return <main className="container">
        <div style={{ display: 'flex', flexDirection: 'column', position: 'sticky', top: '10%', background: 'white', padding: 20, marginBottom: '10%' }}>
            <p>Interview Type</p>
            <div style={{ display: 'flex',  justifyContent: 'space-around', flexDirection: 'row' }}>
                {baseline_records?.length > 0 && <a href="#baseline">Baseline</a>}
                {testing_only_records?.length > 0 && <a href="#testing_only">Testing Only</a>}
                {follow_up_records?.length > 0 && <a href="#follow_up">Follow Ups</a>}
                {exit_records?.length > 0 && <a href="#exit">Exit</a>}
            </div>
        </div>
        {baseline_records?.length > 0 && <section className="interview_overviews">
            <h1 id="baseline">Baseline Interviews</h1>
            <hr />
            {baseline_records.map((record: any) => <InterviewOverview record={record} type={'baseline'} />)}
        </section>}
        {testing_only_records?.length > 0 && <section className="interview_overviews">
            <h1 id="testing_only">Testing Only Interviews</h1>
            <hr />
            {testing_only_records.map((record: any) => <InterviewOverview record={record} type={'testing_only'} />)}
        </section>}
        {follow_up_records?.length > 0 && <section className="interview_overviews">
            <h1 id="follow_up">Follow Up Interviews</h1>
            <hr />
            {follow_up_records.map((record: any) => <InterviewOverview record={record} type={'follow_up'} />)}
        </section>}
        {exit_records?.length > 0 && <section className="interview_overviews">
            <h1 id="exit">Exit Interviews</h1>
            <hr />
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