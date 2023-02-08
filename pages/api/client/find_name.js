import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { Client_PID } = JSON.parse(req.body);
  console.log(Client_PID);
  const { db } = await connectToDatabase();
  const response = await db
    .collection("baseline")
    .find({ PID: Client_PID }, { _id: 1, client_name: 1, phone_number: 1, demographics: 0, gift_card_received: 0, date: 0 })
    .toArray();
  console.log(response);
  res.json(response);
}
