import Link from "next/link";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../../utils/mongodb";

export default function BasePage({ answer_id, card_amounts }: { card_amounts: any, answer_id: string }) {
    const saveEdits = async (item_id: string) => {

    }
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.user?.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1><br />or<br /> <h1>Not Signed in</h1><hr /><Link href='/sign_in'>Login</Link><br/><Link href='/sign_up'>Sign Up</Link>
        </main>
    }
    return <main className="container">
        <h1>Current Card Amounts</h1>
        <hr />
        {card_amounts.choices?.map((choice: string) => <input key={choice} defaultValue={choice} />)}
        <a className="button" onClick={() => saveEdits(answer_id)}>Save Changes</a>
        <Link href="/admin/add/gift_card/amount">Add New Card Amount</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const card_amounts = await db.collection('answers').findOne({ _id: ctx.params.id })
    return {
        props: {
            card_amounts: card_amounts ? JSON.parse(JSON.stringify(card_amounts)) : {},
            answer_id: ctx.params.id ? ctx.params.id : ""
        }
    }
}