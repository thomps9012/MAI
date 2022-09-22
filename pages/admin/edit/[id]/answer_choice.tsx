import Link from "next/link";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ answer_id, answer_choice }: { answer_choice: any, answer_id: string }) {
    const saveEdits = async (item_id: string) => {

    }
    return <main className="container">
        <h1>Current Answer Choices</h1>
        <Link href="/admin/add/answer_choice">Add New Answer Option</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const answer_choice = await db.collection('answers').findOne({ _id: ctx.params.id })
    return {
        props: {
            answer_choice: answer_choice ? JSON.parse(JSON.stringify(answer_choice)) : {},
            answer_id: ctx.params.id ? ctx.params.id : ""
        }
    }
}