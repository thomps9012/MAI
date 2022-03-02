import Link from "next/link";
import { useEffect, useState } from "react";

export default function DataReview() {
    const [interviewObj, setInterview] = useState({});
    const [demographicObj, setDemo] = useState({});
    const [behaviorObj, setBehavior] = useState({});
    const [attitudeObj, setAttitude] = useState({});
    const [careObj, setCare] = useState({});
    const [interview_data, setInterviewData] = useState({});
    useEffect(() => {
        const interview_info = JSON.parse(sessionStorage.getItem('interview_info') as string);
        const demographic_info = JSON.parse(sessionStorage.getItem('demographic_info') as string);
        const behavior_info = JSON.parse(sessionStorage.getItem('behavior_info') as string);
        const risk_attitudes = JSON.parse(sessionStorage.getItem('risk_attitudes') as string);
        const care_alliance = JSON.parse(sessionStorage.getItem('care_alliance') as string);
        setDemo(demographic_info);
        setBehavior(behavior_info);
        setAttitude(risk_attitudes);
        setCare(care_alliance);
        setInterview(interview_info)
        setInterviewData({ interview_info, demographic_info, behavior_info, risk_attitudes, care_alliance });
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
                window.location.replace('/success')
            }
        } else {
            alert('Your submission was unsuccessfull \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help.')
        }
    }
    return (
        <div>
            {`<pre> ${JSON.stringify(interviewObj, null, '\t')}</pre>`}
            <Link href='/demographics' passHref>
                Edit Demographic Data Informations
            </Link>
            {`<pre> ${JSON.stringify(demographicObj, null, '\t')}</pre>`}
            <Link href='/behavior' passHref>
                Edit Behavioral Data Information
            </Link>
            {`<pre> ${JSON.stringify(behaviorObj, null, '\t')}</pre>`}
            <Link href='/attitudes' passHref>
                Edit Risk Attitudes Information
            </Link>
            {`<pre> ${JSON.stringify(attitudeObj, null, '\t')}</pre>`}
            <Link href='/careAlliance' passHref>
                Edit Care Alliance Information
            </Link>
            {`<pre> ${JSON.stringify(careObj, null, '\t')}</pre>`}
            <br />
            <button onClick={() => Submit(interview_data, interviewObj)}>Submit Interview Data</button>
        </div>
    )
}