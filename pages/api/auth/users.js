import { MongoClient } from "mongodb";

async function handlerUsers(req, res) {
  const data = req.body;

  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  
  const db = client.db();

  if(req.method === "PUT"){
      await db.collection('users').updateOne(
      { email: data.user },
      {
        $inc: { count: data.count },
        $currentDate: { lastModified: true }
      }
    );
  }

  res.status(201).json({ message: "Order successfully !" });
  client.close();
}

export default handlerUsers;
