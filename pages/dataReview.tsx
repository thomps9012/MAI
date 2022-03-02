import { useEffect, useState } from "react";

export default function DataReview() {
    const [interviewObj, setInterview] = useState({});
    const [interview_data, setInterviewData] = useState({});
    useEffect(() => {
        const interview_info = JSON.parse(sessionStorage.getItem('interview_info') as string);
        const demographic_info = JSON.parse(sessionStorage.getItem('demographic_info') as string);
        const behavior_info = JSON.parse(sessionStorage.getItem('behavior_info') as string);
        const risk_attitudes = JSON.parse(sessionStorage.getItem('risk_attitudes') as string);
        setInterview(interview_info);
        setInterviewData({ interview_info, demographic_info, behavior_info, risk_attitudes });
        const interviewData: any = { interview_info, demographic_info, behavior_info, risk_attitudes };
        for (const item in interviewData) {
            const interviewDiv = document.querySelector('.interview_data') as HTMLElement;
            interviewDiv.innerHTML +=
                `<h3>${item}</h3>
                <pre> ${JSON.stringify(interviewData[item], null, '\t')}</pre>`
        }
    }, [])
    const Submit = async (interview_data: {}, interviewObj: any) => {
        const { interview_type, PID } = interviewObj;
        const body = JSON.stringify(interview_data);
        const res = await fetch(`/api/adult/${interview_type}`, {
            method: 'POST',
            body: body
        }); if (res.ok) {
            sessionStorage.clear();
            if (confirm(`${PID} is your PID Number \n \n Save this for your records and follow up interviews`)) {
                window.location.assign('/success')
            }
        } else {
            alert('Your submission was unsuccessfull \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help.')
        }
    }
    return (
        <div className="dataReview">
            <h2 style={{textAlign: 'center'}}>Please Review Your Data before Submitting</h2>
            <div className="interview_data"></div>
            <div className="submitBtns">
                <button onClick={() => Submit(interview_data, interviewObj)}>Submit Interview Data</button>
            </div>
        </div>
    )
}