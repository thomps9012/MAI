import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  let { username, email } = JSON.parse(req.body);
  const duplicate_username = await db
    .collection("users")
    .countDocuments({ username: username });
  duplicate_username > 0 && res.json(true);
  const duplicate_email = await db
    .collection("users")
    .countDocuments({ email: email });
  duplicate_email > 0 && res.json(true);
  res.json(false);
}