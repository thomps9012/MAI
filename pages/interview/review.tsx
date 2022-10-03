import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import titleCase from "../../utils/titleCase";

export default function DataReview() {
    const interview_data = useSelector((state: any) => state.interview)
    const user_data = useSelector((state: any) => state.user)
    const router = useRouter();
    const { data: interview, error: interview_err } = useSWR(`/api/interviews/find?record_id=${interview_data.id}&interview_type=${interview_data.type}`, fetcher)
    if (interview_err || interview === undefined) return <main className="landing"><main className="landing"><h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1></main></main>
    const { type, _id, adult, date, PID, client_name, behaviors, demographics, risk_attitudes, agency } = interview
    const success = async (e: any) => {
        e.preventDefault();
        const gift_card_exists = await fetch(`/api/cards/exists?interview_id=${interview_data.id}&interview_type=${interview_data.type}`)
        if (gift_card_exists) {
            const res = await fetch(`/api/cards/find?interview_id=${interview_data.id}`).then(response => response.json())
            const interview_cache = await caches.open('interviews');
            const card_cache = await caches.open('gift_cards');
            const client_cache = await caches.open('clients')
            client_cache.put(`interview/${interview_data.id}/PID/${interview_data.PID}/type/${interview_data.type}`, await fetch(`/api/interviews/find?record_id=${interview_data.id}&interview_type=${interview_data.type}`))
            client_cache.put(`interview/${interview_data.id}/gift_card/${interview_data.id}`, await fetch(`/api/cards/find?interview_id=${interview_data.id}`))
            interview_cache.put(`${interview_data.id}/type/${interview_data.type}`, await fetch(`/api/interviews/find?record_id=${interview_data.id}&interview_type=${interview_data.type}`))
            card_cache.put(`${interview_data.id}/card_id/${res._id}`, await fetch(`/api/cards/find?interview_id=${interview_data.id}`))
            res.ok && sessionStorage.setItem('interview_id', interview_data.id)
            res.ok && sessionStorage.setItem('gift_card_id', res._id)
            res.ok && router.push('/interview/success')
        } else {
            const res = await fetch('/api/cards/create', {
                method: 'POST',
                body: JSON.stringify({
                    interview_id: interview_data.id,
                    interview_type: interview_data.type,
                    PID: interview_data.PID
                })
            }).then(response => response.json())
            const interview_cache = await caches.open('interviews');
            const card_cache = await caches.open('gift_cards');
            const client_cache = await caches.open('clients')
            client_cache.put(`interview/${interview_data.id}/PID/${interview_data.PID}/type/${interview_data.type}`, await fetch(`/api/interviews/find?record_id=${interview_data.id}&interview_type=${interview_data.type}`))
            client_cache.put(`interview/${interview_data.id}/gift_card/${interview_data.id}`, await fetch(`/api/cards/find?interview_id=${interview_data.id}`))
            interview_cache.put(`${interview_data.id}/type/${interview_data.type}`, await fetch(`/api/interviews/find?record_id=${interview_data.id}&interview_type=${interview_data.type}`))
            card_cache.put(`interview/${interview_data.id}/card_id/${res.insertedId}`, await fetch(`/api/cards/find?interview_id=${interview_data.id}`))
            const interviewSMTP = await fetch('/api/interviews/complete', {
                method: 'POST',
                body: JSON.stringify({
                    interview_date: interview.date,
                    interview_type: interview.type,
                    agency: interview.agency,
                    PID: interview.PID,
                    client_phone: interview.phone_number,
                    interview_id: interview._id,
                    card_id: res.insertedId
                })
            }).then(res => res.json())
            if (interviewSMTP[0].statusCode != 202) alert('error processing email notification of completion')
            res.acknowledged && sessionStorage.setItem('interview_id', interview_data.id)
            res.acknowledged && sessionStorage.setItem('gift_card_id', res.insertedId)
            res.acknowledged && router.push('/interview/success')
        }
    }
    return (
        <main className="container">
            <h2 style={{ textAlign: 'center' }}>Please Review Your Data before Submitting</h2>
            <h2>{date}</h2>
            <h1>{titleCase(type.split("_").join(" "))} Interview</h1>
            <h3>PID: {PID}</h3>
            <h3>{client_name}</h3>
            <h3> Tested by {agency}</h3>
            {user_data.editor && <Link href={`/admin/interview_detail/${type}/edit/${adult}/${_id}`}><a className="page-link">Edit Interview</a></Link>}
            <h4>Demographics</h4>
            <hr />
            <pre>{JSON.stringify(demographics, null, '\t')}</pre>
            <h4>Drug Behaviors</h4>
            <hr />
            <pre>{JSON.stringify(behaviors.drug, null, '\t')}</pre>
            <h4>Sexual Behaviors</h4>
            <hr />
            <pre>{JSON.stringify(behaviors.sexual, null, '\t')}</pre>
            <h4>Risk Attitudes</h4>
            <hr />
            <pre>{JSON.stringify(risk_attitudes, null, '\t')}</pre>
            <hr />
            <a className='page_button' onClick={success}>The Information Above is Correct</a>
        </main>
    )
}
