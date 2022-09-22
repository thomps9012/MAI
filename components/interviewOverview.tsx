import Link from "next/link";
import titleCase from "../utils/titleCase";

export default function InterviewOverview({ record, type }: { record: any, type: string }) {
    const { _id, PID, date, agency, client_name, adult } = record;
    return <div className="interview_card">
        <h1>{client_name} {titleCase(type.split("_").join(" "))} Interview</h1>
        <h2>Conducted by {agency} on {date}</h2>
        <h2>{adult ? "Adult" : "Youth"}</h2>
        <h2>{PID}</h2>
        <Link href={`/admin/interview_detail/${type}/${_id}`}><a>Interview Detail</a></Link>
    </div>
}