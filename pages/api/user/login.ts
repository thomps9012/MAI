import { connectToDatabase } from "../../../utils/mongodb";
import Cookies from "cookies";
const bcrypt = require("bcrypt");
export default async function handler(req: any, res: any) {
  const cookies = new Cookies(req, res);
  const { db } = await connectToDatabase();
  const ip_address = await fetch("https://jsonip.com/").then((res) =>
    res.json()
  );
  const login_attempts = cookies.get("login_attempts");
  const data = JSON.parse(req.body);
  if (parseInt(login_attempts as string) > 10) {
    const current_hours = new Date().getHours();
    const result1 = await db.collection("users").updateOne(
      { email: data.email },
      {
        account_locked: true,
        lock_expiration: new Date().setHours(current_hours + 6),
      }
    );
    const result2 = await db.collection("users").updateOne(
      { username: data.username },
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
  cookies.set("current_ip_address", ip_address.ip);
  if (data.email != null && data.email != undefined && data.email != "") {
    const { email, password } = data;
    const result = await db.collection("users").findOne({ email: email });
    if (!result) {
      cookies.set(
        "login_attempts",
        JSON.stringify(parseInt(login_attempts as string) + 1)
      );
      res.json({ error: "incorrect login credentials" });
    }
    const check_pw = await bcrypt.compare(password, result.password);
    if (!check_pw) {
      cookies.set(
        "login_attempts",
        JSON.stringify(parseInt(login_attempts as string) + 1)
      );
      res.json({ error: "incorrect login credentials" });
    }
    if (result && check_pw) {
      cookies.set("login_attempts", "0");
    }
    if (result.account_locked) {
      res.json({
        error:
          "your account has been locked after too many unsuccessful attempts",
      });
    }
    res.json(result);
  }
  if (
    data.username != null &&
    data.username != undefined &&
    data.username != ""
  ) {
    const { username, password } = data;
    const result = await db.collection("users").findOne({ username: username });
    if (!result) {
      res.json({ error: "incorrect login credentials" });
      cookies.set(
        "login_attempts",
        JSON.stringify(parseInt(login_attempts as string) + 1)
      );
    }
    const check_pw = await bcrypt.compare(password, result.password);
    if (!check_pw) {
      cookies.set(
        "login_attempts",
        JSON.stringify(parseInt(login_attempts as string) + 1)
      );
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
      cookies.set("login_attempts", "0");
    }
  } else {
    cookies.set(
      "login_attempts",
      JSON.stringify(parseInt(login_attempts as string) + 1)
    );
    res.json({ error: "incorrect login credentials" });
  }
}
