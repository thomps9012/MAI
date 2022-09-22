import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";

export default function BasePage({ card_amounts, card_types }: any) {
    return <main className="container">
        <h1>Gift Card</h1>
        <h2>Amounts</h2>
        <hr />
        {card_amounts.choices.map((amount: string) => <p>{amount}</p>)}
        <Link href={`/admin/edit/${card_amounts._id}/gift_cards/amounts`}>Edit Amounts</Link>
        <Link href={`/admin/edit/${card_amounts._id}/gift_cards/amounts`}>Add New Amount</Link>
        <h2>Typess</h2>
        {card_types.choices.map((amount: string) => <p>{amount}</p>)}
        <Link href={`/admin/edit/${card_types._id}/gift_cards/amounts`}>Edit Amounts</Link>
        <Link href={`/admin/edit/${card_types._id}/gift_cards/amounts`}>Add New Amount</Link>
        <hr />
    </main>
}
export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const card_amounts = await db.collection('answers').find({ type: "CARD_AMOUNTS" })
    const card_types = await db.collection('answers').find({ type: "CARD_TYPES" })
    return {
        props: {
            card_amounts: card_amounts ? JSON.parse(JSON.stringify(card_amounts)) : [],
            card_types: card_types ? JSON.parse(JSON.stringify(card_types)) : []
        }
    }
}