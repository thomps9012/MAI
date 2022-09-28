import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { connectToDatabase } from "../../utils/mongodb";

export default function AllClientsPage({ all_clients }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.admin) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const { data: agency_data, error: agency_err } = useSWR('/api/answers/testing_agencies', fetcher)
    if (agency_err) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    const [client_records, setClientRecords] = useState(all_clients);
    const filterByPID = () => {
        const selected_agency = (document.getElementById('agency') as HTMLInputElement)?.value
        const PID_input = (document.getElementById('pid') as HTMLInputElement)?.value
        selected_agency === "" ?
            setClientRecords(all_clients.filter((record: any) => record.PID.includes(PID_input)))
            :
            setClientRecords(all_clients.filter((record: any) => record.PID.includes(selected_agency) && record.PID.split(selected_agency)[1].includes(PID_input)))
    }
    return <main className="container">
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
        </div>
        {client_records.map((client: any) => <div className="client_card">
            <Link href={`/client_detail/${client.PID}`}>
                <a>
                    <h2>{client.PID}</h2>
                    <p> {client.client_name}</p>
                    <p>{client.adult ? "Adult" : "Youth"}</p>
                </a>
            </Link>
            <hr />
        </div>)}
    </main>
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const baseline_clients = await db.collection('baseline').find({}, { PID: 1, client_name: 1, adult: 1 }).toArray()
    const testing_only_clients = await db.collection('testing_only').find({}, { PID: 1, client_name: 1, adult: 1 }).toArray()
    const all_clients = [...baseline_clients, ...testing_only_clients]
    return {
        props: {
            all_clients: JSON.parse(JSON.stringify(all_clients))
        }
    }
}