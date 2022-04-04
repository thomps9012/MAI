import { connectToDatabase } from "../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let params = req.query;
    const { db } = await connectToDatabase();
    let client_pid = params?.client_pid;
    console.log(client_pid)
    const response = await db.collection('adult_baseline').findOne({ 'interview_info.PID': client_pid });
    const { first_name } = response.interview_info;
    console.log(first_name)
    res.json({ first_name });
}