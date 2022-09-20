import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    const result = await db.collection('answers').find({}).toArray();
    res.json(result);
}