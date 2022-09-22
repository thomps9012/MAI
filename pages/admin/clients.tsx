import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";

export default function AllClientsPage({ all_clients }: any) {
    return <main className="container">
        {all_clients.map((client: any) => <div className="client_card">
            <Link href={`/client_detail/${client.PID}`}>
                <>
                    <h1>{client.client_name}</h1>
                    <h1>{client.adult ? "Adult" : "Youth"}</h1>
                </>
            </Link>
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