import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let params = req.query;
  const { db } = await connectToDatabase();
  let username = params?.username;
  const duplicate_username = await db
    .collection("users")
    .countDocuments({ username: username });
  duplicate_username > 1 && res.json(true);
  res.json(false);
}
