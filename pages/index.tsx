import { useEffect, useState } from "react"
import GenerateID from "../utils/generate-id";
import StateChecker from "../utils/stateChecker";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "../utils/mongodb";

export const getServerSideProps: GetServerSideProps = async () => {
    const { db } = await connectToDatabase();

    const collections = ['adult_baseline', 'adult_testing-services-only', 'youth_baseline', 'youth_testing-services-only']
    let taskForceRecords = 101025;
    let noraRecords = 100;
    let caRecords = 1501;

    for (const item in collections) {
        const taskForceCount = await db.collection(collections[item]).countDocuments({ "interview_info.testing_agency": "AIDS Task Force" });
        const noraCount = await db.collection(collections[item]).countDocuments({ "interview_info.testing_agency": "NORA" });
        const caCount = await db.collection(collections[item]).countDocuments({ "interview_info.testing_agency": "Care Alliance" });
        taskForceRecords += taskForceCount;
        noraRecords += noraCount;
        caRecords += caCount;
    }

    return {
        props: {
            interviewCounts: {
                taskForceRecords, noraRecords, caRecords
            }
        }
    }
};

export default function InterviewSelect(interviewCounts: any) {
    const [interview_date] = useState(new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
    }).format(Date.now()));
    const [interview_type, setInterview] = useState('');
    const [testing_agency, setAgency] = useState('');
    const [PID, setPID] = useState('')
    const [phone_number, setPhone] = useState('')
    const [first_name, setName] = useState('')
    useEffect(() => {
        if (interview_type === 'baseline' || interview_type === 'testing-services-only') {
            const generateId = GenerateID(testing_agency, interviewCounts);
            setPID(generateId as string)
        }
    }, [testing_agency, interview_type])
    const interview_info = { interview_date, interview_type, testing_agency, phone_number, PID, first_name }
    const info_state = { interview_type, testing_agency, phone_number }
    useEffect(() => {
        StateChecker(info_state)
    }, [info_state])
    const retrieveClientName = async (PID: string) => {
        const res = await fetch(`/api/find_name?client_pid=${PID}`, {
            method: 'GET'
        })
        if (res.ok) {
            const data = await res.json();
            const { first_name } = data;
            setName(first_name)
        } else {
            setName('N/A')
        }
    }
    const Submit = async (interview_info: any) => {
        sessionStorage.setItem('interview_info', JSON.stringify(interview_info))
        if (confirm(`Your Identification Number is \n ${PID}`)) {
            window.location.assign('/demographic_info')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className='interviewSelect'>
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
            {interview_type === 'exit' || interview_type === 'follow-up' ?
                <div className="interviewInput">
                    <h2>Enter PID</h2>
                    <input
                        type='text'
                        placeholder="PID"
                        onChange={(e: any) => setPID(e.target.value)}
                        onBlur={() => retrieveClientName(PID)}
                    />
                </div>
                : <div className="interviewInput">
                    <h2>Enter Your First Name</h2>
                    <input
                        type='text'
                        placeholder="First Name"
                        onChange={(e: any) => setName(e.target.value)}
                    />
                </div>
            }
            <div className="interviewInput">
                <h2>Testing Agency</h2>
                <select onChange={(e: any) => setAgency(e.target.value)}>
                    <option>Select Agency ↓</option>
                    <option value='Care Alliance'>Care Alliance</option>
                    <option value='NORA'>Northern Ohio Recovery Association</option>
                    <option value='AIDS Task Force'>AIDS Task Force</option>
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