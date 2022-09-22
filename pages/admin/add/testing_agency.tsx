import { useRouter } from "next/router"
import { useState } from "react";
import { connectToDatabase } from "../../../utils/mongodb";

export default function BasePage({ agencies }: any) {
    const router = useRouter();
    const [new_agency, setNewAgency] = useState("")
    const addNew = async () => {
        const response = await fetch('/api/edit_answer', {
            headers: { 'answer_id': agencies._id },
            body: JSON.stringify({
                type: 'TESTING_AGENCIES',
                choices: [...agencies.choices, new_agency.toUpperCase().split(" ").join("_")]
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
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