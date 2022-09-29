import { ObjectId } from "mongodb";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../utils/mongodb";
import titleCase from "../../../utils/titleCase";

export default function EditCardPage({ card_record, card_types, card_amounts }: any) {
    const router = useRouter();
    const [date, setReceivedDate] = useState(card_record.received_date);
    const [amount, setAmount] = useState(card_record.amount)
    const [type, setType] = useState(card_record.type)
    const [card_number, setCardNumber] = useState(card_record.number)
    const interview_data = useSelector((state: any) => state.interview)
    useEffect(() => {
        amount != -1 && type != '' && card_number != -1 && document.getElementById('page_submit')?.setAttribute('style', 'display: flex; flex-direction: column;')
    }, [amount, type])
    const disperseCard = async (type: string, amount: number, card_number: number, date: string, record_id: string) => {
        const res = await fetch('/api/cards/disperse', {
            method: 'POST',
            body: JSON.stringify({
                interview_id: card_record.interview_id,
                PID: card_record.PID,
                amount: amount,
                type: type,
                received_date: date,
                interview_type: interview_data.type,
                card_number: card_number,
                record_id: record_id
            })
        }).then(response => response.json());
        const card_cache = await caches.open('gift_cards');
        const client_cache = await caches.open('client_info');
        client_cache.put(`gift_card: ${card_record.interview_id}`, res);
        card_cache.put(card_record._id, res)
        res.acknowledged && router.push('/gift_card/records')
    }
    return <main className="container">
        <h1>Edit Gift Card for {interview_data.client_name} {titleCase(interview_data.type)} Interview</h1>
        <form>
            <h2>Received Date</h2>
            <input type='date' value={date} onChange={(e: any) => setReceivedDate(
                new Intl.DateTimeFormat('en', {
                    dateStyle: 'short',
                }).format(new Date(e.target.value))
            )} />
            <h2>Type</h2>
            <select name='type' value={type} onChange={(e: any) => setType(e.target.value)}>
                <option hidden value="" disabled>Select...</option>
                {card_types.choices.map((option: any) => <option key={option} value={option}>{option}</option>)}
            </select>
            <h2>Amount</h2>
            <select name='amount' value={amount} onChange={(e: any) => setAmount(parseInt(e.target.value))}>
                <option hidden value={-1} disabled>Select...</option>
                <option value={0}>N/A</option>
                {card_amounts.choices.map((option: any) => <option key={option} value={option}>${option}</option>)}
            </select>
            <h2>Card Number</h2>
            <span>Enter 0 if Tester Distributed</span>
            <br />
            <input name="card_number" placeholder="************" defaultValue={card_number} onChange={(e: any) => setCardNumber(parseInt(e.target.value))} />
            <a className='page_button' id="page_submit" onClick={() => disperseCard(
                type,
                amount,
                card_number,
                date,
                card_record.id
            )}>Disperse Card</a>
        </form>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    console.log(ctx.params.id)
    const card_record = await db.collection('cards').findOne({ _id: new ObjectId(ctx.params.id as string) })
    const card_types = await db.collection('answers').findOne({ type: 'CARD_TYPES' });
    const card_amounts = await db.collection('answers').findOne({ type: 'CARD_AMOUNTS' });
    return {
        props: {
            card_record: JSON.parse(JSON.stringify(card_record)),
            card_types: JSON.parse(JSON.stringify(card_types)),
            card_amounts: JSON.parse(JSON.stringify(card_amounts))
        }
    }
}