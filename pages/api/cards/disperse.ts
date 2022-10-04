import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: { body: string; }, res: { json: (arg0: any) => void; }) {
    const { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    const { interview_id, amount, type, received_date, interview_type, card_number, card_id } = data;
    const updated = await db.collection(interview_type).updateOne({ _id: new ObjectId(interview_id) }, { $set: { gift_card_received: true } })
    const response = await db.collection('cards').updateOne({ _id: new ObjectId(card_id) },
        {
            $set: {
                amount: amount,
                type: type,
                received_date: received_date,
                number: card_number
            }
        });
    res.json(response);
}