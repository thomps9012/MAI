import { connectToDatabase } from '../../utils/mongodb';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: { body: string; }, res: { json: (arg0: any) => void; }) {
    const { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    const { interview_date, interview_type, testing_agency, phone_number, PID } = data.interview_info;
    const msg = {
        // to: 'thomps9012@gmail.com',
        to: 'khill@norainc.org',
        from: 'sthompson@norainc.org',
        subject: `New ${interview_type.toUpperCase()} Interview for Client ${PID} on ${interview_date}`,
        html: `${interview_type.toUpperCase()} Interview was conducted on ${interview_date} by ${testing_agency} 
        <br /> 
        Client's Identification Number:
        ${PID}
    <br />
    Phone Number:
    ${phone_number}`
    };
    console.log(msg);
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    } finally {
        const response = await db.collection(`adult_${interview_type}`).insertOne({ gift_card_received: false, ...data });
        res.json(response);
    }

}