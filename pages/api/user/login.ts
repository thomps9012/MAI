import { connectToDatabase } from "../../../utils/mongodb";
const bcrypt = require('bcrypt');
export default async function handler(req: any, res: any) {
    const { db } = await connectToDatabase();
    const data = JSON.parse(req.body);
    if (data.email != null && data.email != undefined && data.email != '') {
        const { email, password } = data;
        const result = await db.collection('users').findOne({ email: email })
        if (!result) {
            res.json({ error: 'no user found with that email' })
        }
        const check_pw = await bcrypt.compare(password, result.password)
        if (!check_pw) {
            res.json({ error: 'incorrect password' })
        }
        res.json(result);
    }
    if (data.username != null && data.username != undefined && data.username != '') {
        const { username, password } = data;
        const result = await db.collection('users').findOne({ username: username })
        if (!result) {
            res.json({ error: 'no user found with that username' })
        }
        const check_pw = await bcrypt.compare(password, result.password)
        if (!check_pw) {
            res.json({ error: 'incorrect password' })
        }
        res.json(result);
    }
    else {
        res.json({ error: 'Must enter a username or email' })
    }
}