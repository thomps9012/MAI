import titleCase from "../../../utils/titleCase";
import nodemailer from "nodemailer";

export default async function handler(
  req: { body: string },
  res: { json: (arg0: any) => void }
) {
  const {
    interview_date,
    interview_type,
    agency,
    client_phone,
    PID,
    interview_id,
    card_id,
  } = JSON.parse(req.body);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.GMAIL_PW,
    },
  });
  let msg = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${titleCase(
      interview_type.split("_").join(" ")
    )} for Client ${PID}`,
    html: `
        <br />
        ${titleCase(interview_type.split("_").join(" "))} Interview
        <hr />
        <br />
        Conducted on ${interview_date}
        <br />
        <br />
        By - ${agency}
        <br />
        <br />
        Client Information
        <hr />
        PID - ${PID}
        <br />
        Phone Number - ${client_phone}
        <br />
        <br />
        <a href="https://minority-aids-initiative.vercel.app/admin/interview_detail/${interview_type}/${interview_id}">Link to Interview</a>
        <br />
        <a href="https://minority-aids-initiative.vercel.app/admin/client_detail/${PID}">Link to Client</a>
        <br />
        <a href="https://minority-aids-initiative.vercel.app/gift_card/${card_id}/disperse">Disperse Card</a>
        <br />
        <br />
        Sincerely,
        <br />
        Development Team
        `,
  });
  msg.accepted.length > 0 &&
    res.json({ status: 200, res: "Message Succesfully Sent" });
  msg.accepted.length === 0 &&
    res.json({ status: 400, res: "Message Not Sent" });
}
