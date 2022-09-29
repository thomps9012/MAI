import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let params = req.query;
    const { db } = await connectToDatabase();
    let interview_id = params?.interview_id;
    let interview_type = params?.interview_type;
    const exists = await db.collection('cards').countDocuments({
        interview_id: new ObjectId(interview_id as string),
        interview_type: interview_type
    })
    exists != 0 && res.json(true)
    res.json(false)
}