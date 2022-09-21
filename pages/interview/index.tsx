import { useEffect, useState } from "react"
import GenerateID from "../../utils/generate-id";
// import StateChecker from "../../utils/stateChecker";
import titleCase from "../../utils/titleCase";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setClientName, setClientPID, setInterviewAgency, setInterviewDate, setInterviewID, setInterviewType } from "../../utils/interviewReducer";
import fetcher from "../../utils/fetcher";

export default function InterviewSelect() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data, error } = useSWR('/api/count_records', fetcher)
    if (error) { return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1> }
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
        const adult = e.target.id;
        adult === 'adult' ? setAdult(true) : setAdult(false);
        document.querySelector('.agency_select')?.setAttribute('style', 'display: flex; flex-direction: column;')
    }
    const handleCategorySelect = (e: any) => {
        const { id } = e.target;
        setInterview(id)
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
    }
    const validPhoneNumber = (e: any) => {
        if (phone_number.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g)) {
            document.querySelector('#page_submit')?.setAttribute('style', 'display: flex; flex-direction: column;')
        }
    }
    const Submit = async (type: string, date: string, agency: string, PID: string, phone_number: string, client_name: string, adult: boolean) => {
        if (type === '') { return; }
        if (date === '') { return; }
        if (agency === '') { return; }
        if (PID === '') { return; }
        if (phone_number === '') { return; }
        if (client_name === '') { return; }
        sessionStorage.setItem('interview_type', type)
        sessionStorage.setItem('interview_date', date)
        sessionStorage.setItem('testing_agency', agency)
        sessionStorage.setItem('client_PID', PID)
        sessionStorage.setItem('client_phone_number', phone_number)
        sessionStorage.setItem('client_name', client_name)
        sessionStorage.setItem('client_adult', JSON.stringify(adult))
        dispatch
        const res = await fetch('/api/create_client', {
            method: 'POST',
            body: JSON.stringify({
                type,
                date,
                agency,
                PID,
                phone_number,
                client_name,
                adult
            })
        }).then(response => response.json())
        if (res.acknowledged) {
            sessionStorage.setItem('interview_id', res.insertedIds[0])
            dispatch(setInterviewID(res.insertedIds[0]))
            dispatch(setInterviewType(type))
            dispatch(setInterviewAgency(agency))
            dispatch(setInterviewDate(date))
            dispatch(setClientPID(PID))
            dispatch(setClientName(client_name))
            if (confirm(`This is a(n) \n\n ${titleCase(type)} Interview \n\n with ${agency} \n\n on ${date}`)) {
                adult ?
                    router.push('/interview/adult/demographics')
                    : router.push('/interview/youth/demographics')
            }
        } else {
            if (confirm('Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help.')) {
                window.location.assign('/')
            }
        }
    }
    return (
        <main className="container">
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
                    onChange={(e: any) => setPhone(e.target.value)}
                    onBlur={validPhoneNumber}
                />
            </div>
            <a className='page_button' id="page_submit" onClick={() => Submit(
                type,
                date,
                agency,
                PID,
                phone_number,
                client_name,
                adult
            )}>Begin Interview</a>
        </main>
    )
}