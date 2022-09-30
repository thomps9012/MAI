import { useRouter } from "next/router"
import { useState } from "react";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../utils/mongodb";

export default function BasePage({ agencies }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const router = useRouter();
    const [new_agency, setNewAgency] = useState("")
    const addNew = async () => {
        const response = await fetch('/api/answers/edit', {
            headers: { 'answer_id': agencies._id },
            body: JSON.stringify({
                type: 'TESTING_AGENCIES',
                choices: [...agencies.choices, new_agency.toUpperCase().split(" ").join("_")]
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
        const answer_cache = await caches.open('answers')
        answer_cache.put('/all', await fetch('/api/answers/all'))
    }
    return <main className="container">
        <h1>Add New Testing Agency</h1>
        <input name='agency' value={new_agency} onChange={(e: any) => setNewAgency(e.target.value)} />
        <a className="button" onClick={addNew}>Add Agency</a>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const agencies = await db.collection('answers').findOne({ type: 'TESTING_AGENCIES' }, { _id: 1, choices: 1 })
    return {
        props: {
            agencies: agencies ? JSON.parse(JSON.stringify(agencies)) : {}
        }
    }
}