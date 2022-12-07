import { connectToDatabase } from "../../../utils/mongodb";
const bcrypt = require("bcrypt");
const saltRounds = 10;
export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  const { username, password, full_name, email } = JSON.parse(req.body);
  const hashedPW = await bcrypt.hash(password, saltRounds);
  const result = await db.collection("users").insertOne({
    username: username,
    password: hashedPW,
    admin: false,
    email: email,
    full_name: full_name,
    editor: false,
    account_locked: false,
    lock_expiration: new Date(),
  });
  res.json(result);
}
