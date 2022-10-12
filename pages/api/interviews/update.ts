import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  req.headers;
  let editor = JSON.parse(req.headers.editor);
  if (!editor) {
    res.json({ res: "Unauthorized", status: 401 });
  }
  let collection = req.headers.interview_type;
  let section = req.headers.interview_section;
  let record_id = req.headers.record_id;
  const section_info = JSON.parse(req.body);
  // change to a set
  let result;
  switch (section) {
    case "drug_behavior":
      result = await db
        .collection(collection)
        .update(
          { _id: new ObjectId(record_id) },
          { $set: { "behaviors.drug": section_info } }
        );
      res.json(result);
      break;
    case "sexual_behavior":
      result = await db
        .collection(collection)
        .update(
          { _id: new ObjectId(record_id) },
          { $set: { "behaviors.sexual": section_info } }
        );
      res.json(result);
      break;
    default:
      result = await db
        .collection(collection)
        .update(
          { _id: new ObjectId(record_id) },
          { $set: { [section]: section_info } }
        );
      res.json(result);
  }
}
