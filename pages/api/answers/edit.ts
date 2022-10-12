import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  let answer_id = req.headers.answer_id;
  let editor = JSON.parse(req.headers.editor as string)
  if (!editor) {
    res.json({ res: "Unauthorized", status: 401 });
  }
  const answer_data = JSON.parse(req.body);
  const result = await db
    .collection("answers")
    .findOneAndReplace({ _id: new ObjectId(answer_id) }, { ...answer_data });
  res.json(result);
}
