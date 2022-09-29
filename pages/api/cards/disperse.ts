import { connectToDatabase } from '../../../utils/mongodb';
import sgMail from '@sendgrid/mail';
import { ObjectId } from 'mongodb';
import titleCase from '../../../utils/titleCase';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: { body: string; }, res: { json: (arg0: any) => void; }) {
    const { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    const { interview_id, PID, amount, type, received_date, interview_type, card_number, card_id } = data;
    console.log(data)
    const msg = {
        to: 'thomps9012@gmail.com',
        // to: 'khill@norainc.org',
        from: 'sthompson@norainc.org',
        subject: `Client ${PID} ${titleCase(interview_type.split("_").join(" "))} Interview Gift Card Received`,
        html: `Client ${PID} has received a gift card for their ${titleCase(interview_type.split("_").join(" "))} Interview on ${received_date}.
            <br /> 
            Client received a ${type} gift card for $${amount} 
            <br />
            <a href="https://minority-aids-initiative.vercel.app/admin/interview_detail/${interview_type}/${interview_id}">Link to Interview</a>
            <br />
            <a href="https://minority-aids-initiative.vercel.app/gift_card/${card_id}/detail">Link to Card Information</a>
            <br />
            <a href="https://minority-aids-initiative.vercel.app/admin/client_detail/${PID}">Link to Client</a>
            `
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    } finally {
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
}