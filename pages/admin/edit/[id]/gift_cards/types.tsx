import Link from "next/link";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../../utils/mongodb";

export default function BasePage({ answer_id, card_types }: { card_types: any, answer_id: string }) {
    const saveEdits = async (item_id: string) => {

    }
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    return <main className="container">
        <h1>Current Card Types</h1>
        <hr />
        {card_types.choices?.map((choice: string) => <input key={choice} defaultValue={choice} />)}
        <a className="button" onClick={() => saveEdits(answer_id)}>Save Changes</a>
        <Link href="/admin/add/gift_card/type">Add New Card Type</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const card_types = await db.collection('answers').findOne({ _id: ctx.params.id })
    return {
        props: {
            card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : {},
            answer_id: ctx.params.id ? ctx.params.id : ""
        }
    }
}