import Link from "next/link";
import titleCase from "../utils/titleCase";

export default function InterviewOverview({ record, type }: { record: any, type: string }) {
    const { _id, PID, date, agency, client_name, adult } = record;
    return <div className="interview_card">
        <Link href={`/admin/interview_detail/${type}/${_id}`}><a>
            <h3>{PID} {titleCase(type.split("_").join(" "))}</h3>
            <p>{client_name}</p>
            <p>{adult ? "Adult" : "Youth"}</p>
            <p>Conducted by {agency} on {date}</p>
        </a></Link>
        <hr />
    </div>
}