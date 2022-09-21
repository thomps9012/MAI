import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Success() {
    const interview_data = useSelector((state: any) => state.interview)
    return (
        <div className="successScreen" style={{ marginTop: 100 }}>
            <h1>Client {interview_data.PID} has successfully completed their {interview_data.type} Interview</h1>
            <br />
            <h1>Thank you for submitting your questionnaire, please show this screen to a testing administrator to receive your Gift Card.</h1>
        </div>
    )
}