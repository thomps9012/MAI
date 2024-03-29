import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    let { PID, client_name, adult, agency, type, phone_number, date } = data;
    const response = await db.collection(type).insert({
        gift_card_received: false,
        date: date,
        type: type,
        adult: adult,
        PID: PID,
        agency: agency,
        phone_number: phone_number,
        client_name: client_name
    })
    res.json(response);
}