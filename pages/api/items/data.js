import { MongoClient } from "mongodb";

async function handlerItem(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  //   const { name, description, image, price, oldPrice, availability, table, category } = data;

  //   if (
  //     !email ||
  //     !email.includes("@") ||
  //     !password ||
  //     password.trim().length < 7
  //   ) {
  //     res.status(422).json({ message: "Error" });
  //     return;
  //   }

  //   const client = connectToDataBase();
  const client = await MongoClient.connect(
    "mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = await db.collection("items").insertOne(data);

  console.log(result);

  res.status(201).json({ message: "Create item !" });
}

export default handlerItem;
