import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let params = req.query;
  const { db } = await connectToDatabase();
  let record_id = params?.record_id as string;
  let interview_type = params?.interview_type;
  const response = await db
    .collection(interview_type)
    .findOne({ _id: new ObjectId(record_id) });
  res.json(response);
}
