import { useEffect, useState } from "react"
import GenerateID from "../../utils/generate-id";
import StateChecker from "../../utils/stateChecker";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import titleCase from "../../utils/titleCase";

export const getServerSideProps: GetServerSideProps = async () => {
    const { db } = await connectToDatabase();

    const collections = ['baseline', 'testing_only']
    let taskForceRecords = 101025;
    let noraRecords = 100;
    let caRecords = 1501;

    for (const item in collections) {
        const taskForceCount = await db.collection(collections[item]).countDocuments({ "agency": "AIDS Task Force" });
        const noraCount = await db.collection(collections[item]).countDocuments({ "agency": "NORA" });
        const caCount = await db.collection(collections[item]).countDocuments({ "agency": "Care Alliance" });
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
    const [date] = useState(new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
    }).format(Date.now()));
    const [type, setInterview] = useState('');
    const [agency, setAgency] = useState('');
    const [PID, setPID] = useState('');
    const [phone_number, setPhone] = useState('');
    const [client_name, setName] = useState('');
    const [adult, setAdult] = useState(false);
    useEffect(() => {
        if (type === 'baseline' || type === 'testing-services-only') {
            const generateId = GenerateID(agency, interviewCounts);
            setPID(generateId as string)
        }
    }, [agency, type])
    const interview_info = { date, type, agency, phone_number, PID, client_name }
    const info_state = { type, agency, phone_number }
    useEffect(() => {
        StateChecker(info_state)
    }, [info_state])
    const retrieveClientName = async (PID: string) => {
        const res = await fetch(`/api/find_name?client_pid=${PID}`, {
            method: 'GET'
        })
        if (res.ok) {
            const data = await res.json();
            const { client_name } = data;
            setName(client_name)
        } else {
            setName('N/A')
        }
    }
    const Submit = async (interview_info: any) => {
        sessionStorage.setItem('interview_info', JSON.stringify(interview_info))
        const { type, agency } = interview_info;
        if (confirm(`This is a(n) \n${titleCase(type)} Interview \nwith ${agency} \non ${date}`)) {
            window.location.assign('/interview/adult/demographics')
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
            {type === 'exit' || type === 'follow-up' ?
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