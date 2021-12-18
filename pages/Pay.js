import { MongoClient } from "mongodb";
import Cart from "../components/Cart/Cart";

const Pay = (props) => {
  return <Cart ordersData={props.ordersData} _id={props.id} totalAmount={props.totalAmount} tablesData={props.tablesData} idTable={props.idTable}/>;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const resultOrders = db.collection("orders");

  const ordersData = await resultOrders.find().toArray();

  const resultTables = db.collection("tables");

  const tablesData = await resultTables.find().toArray();
  
  return {
    props: {
      idTable: tablesData[0]._id.toString(),
      tablesData: tablesData.map(table => table.table),
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

export default Pay;
