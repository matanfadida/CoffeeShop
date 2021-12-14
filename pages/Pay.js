import { MongoClient } from "mongodb";
import Cart from "../components/Cart/Cart";

const Pay = () => {
  return <Cart />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("orders");

  const ordersData = await result.find().toArray();
  // console.log(ordersData.filter(data => data._id.toString() === "61b27e82eb61e643cac29fe2"));
  return { props: { a: "a" } };
  // client.close();
  // return { props: {ordersData: ordersData.data[0].map(item => ({
  //     name: item.name,
  //     description: item.description,
  //     image: item.image,
  //     price: item.price,
  //     oldPrice: item.oldPrice,
  //     availability: item.availability,
  //     table: item.table,
  //     category: item.category,
  //     id: item._id.toString(),

  // }))} };
}

export default Pay;
