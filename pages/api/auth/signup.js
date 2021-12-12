import { MongoClient } from "mongodb";
import { hashPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password, age } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Error" });
    return;
  }

  // const client = connectToDataBase();
  const client = await MongoClient.connect(
    "mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"
  );

  const db = client.db();

  const exsitingUser = await db.collection("users").findOne({ email: email });

  if (exsitingUser) {
    res.status(422).json({ message: "Email exists already!" });
    client.close();
    return;
  }

  const hashedPassword = hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    age: age,
  });

  res.status(201).json({ message: "Create user !" });
  client.close();
}

export default handler;
