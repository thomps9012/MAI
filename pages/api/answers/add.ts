import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  let editor = JSON.parse(req.headers.editor as string);
  if (!editor) {
    res.json({ res: "Unauthorized", status: 401 });
  }
  let data = JSON.parse(req.body);
  const response = await db.collection("answers").insert({ ...data });
  res.json(response);
}
