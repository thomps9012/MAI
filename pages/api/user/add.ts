import { connectToDatabase } from "../../../utils/mongodb";
const bcrypt = require('bcrypt');
const saltRounds = 10;
export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    const { username, password, full_name, email } = JSON.parse(req.body);
    const hashedPW = await bcrypt.hash(password, saltRounds)
    const check_username = await db.collection('users').countDocuments({ username: username })
    if (check_username > 0) {
        res.json({ error: 'username is already taken' })
    }
    const result = await db.collection('users').insertOne({
        username: username,
        password: hashedPW,
        admin: false,
        email: email,
        full_name: full_name,
        editor: false
    })
    res.json(result);
}