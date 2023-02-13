import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { Client_PID } = JSON.parse(req.body);
  const { db } = await connectToDatabase();
  const baseline_response = await db
    .collection("baseline")
    .countDocuments({ PID: Client_PID });
  const testing_only_response = await db
    .collection("testing_only")
    .countDocuments({ PID: Client_PID });
  if (baseline_response != 0 || testing_only_response != 0) {
    res.json(true);
  } else {
    res.json(false);
  }
}
