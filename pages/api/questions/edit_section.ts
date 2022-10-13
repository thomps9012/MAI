import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  let editor = JSON.parse(req.headers.editor as string);
  if (!editor) {
    res.json({ res: "Unauthorized", status: 401 });
  } else {
    let section_name = req.headers.section_name;
    const result = await db
      .collection("questions")
      .update({ section: section_name }, { $set: { section: section_name } });
    res.json(result);
  }
}
