import { MongoClient, ObjectId } from "mongodb";

async function handlerOrder(req, res) {
  const data = req.body;
  console.log(data.id);

  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  
  const db = client.db();

  if (req.method === "POST") {
    const result = await db.collection("orders").insertOne(data);
  }
  if(req.method === "DELETE"){
    const result = await db.collection('orders').deleteOne({ _id: ObjectId(data.id) });
  }
  if(req.method === "PUT"){
    if(data.price){
      await db.collection('orders').updateOne(
      { _id: ObjectId(data.id) },
      {
        $set: { oldPrice: data.price, price: data.newPrice },
        $currentDate: { lastModified: true }
      }
    );
    }else{
      console.log('order')
      console.log(data.user)
      await db.collection('orders').updateOne(
        { _id: ObjectId(data.id.toString()) },
        {
          $set: data,
          $currentDate: { lastModified: true }
        }
      );
    }

    
  }

  res.status(201).json({ message: "Order successfully !" });
  client.close();
}

export default handlerOrder;
