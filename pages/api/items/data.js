import { MongoClient, ObjectId } from "mongodb";

async function handlerItem(req, res) {
  const data = req.body;
  console.log(data.id);

  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  if (req.method === "POST") {
    const result = await db.collection("items").insertOne(data);
  }
  if(req.method === "DELETE"){
    const result = await db.collection('items').deleteOne({ _id: ObjectId(data.id) });
  }
  if(req.method === "PUT"){
    if(data.id){
      const result = await db.collection('items').updateOne(
      { _id: ObjectId(data.id) },
      {
        $set: { oldPrice: data.price, price: data.newPrice },
        $currentDate: { lastModified: true }
      }
    );
    }
    else if(data.age >= 18){
      await db.collection('items').updateMany(
        { availability: 'no', category: 'alcohol' },
        {
          $set: { availability: 'yes' },
          $currentDate: { lastModified: true }
        }
      );
    }
    else{
      await db.collection('items').updateMany(
        { availability: 'yes', category: 'alcohol' },
        {
          $set: { availability: 'no' },
          $currentDate: { lastModified: true }
        }
      );
    }
    
  }

  res.status(201).json({ message: "Create item !" });
}

export default handlerItem;
