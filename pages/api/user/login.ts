import { connectToDatabase } from "../../../utils/mongodb";
import { setCookie } from "cookies-next";
const bcrypt = require("bcrypt");
export default async function handler(req: any, res: any) {
  const { db } = await connectToDatabase();
  const ip_address = await fetch("https://jsonip.com/").then((res) =>
    res.json()
  );
  const data = JSON.parse(req.body);
  const { login_attempts, email, password, username } = data;
  console.log(data);
  setCookie("current_ip_address", ip_address.ip);
  console.log(ip_address.ip)
  if (login_attempts >= 10) {
    const current_hours = new Date().getHours();
    const result1 = await db.collection("users").updateOne(
      { email: email },
      {
        account_locked: true,
        lock_expiration: new Date().setHours(current_hours + 6),
      }
    );
    const result2 = await db.collection("users").updateOne(
      { username: username },
      {
        account_locked: true,
        lock_expiration: new Date().setHours(current_hours + 6),
      }
    );
    if (result1 || result2) {
      res.json({
        error:
          "too many unsuccessful login attempts, your account has been locked for six hours",
      });
    }
  }
  if (email != null && email != undefined && email != "") {
    const result = await db.collection("users").findOne({ email: email });
    if (!result) {
      setCookie("login_attempts", login_attempts + 1, {
        req,
        res,
      });
      res.json({ error: "incorrect login credentials" });
    }
    const check_pw = await bcrypt.compare(password, result.password);
    if (!check_pw) {
      setCookie("login_attempts", login_attempts + 1, {
        req,
        res,
      });
      res.json({ error: "incorrect login credentials" });
    }
    if (result && check_pw) {
      setCookie("login_attempts", 0);
    }
    if (result.account_locked) {
      res.json({
        error:
          "your account has been locked after too many unsuccessful attempts",
      });
    }
    res.json(result);
  } else if (username != null && username != undefined && username != "") {
    const result = await db.collection("users").findOne({ username: username });
    console.log(result);
    if (!result) {
      res.json({ error: "incorrect login credentials" });
      setCookie("login_attempts", JSON.stringify(login_attempts + 1), {
        req,
        res,
      });
    }
    const check_pw = await bcrypt.compare(password, result.password);
    if (!check_pw) {
      setCookie("login_attempts", login_attempts + 1, {
        req,
        res,
      });
      res.json({ error: "incorrect login credentials" });
    }
    if (result.account_locked) {
      res.json({
        error:
          "your account has been locked after too many unsuccessful attempts",
      });
    }
    res.json(result);
    if (result && check_pw) {
      setCookie("login_attempts", 0);
    }
  } else {
    setCookie("login_attempts", login_attempts + 1, {
      req,
      res,
    });
    res.json({ error: "incorrect login credentials" });
  }
}
