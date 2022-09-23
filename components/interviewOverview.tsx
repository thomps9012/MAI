import Link from "next/link";
import titleCase from "../utils/titleCase";

export default function InterviewOverview({ record, type }: { record: any, type: string }) {
    const { _id, PID, date, agency, client_name, adult } = record;
    return <div className="interview_card">
        <h3>{client_name} {titleCase(type.split("_").join(" "))}</h3>
        <Link href={`/admin/interview_detail/${type}/${_id}`}><a>Interview Detail</a></Link>
        <p>Conducted by {agency} on {date}</p>
        <p>{adult ? "Adult" : "Youth"} {PID}</p>
    </div>
}