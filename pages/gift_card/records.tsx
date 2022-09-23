import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { connectToDatabase } from "../../utils/mongodb";

export default function CardRecordsPage({ card_records }: any) {
    const { data: agency_data, error: agency_err } = useSWR('/api/answers/testing_agencies', fetcher)
    if (agency_err) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    const [gift_card_records, setGiftCards] = useState(card_records);
    const filterByPID = () => {
        const selected_agency = (document.getElementById('agency') as HTMLInputElement)?.value
        const PID_input = (document.getElementById('pid') as HTMLInputElement)?.value
        selected_agency === "" ?
            setGiftCards(card_records.filter((record: any) => record.PID.includes(PID_input)))
            :
            setGiftCards(card_records.filter((record: any) => record.PID.includes(selected_agency) && record.PID.split(selected_agency)[1].includes(PID_input)))
    }
    const filterByDispersed = (e: any) => e.target.value === "" ? setGiftCards(gift_card_records) : setGiftCards(gift_card_records.filter((record: any) => JSON.parse(e.target.value) ? record.received_date != null : record.received_date === null))
    return <main className="container">
        <h1>Gift Card Records</h1>
        <h3>Filters</h3>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
            <div style={{ flexDirection: 'column' }}>
                <h3>Agency</h3>
                <select name='agency' id='agency' onChange={filterByPID} defaultValue="">
                    <option value="">All Agencies</option>
                    {agency_data?.choices.map((agency: string) => <option value={agency === 'AIDS Task Force' ? 'ATF' : agency === 'Care Alliance' ? 'CA' : agency}>{agency}</option>)}
                </select>
            </div>
            <div style={{ flexDirection: 'column' }}>
                <h3>PID</h3>
                <input name='pid' id='pid' type="number" onChange={filterByPID} />
            </div>
            <div style={{ flexDirection: 'column' }}>
                <h3>Dispersed</h3>
                <select onChange={filterByDispersed} defaultValue=''>
                    <option value="">All Records</option>
                    <option value="true">Dispersed</option>
                    <option value="false">Not Dispersed</option>
                </select>
            </div>
        </div>
        {gift_card_records.map((record: any) => <div className="gift_card_card">
            <h1>{record.PID}</h1>
            <h1>{record.date}</h1>
            {record.received_date != null
                ? <Link href={`/gift_card/${record._id}/detail`}><a>Card Detail</a></Link>
                : <Link href={`/gift_card/${record._id}/disperse`}><a>Disperse Card</a></Link>
            }
        </div>)}
    </main>
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const card_records = await db.collection('cards').find({}, { _id: 1, PID: 1, date: 1, received_date: 1 }).toArray();
    return {
        props: {
            card_records: card_records ? JSON.parse(JSON.stringify(card_records)) : []
        }
    }
}