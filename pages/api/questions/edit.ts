import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  let editor = JSON.parse(req.headers.editor as string);
  if (!editor) {
    res.json({ res: "Unauthorized", status: 401 });
  } else {
    let question_id = req.headers.question_id;
    const question_data = JSON.parse(req.body);
    const result = await db
      .collection("questions")
      .findOneAndReplace(
        { _id: new ObjectId(question_id) },
        { ...question_data }
      );
    res.json(result);
  }
}
