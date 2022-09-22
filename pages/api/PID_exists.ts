import { connectToDatabase } from "../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let params = req.query;
    const { db } = await connectToDatabase();
    let PID = params?.PID;
    const baseline_response = await db.collection('baseline').countDocuments({ PID: PID });
    const testing_only_response = await db.collection('testing_only').countDocuments({ PID: PID });
    baseline_response != 0 && res.json(true)
    testing_only_response != 0 && res.json(true)
    res.json(false)
}