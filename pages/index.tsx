import { useEffect, useState } from "react"
import GenerateID from "../utils/generate-id";

export default function InterviewSelect() {
    const [interview_date] = useState(new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
    }).format(Date.now()));
    const [interview_type, setInterview] = useState('');
    const [testing_agency, setAgency] = useState('');
    const [PID, setPID] = useState('')
    const [phone_number, setPhone] = useState('')

    useEffect(() => {
        const generateId = GenerateID(testing_agency);
        setPID(generateId)
    }, [testing_agency])
    const interview_info = { interview_date, interview_type, testing_agency, phone_number, PID }

    const Submit = async (interview_info: any) => {
        sessionStorage.setItem('interview_info', JSON.stringify(interview_info))
        if (confirm(`Your Identification Number is \n ${PID}`)) {
            window.location.assign('/demographic_info')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} className='interviewSelect'>
            <div className="interviewInput">
                <h2>Select Interview Type</h2>
                <select onChange={(e: any) => setInterview(e.target.value)}>
                    <option>Select Type  ↓</option>
                    <option value='baseline'>Baseline</option>
                    <option value='exit'>Exit</option>
                    <option value='follow-up'>Follow-up</option>
                    <option value='testing-services-only'>Testing Services Only</option>
                </select>
            </div>
            <div className="interviewInput">
                <h2>Testing Agency</h2>
                <select onChange={(e: any) => setAgency(e.target.value)}>
                    <option>Select Agency ↓</option>
                    <option>Care Alliance</option>
                    <option>NORA</option>
                    <option>Task Force</option>
                </select>
            </div>
            <div className="interviewInput">
                <h2>Phone Number</h2>
                <input
                    type='text'
                    placeholder="555-555-5555"
                    onChange={(e: any) => setPhone(e.target.value)}
                />
            </div>
            <div className="submitBtns">
                <button onClick={() => Submit(interview_info)}>Begin Interview</button>
            </div>
        </div>
    )
}