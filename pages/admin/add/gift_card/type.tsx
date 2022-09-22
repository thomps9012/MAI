import { useRouter } from "next/router"
import { useState } from "react";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ card_types }: any) {
    const router = useRouter();
    const [new_type, setNewCardType] = useState("")
    const addNew = async () => {
        const response = await fetch('/api/edit_answer', {
            headers: { 'answer_id': card_types._id },
            body: JSON.stringify({
                type: 'CARD_TYPES',
                choices: [...card_types.choices, new_type]
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
    }
    return <main className="container">
        <h1>Add New Gift Card Type</h1>
        <input name='agency' value={new_type} onChange={(e: any) => setNewCardType(e.target.value)} />
        <a className="button" onClick={addNew}>Add Type</a>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const card_types = await db.collection('answers').findOne({ type: 'CARD_TYPES' }, { _id: 1, choices: 1 })
    return {
        props: {
            card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : {}
        }
    }
}