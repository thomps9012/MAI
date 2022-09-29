import { useRouter } from "next/router"
import { useState } from "react";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ card_amounts }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const router = useRouter();
    const [new_amount, setNewAmount] = useState(0)
    const addNew = async () => {
        const response = await fetch('/api/answers/edit', {
            headers: { 'answer_id': card_amounts._id },
            body: JSON.stringify({
                type: 'CARD_AMOUNTS',
                choices: [...card_amounts.choices, new_amount]
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
    }
    return <main className="container">
        <h1>Add New Gift Card Amount</h1>
        <input name='amount' value={new_amount} onChange={(e: any) => setNewAmount(parseInt(e.target.value))} />
        <a className="button" onClick={addNew}>Add Amount</a>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const card_amounts = await db.collection('answers').findOne({ type: 'CARD_AMOUNTS' }, { _id: 1, choices: 1 })
    return {
        props: {
            card_amounts: card_amounts ? JSON.parse(JSON.stringify(card_amounts)) : {}
        }
    }
}