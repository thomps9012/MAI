import { ObjectId } from "mongodb";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../utils/mongodb";
import titleCase from "../../../utils/titleCase";

export default function BasePage({ card_record, card_types, card_amounts }: any) {
    const router = useRouter();
    const [date] = useState(new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
    }).format(Date.now()));
    const [amount, setAmount] = useState(-1)
    const [type, setType] = useState('')
    const [card_number, setCardNumber] = useState(-1)
    const interview_data = useSelector((state: any) => state.interview)
    useEffect(() => {
        amount != -1 && type != '' && card_number != -1 && document.getElementById('page_submit')?.setAttribute('style', 'display: flex; flex-direction: column;')
    }, [amount, type])
    const disperseCard = async (type: string, amount: number, card_number: number, date: string, record_id: string) => {
        const res = await fetch('/api/disperse_card', {
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
        res.acknowledged && router.push('/gift_card/records')
    }
    return <main className="container">
        <h1>Disperse Gift Card for {interview_data.client_name} {titleCase(interview_data.type)} Interview</h1>
        <form>
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
            <input name="card_number" placeholder="************" onChange={(e: any) => setCardNumber(parseInt(e.target.value))} />
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
    const card_record = await db.collection('cards').findOne({ interview_id: new ObjectId(ctx.params.id as string) })
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