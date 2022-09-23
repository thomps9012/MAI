import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    console.log(req.headers)
    let collection = req.headers.interview_type;
    let section = req.headers.interview_section;
    let record_id = req.headers.record_id;
    const section_info = JSON.parse(req.body);
    // change to a set
    console.log('collection', collection)
    console.log('section', section)
    console.log('section_info', section_info)
    console.log('data obj', { [section]: section_info })
    let result;
    switch (section) {
        case 'drug_behavior':
            result = await db.collection(collection).update({ _id: new ObjectId(record_id) }, { $set: { "behaviors.drug": section_info } })
            console.log(result)
            res.json(result);
            break;
        case 'sexual_behavior':
            result = await db.collection(collection).update({ _id: new ObjectId(record_id) }, { $set: { "behaviors.sexual": section_info } })
            console.log(result)
            res.json(result);
            break;
        default:
            result = await db.collection(collection).update({ _id: new ObjectId(record_id) }, { $set: { [section]: section_info } })
            console.log(result)
            res.json(result);

    }
}