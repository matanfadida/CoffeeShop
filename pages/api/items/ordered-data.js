import { MongoClient, ObjectId } from "mongodb";

async function handlerOrdered(req, res) {
  const data = req.body;

  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  
  const db = client.db();

  if (req.method === "POST") {
    const result = await db.collection("ordered").insertOne(data);
  }

  if (req.method === "DELETE") {
    await db.collection('ordered').deleteMany({ user: data.email });
  }

  res.status(201).json({ message: "Ordered successfully !" });
  client.close();
}

export default handlerOrdered;
