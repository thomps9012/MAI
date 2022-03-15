import { useEffect, useState } from "react"

export default function Success() {
    const [PID, setPID] = useState('')
    const [interview_type, setInterviewType] = useState('')
    useEffect(() => {
        const interview_info = JSON.parse(sessionStorage.getItem('interview_info') as string)
        const { PID, interview_type } = interview_info;
        setPID(PID)
        setInterviewType(interview_type)
    }, [])
    return (
        <div className="successScreen" style={{marginTop: 100}}>
            <h1>Client {PID} has successfully completed their {interview_type} Interview</h1>
            <br />
            <h1>Thank you for submitting your questionnaire, please show this screen to a testing administrator to receive your Gift Card.</h1>
        </div>
    )
}