import { MongoClient, ObjectId } from "mongodb";

async function handlerOrder(req, res) {
  const data = req.body;
  console.log(data.id);

  const client = await MongoClient.connect(
    "mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"
  );

  const db = client.db();

  if (req.method === "POST") {
    const result = await db.collection("items").insertOne(data);
  }
  if(req.method === "DELETE"){
    const result = await db.collection('items').deleteOne({ _id: ObjectId(data.id) });
  }
  if(req.method === "PUT"){
    console.log(data);
    const result = await db.collection('items').updateOne(
      { _id: ObjectId(data.id) },
      {
        $set: { oldPrice: data.price, price: data.newPrice },
        $currentDate: { lastModified: true }
      }
    );
  }

  res.status(201).json({ message: "Order successfully !" });
}

export default handlerOrder;
