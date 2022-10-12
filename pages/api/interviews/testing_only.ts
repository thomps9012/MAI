import { connectToDatabase } from "../../../utils/mongodb";
import Cookies from "cookies";
export default async function handler(req: any, res: any) {
  const cookies = new Cookies(req, res);
  const admin_status = cookies.get("user_admin");
  if (!admin_status) {
    res.json({ res: [], status: 401 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection("testing_only").find({}).toArray();
  res.json(result);
}
