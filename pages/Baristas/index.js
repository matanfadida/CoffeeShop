import { MongoClient } from "mongodb";
import Barista from "../../components/Baristas/Barista";

const baristas = (props) => {
  return <Barista ordersData={props.ordersData} _id={props.id} />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("orders");

  const ordersData = await result.find().toArray();

    // console.log(ordersData.map((data) => console.log(data.data.map(a=>console.log(a)))))

  client.close();

  return {
    props: {
      id: ordersData.map((data) => ({id:data._id.toString()})),
      ordersData: ordersData.map((data) =>
        ({
          name: data.data[0].name,
          price: data.data[0].price,
          amount: data.data[0].amount,
          id: data.data[0].id,
          totalAmount: data.data[0].totalAmount,
        })
      ),
    },
  };
}

export default baristas;
