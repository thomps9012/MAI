import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let editor = JSON.parse(req.headers.editor);
  if (!editor) {
    res.json({ res: "Unauthorized", status: 401 });
  } else {
    let data = JSON.parse(req.body);
    const response = await db.collection("answers").insert({ ...data });
    res.json(response);
  }
}
