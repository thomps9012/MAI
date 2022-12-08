import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res){
  let params = req.query;
  const { db } = await connectToDatabase();
  let email = params?.email;
  const duplicate_email = await db
    .collection("users")
    .countDocuments({ email: email });
  duplicate_email > 1 && res.json(true);
  res.json(false);
}
