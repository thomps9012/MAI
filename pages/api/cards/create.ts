import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    let { PID, interview_id } = data;
    const response = await db.collection('cards').insert({
        PID: PID,
        interview_id: new ObjectId(interview_id)
    })
    res.json(response);
}