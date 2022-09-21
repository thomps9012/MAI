import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";

export default function DataReview() {
    const interview_data = useSelector((state: any) => state.interview)
    const router = useRouter();
    const { data: interview, error: interview_err } = useSWR(`/api/find_interview?record_id=${interview_data.id}&interview_type=${interview_data.type}`, fetcher)
    if (interview_err) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    console.log(interview)
    // const [interviewObj, setInterview] = useState({});
    // const [interview_data, setInterviewData] = useState({});
    // const interview_info = JSON.parse(sessionStorage.getItem('interview_info') as string);

    // const demographic_info = JSON.parse(sessionStorage.getItem('demographic_info') as string);
    // const behavior_info = JSON.parse(sessionStorage.getItem('behavior_info') as string);
    // const risk_attitudes = JSON.parse(sessionStorage.getItem('risk_attitudes') as string);
    // const interviewData: any = { interview_info, demographic_info, behavior_info, risk_attitudes };
    useEffect(() => {

        for (const item in interview) {
            const interviewDiv = document.querySelector('.interview_data') as HTMLElement;
            interviewDiv.innerHTML +=
                `<h3>${item}</h3>
                <pre> ${JSON.stringify(interview[item], null, '\t')}</pre>`
        }
    }, [interview])

    return (
        <div className="dataReview">
            <h2 style={{ textAlign: 'center' }}>Please Review Your Data before Submitting</h2>
            <div className="interview_data"></div>
            <a className='page_button' onClick={() => router.push('/interview/success')}>The Information Above is Correct</a>
        </div>
    )
}
