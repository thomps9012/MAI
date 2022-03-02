import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: {body: string;}, res: {json: (arg0: any) => void;}){
    const {db} = await connectToDatabase();
    let data = JSON.parse(req.body);
    const response = await db.collection('adult_baselines').insertOne({gift_card_received: true, ...data});
    res.json(response);
}