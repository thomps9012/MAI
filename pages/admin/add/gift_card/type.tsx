import { useRouter } from "next/router"
import { useState } from "react";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ card_types }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const router = useRouter();
    const [new_type, setNewCardType] = useState("")
    const addNew = async () => {
        const response = await fetch('/api/answers/edit', {
            headers: { 'answer_id': card_types._id },
            body: JSON.stringify({
                type: 'CARD_TYPES',
                choices: [...card_types.choices, new_type]
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
        const answer_cache = await caches.open('answers')
        answer_cache.put('/all', await fetch('/api/answers/all'))
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