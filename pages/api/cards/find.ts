import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    let params = req.query;
    const interview_id = params?.interview_id;
    const response = await db.collection('cards').findOne({
        interview_id: new ObjectId(interview_id as string)
    })
    res.json(response);
}