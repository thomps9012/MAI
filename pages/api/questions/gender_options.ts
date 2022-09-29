import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    const result = await db.collection('answers').findOne({ type: "GENDER" })
    res.json(result);
}