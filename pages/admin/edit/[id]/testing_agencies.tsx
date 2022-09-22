import Link from "next/link";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ answer_id, agencies }: { agencies: any, answer_id: string }) {
    const saveEdits = async (item_id: string) => {

    }
    return <main className="container">
        <h1>Current Testing Agencies</h1>
        <Link href="/admin/add/testing_agency">Add New Agency</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const agencies = await db.collection('answers').findOne({ _id: ctx.params.id })
    return {
        props: {
            agencies: agencies ? JSON.parse(JSON.stringify(agencies)) : {},
            answer_id: ctx.params.id ? ctx.params.id : ""
        }
    }
}