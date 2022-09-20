import { useEffect, useState } from "react"
import GenerateID from "../../utils/generate-id";
import StateChecker from "../../utils/stateChecker";
import titleCase from "../../utils/titleCase";
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function InterviewSelect() {
    const { data, error } = useSWR('/api/count_records', fetcher)
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
        PID != '' && document.querySelector('.phone_input')?.setAttribute('style', 'display: flex; flex-direction: column;')
    }, [PID])
    // const interview_info = { date, type, agency, phone_number, PID, client_name }
    // const info_state = { type, agency, phone_number }
    // useEffect(() => {
    //     StateChecker(info_state)
    // }, [info_state])
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
    const handleAdultSelect = (e: any) => {
        const adult = e.target.name;
        console.log('hit')
        adult === 'adult' ? setAdult(true) : setAdult(false);
        document.querySelector('.agency_select')?.setAttribute('style', 'display: flex; flex-direction: column;')
    }
    const handleCategorySelect = (e: any) => {
        const { id } = e.target;
        if (id === 'baseline' || id == 'testing_only') {
            document.querySelector('.pid_input')?.setAttribute('style', 'display: none')
            document.querySelector('.name_input')?.setAttribute('style', 'display: flex; flex-direction: column;')
            const generateId = GenerateID(agency, data);
            setPID(generateId as string)
        } else {
            document.querySelector('.pid_input')?.setAttribute('style', 'display: flex; flex-direction: column;')
            document.querySelector('.name_input')?.setAttribute('style', 'display: none')
        }
    }
    const handleAgencySelect = (e: any) => {
        const { id } = e.target;
        document.querySelector('.interview_select')?.setAttribute('style', 'display: flex; flex-direction: column;')
        setAgency(id)
        //    add in api call to create record
    }
    const validPhoneNumber = (e: any) => {
        if (phone_number.match(/^(\+)?([ 0-9]){10,16}$/g)) {
            document.querySelector('#page_submit')?.setAttribute('style', 'display: flex; flex-direction: column;')

        }
    }
    // const Submit = async (interview_info: any) => {
    //     sessionStorage.setItem('interview_info', JSON.stringify(interview_info))
    //     const { type, agency } = interview_info;
    //     if (confirm(`This is a(n) \n${titleCase(type)} Interview \nwith ${agency} \non ${date}`)) {
    //         window.location.assign('/interview/adult/demographics')
    //     }
    // }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
            <h2>Select Interview Type</h2>
            <br />
            <a className='button' id='adult' onClick={handleAdultSelect}>Adult</a>
            <a className='button' id='youth' onClick={handleAdultSelect}>Youth</a>
            <div className="agency_select">
                <h2>Agency...</h2>
                <br />
                <a className="button" onClick={handleAgencySelect} id="Care Alliance">Care Alliance</a>
                <a className="button" onClick={handleAgencySelect} id="NORA">NORA</a>
                <a className="button" onClick={handleAgencySelect} id="AIDS Task Force">AIDS Task Force</a>
            </div>
            <div className="interview_select">
                <h2>Category...</h2>
                <br />
                <a className="button" onClick={handleCategorySelect} id="testing_only">Testing Only</a>
                <a className="button" onClick={handleCategorySelect} id="baseline">Baseline</a>
                <a className="button" onClick={handleCategorySelect} id="follow_up">Follow Up</a>
                <a className="button" onClick={handleCategorySelect} id="exit">Exit</a>
            </div>
            <div className="pid_input">
                <h2>Enter PID</h2>
                <input
                    type='text'
                    placeholder="PID"
                    onChange={(e: any) => setPID(e.target.value)}
                    onBlur={() => retrieveClientName(PID)}
                />
            </div>
            <div className="name_input">
                <h2>Enter Your First Name</h2>
                <input
                    type='text'
                    placeholder="First Name"
                    onChange={(e: any) => setName(e.target.value)}
                />
            </div>

            <div className="phone_input">
                <h2>Phone Number</h2>
                <input
                    type='text'
                    placeholder="555-555-5555"
                    // add in phone validation here
                    onChange={(e: any) => setPhone(e.target.value)}
                    onBlur={validPhoneNumber}
                />
            </div>
            <a className='button' id="page_submit">Begin Interview</a>
            {/* <a className="page_submit" onClick={() => Submit(interview_info)}>Begin Interview</a> */}
        </div>
    )
}