import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let params = req.query;
  const { db } = await connectToDatabase();
  let client_pid = params?.client_pid;
  const response = await db.collection("baseline").findOne({ PID: client_pid });
  const { client_name } = response.demographics;
  res.json({ client_name });
}
