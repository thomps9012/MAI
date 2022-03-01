import { useEffect, useState } from "react"
import GenerateID from "../utils/generate-id";

export default function InterviewSelect() {
    const [interview_date] = useState(new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
    }).format(Date.now()));
    const [interview_type, setInterview] = useState('');
    const [testing_agency, setAgency] = useState('');
    const [PID, setPID] = useState('')
    useEffect(() => {
        const generateId = GenerateID(testing_agency);
        setPID(generateId)
    }, [testing_agency])
    const interview_info = { interview_date, interview_type, testing_agency }

    const Submit = async (interview_info: any) => {
        sessionStorage.setItem('interview_info', JSON.stringify(interview_info))
        if (confirm(`Your Identification Number is \n ${PID}`)) {
            window.location.replace('/demographics')
        }
    }

    return (
        <div>
            <label>Select Interview Type</label>
            <select onChange={(e: any) => { setInterview(e.target.value) }}>
                <option>Baseline</option>
                <option>Exit</option>
                <option>Follow-up</option>
                <option>Testing Services Only</option>
            </select>
            <label>Testing Agency</label>
            <select onChange={(e: any) => { setAgency(e.target.value) }}>
                <option>Care Alliance</option>
                <option>NORA</option>
                <option>Task Force</option>
            </select>
            <button onClick={() => Submit(interview_info)}>Begin Interview</button>
        </div>
    )
}