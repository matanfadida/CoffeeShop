import { MongoClient } from "mongodb";
import Barista from "../../components/Baristas/Barista";

const baristas = (props) => {
  return <Barista ordersData={props.ordersData} _id={props.id} totalAmount={props.totalAmount} />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"
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
