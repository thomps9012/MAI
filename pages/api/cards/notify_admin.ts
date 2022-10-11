import nodemailer from "nodemailer";
import titleCase from "../../../utils/titleCase";
export default async function handler(req: any, res: any) {
  const { PID, type, interview_type, amount, card_id, interview_id } =
    JSON.parse(req.body);

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
    subject: `${PID} ${titleCase(
      interview_type.split("_").join(" ")
    )} Gift Card Dispersed`,
    html: `
        <br />
        Client ${PID}
        <br />
        Received ${type} Card
        <hr />
        Amount - ${amount}
        <br />
        <br />
        <a href="https://minority-aids-initiative.vercel.app/admin/interview_detail/${interview_type}/${interview_id}">Link to Interview</a>
        <br />
        <a href="https://minority-aids-initiative.vercel.app/gift_card/${card_id}/detail">Link to Card Information</a>
        <br />
        <a href="https://minority-aids-initiative.vercel.app/admin/client_detail/${PID}">Link to Client</a>
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
