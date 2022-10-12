import { connectToDatabase } from "../../../utils/mongodb";
import Cookies from "cookies";
export default async function handler(req: any, res: any) {
  const cookies = new Cookies(req, res);
  const admin_status = cookies.get("user_admin");
  if (!admin_status) {
    res.json({ res: [], status: 401 });
  }
  const { db } = await connectToDatabase();
  const result1 = await db.collection("testing_only").find({}).toArray();
  const result2 = await db.collection("baseline").find({}).toArray();
  const result3 = await db.collection("follow_up").find({}).toArray();
  const result4 = await db.collection("exit").find({}).toArray();
  const result = [...result1, ...result2, ...result3, ...result4];
  res.json(result);
}
