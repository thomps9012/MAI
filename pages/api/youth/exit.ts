import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: {body: string;}, res: {json: (arg0: any) => void;}){
    const {db} = await connectToDatabase();
    let data = JSON.parse(req.body);
    const response = await db.collection('youth_exits').insertOne({gift_card_received: false, ...data});
    res.json(response);
}