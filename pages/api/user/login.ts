import { connectToDatabase } from "../../../utils/mongodb";
const bcrypt = require("bcrypt");
export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  const data = JSON.parse(req.body);
  const { email, password, username } = data;
  if (email != null && email != undefined && email != "") {
    const result = await db.collection("users").findOne({ email: email });
    const check_pw = await bcrypt.compare(password, result.password);
    if (!result || !check_pw) {
      res.json({ error: "incorrect login credentials" });
    }
    res.json(result);
  } else if (username != null && username != undefined && username != "") {
    const result = await db.collection("users").findOne({ username: username });
    const check_pw = await bcrypt.compare(password, result.password);
    if (!result || !check_pw) {
      res.json({ error: "incorrect login credentials" });
    }
    res.json(result);
  } else {
    res.json({ error: "incorrect login credentials" });
  }
}
