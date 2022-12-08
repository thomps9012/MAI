import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let { PID, interview_id, interview_type } = data;
  const response = await db.collection("cards").insertOne({
    PID: PID,
    interview_id: new ObjectId(interview_id),
    interview_type: interview_type,
  });
  res.json(response);
}
