import { MongoClient } from "mongodb";

const OrderedId = (props) => {

return <div>a</div>
};

export default OrderedId;

export async function getStaticPaths() {
    const client = await MongoClient.connect(
      "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
  
    const db = client.db();
  
    const result = db.collection("guests");
  
    const guestsIdData = await result.find().toArray();
    console.log(guestsIdData.map(order => order.guests))
  
    return {
      fallback: false,
      paths: guestsIdData.map((order) => ({
        params: { orderedId: order.guests.toString() },
      })),
    };
  }