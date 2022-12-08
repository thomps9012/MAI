import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res){
  const { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  const response = await db.collection("questions").insert({ ...data });
  res.json(response);
}
