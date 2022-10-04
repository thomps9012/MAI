import { ObjectId } from "mongodb";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setInterviewID, setInterviewType, setInterviewAgency, setInterviewDate, setClientPID, setClientName } from "../../../../utils/interviewReducer";
import { connectToDatabase } from "../../../../utils/mongodb";
import titleCase from "../../../../utils/titleCase";

export default function InterviewDetailPage({ interview_record }: any) {
    const dispatch = useDispatch();
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.user?.admin) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1><br />or<br /> <h1>Not Signed in</h1><hr /><Link href='/sign_in'>Login</Link><br/><Link href='/sign_up'>Sign Up</Link>
        </main>
    }
    dispatch(setInterviewID(interview_record._id))
    dispatch(setInterviewType(interview_record.type))
    dispatch(setInterviewAgency(interview_record.agency))
    dispatch(setInterviewDate(interview_record.date))
    dispatch(setClientPID(interview_record.PID))
    dispatch(setClientName(interview_record.client_name))
    const { type, _id, adult, date, PID, client_name, behaviors, demographics, risk_attitudes, agency } = interview_record
    return <main className="container">
        <h2>{date}</h2>
        <h1>{titleCase(type.split("_").join(" "))} Interview</h1>
        <h3>PID: {PID}</h3>
        <h3>{client_name}</h3>
        <h3> Tested by {agency}</h3>
        {user_data.editor && <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}`}><a className="page-link">Edit Interview</a></Link>}
        <h4>Demographics</h4>
        <hr />
        <pre>{JSON.stringify(demographics, null, '\t')}</pre>
        <h4>Drug Behaviors</h4>
        <hr />
        <pre>{JSON.stringify(behaviors.drug, null, '\t')}</pre>
        <h4>Sexual Behaviors</h4>
        <hr />
        <pre>{JSON.stringify(behaviors.sexual, null, '\t')}</pre>
        <h4>Risk Attitudes</h4>
        <hr />
        <pre>{JSON.stringify(risk_attitudes, null, '\t')}</pre>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const interview_record = await db.collection(ctx.params.type).findOne({ _id: new ObjectId(ctx.params.id as string) })
    return {
        props: {
            interview_record: JSON.parse(JSON.stringify(interview_record))
        }
    }
}