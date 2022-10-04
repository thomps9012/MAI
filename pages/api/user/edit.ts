import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";
const bcrypt = require('bcrypt');
const saltRounds = 10;
export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    const data = JSON.parse(req.body);
    if (data.password) {
        const { password, id, full_name, username, email, admin, editor } = data;
        const hashedPW = await bcrypt.hash(password, saltRounds)
        const result = await db.collection('users').updateOne({ _id: new ObjectId(id) }, {
            $set: {
                username: username,
                full_name: full_name,
                email: email,
                admin: admin,
                editor: editor,
                password: hashedPW
            }
        })
        res.json(result);
    } else {
        const { id, username, full_name, email, admin, editor } = data;
        const result = await db.collection('users').updateOne({ _id: new ObjectId(id) }, {
            $set: {
                username: username,
                full_name: full_name,
                email: email,
                admin: admin,
                editor: editor
            }
        })
        res.json(result);
    }
}