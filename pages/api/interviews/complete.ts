import sgMail from '@sendgrid/mail';
import titleCase from '../../../utils/titleCase';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: { body: string; }, res: { json: (arg0: any) => void; }) {
    let data = JSON.parse(req.body);
    const { interview_date, interview_type, agency, client_phone, PID, interview_id, card_id } = data;
    const msg = {
        to: 'sthompson@norainc.org',
        // to: 'khill@norainc.org',
        from: process.env.SENDER_EMAIL as string,
        subject: `New ${titleCase(interview_type.split("_").join(" "))} Interview for Client ${PID} on ${interview_date}`,
        html: `${titleCase(interview_type.split("_").join(" "))} Interview was conducted on ${interview_date} by ${agency} 
        <br /> 
        Client's Identification Number:
        ${PID}
        <br />
        <a href="https://minority-aids-initiative.vercel.app/admin/interview_detail/${interview_type}/${interview_id}">Link to Interview</a>
        <br />
        <a href="https://minority-aids-initiative.vercel.app/admin/client_detail/${PID}">Link to Client</a>
        <br />
        <a href="https://minority-aids-initiative.vercel.app/gift_card/${card_id}/disperse">Disperse Card</a>
    <br />
    Phone Number:
    ${client_phone}`
    };
    const emailRes = await sgMail.send(msg);
    console.log(emailRes)
    res.json(emailRes)
}