import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";

export default function DataReview() {
    const interview_data = useSelector((state: any) => state.interview)

    const router = useRouter();
    const { data: interview, error: interview_err } = useSWR(`/api/interviews/find?record_id=${interview_data.id}&interview_type=${interview_data.type}`, fetcher)
    if (interview_err) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    console.log(interview)
    useEffect(() => {

        for (const item in interview) {
            const interviewDiv = document.querySelector('.interview_data') as HTMLElement;
            interviewDiv.innerHTML +=
                `<h3>${item}</h3>
                <pre> ${JSON.stringify(interview[item], null, '\t')}</pre>`
        }
    }, [interview])
    const success = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/cards/create', {
            method: 'POST',
            body: JSON.stringify({
                interview_id: interview_data.id,
                interview_type: interview_data.type,
                PID: interview_data.PID
            })
        }).then(response => response.json())
        res.acknowledged && router.push('/interview/success')
    }
    return (
        <main className="container">
            <h2 style={{ textAlign: 'center' }}>Please Review Your Data before Submitting</h2>
            <div className="interview_data"></div>
            <a className='page_button' onClick={success}>The Information Above is Correct</a>
        </main>
    )
}
