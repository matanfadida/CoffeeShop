import { MongoClient } from "mongodb";
import Barista from "../../components/Baristas/Barista";

const baristas = (props) => {
  return <Barista ordersData={props.ordersData} _id={props.id} totalAmount={props.totalAmount} />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("orders");

  const ordersData = await result.find().toArray();

//   console.log(ordersData.totalAmount);
  client.close();

  return {
    props: {
      totalAmount: ordersData.map((data) => ({
        totalAmount: data.totalAmount,
      })),
      id: ordersData.map((data) => ({ id: data._id.toString() })),
      ordersData: ordersData.map((data) => ({
        data: data.data,
      })),
    },
  };
}

export default baristas;
