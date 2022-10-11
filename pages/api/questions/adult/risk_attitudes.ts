import { connectToDatabase } from "../../../../utils/mongodb";

export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("questions")
    .find({ adult: true, section: "risk_attitudes" })
    .toArray();
  res.json(result);
}
