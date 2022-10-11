import nodemailer from "nodemailer";
export default async function handler(req: any, res: any) {
  const { email, full_name, location, device } = JSON.parse(req.body);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.GMAIL_PW,
    },
  });
  let msg = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "New MAI App Sign In",
    html: `
        <br />
        Sign in to Account for:
        <hr />
        ${full_name}
        <br />
        <br />
        Location:
        <hr />
        ${location}
        <br />
        <br />
        Device:
        <hr />
        ${device}
        <br />
        <br />
        If this was not you...
        <br />
        Please Reset Your Password
        <br />
        <br />
        If this was you, please ignore this email
        <br />
        <br />
        Sincerely,
        <br />
        The Development Team`,
  });
  msg.accepted.length > 0 && res.json({ res: "Message Succesfully Sent" });
  msg.accepted.length === 0 && res.json({ res: "Message Not Sent" });
}
