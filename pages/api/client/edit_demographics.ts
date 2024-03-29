import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let params = req.query;
    const { db } = await connectToDatabase();
    const data = JSON.parse(req.body);
    const { date_of_birth, client_name, phone_number, adult, PID, agency, gender } = data;
    let record_id = params?.record_id;
    let interview_type = params?.interview_type;
    const response = await db.collection(interview_type).update({ _id: new ObjectId(record_id as string) },
        {
            $set: {
                PID: PID,
                adult: adult,
                agency: agency,
                phone_number: phone_number,
                client_name: client_name,
                "demographics.date_of_birth": date_of_birth,
                "demographics.gender": gender
            }
        });
    res.json({ response });
}