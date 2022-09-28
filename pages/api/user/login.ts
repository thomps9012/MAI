import { connectToDatabase } from "../../../utils/mongodb";
const bcrypt = require('bcrypt');
const saltRounds = 10;
export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    const { username, password } = JSON.parse(req.body);
    const result = await db.collection('users').findOne({ username: username })
    if (!result) {
        res.json({error: 'no user found with that username'})
    }
    const check_pw = bcrypt.compare(password, result.password)
    !check_pw ? res.json({error: 'incorrect password'}) : res.json(result);
}