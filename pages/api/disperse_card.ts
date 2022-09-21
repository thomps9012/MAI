import { connectToDatabase } from '../../utils/mongodb';
import sgMail from '@sendgrid/mail';
import { ObjectId } from 'mongodb';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: { body: string; }, res: { json: (arg0: any) => void; }) {
    const { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    const { interview_id, PID, amount, type, received_date, interview_type, card_number, record_id } = data;
    const msg = {
        // to: 'thomps9012@gmail.com',
        to: 'khill@norainc.org',
        from: 'sthompson@norainc.org',
        subject: `Client ${PID} ${interview_type.toUpperCase()} Interview Gift Card Received`,
        html: `Client ${PID} has received a gift card for their ${interview_type.toUpperCase()} Interview on ${received_date}.
            <br /> 
            Client received a ${type} gift card for $${amount} 
            `
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    } finally {
        const updated = await db.collection(interview_type).updateOne({ _id: new ObjectId(interview_id) }, { $set: { gift_card_received: true } })
        const response = await db.collection('gift_cards').updateOne({ _id: new ObjectId(record_id) },
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
}