import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    let header = req.headers.collection;
    let recordID: string = JSON.parse(req.headers.id);
    const recordInfo = JSON.parse(req.body);
    // change to a set
    const result = await db.collection(header).findOneAndReplace({ _id: new ObjectId(recordID) }, { ...recordInfo })
    res.json(result);
}