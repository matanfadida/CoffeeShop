import { MongoClient } from "mongodb";
import Cart from "../components/Cart/Cart";
import { getSession } from "next-auth/react";
import { useContext } from "react";
import AuthContext from "../components/state/auth-context";

const Pay = (props) => {
  let count = 0;
  console.log(props.usersData);
  // const ctx = useContext(AuthContext);
  // if (ctx.isLoggedIn) {
  //   getSession().then((session) => ctx.setUser(session.user.email));
  //   const allOrderedOfUser = props.orderedsData.filter(
  //     (data) => data.user === ctx.getUser && data.vip === "yes"
  //   );

  //   const onlyCoffee = allOrderedOfUser.map((data) => data.data);

  //   for (const i in onlyCoffee) {
  //     for (const j in onlyCoffee) {
  //       if (
  //         onlyCoffee[i][j] !== undefined &&
  //         onlyCoffee[i][j].category === "coffee"
  //       ) {
  //         count += +onlyCoffee[i][j].amount;
  //       }
  //     }
  //   }
  // }

  return (
    <Cart
      usersData={props.usersData}
      ordersData={props.ordersData}
      _id={props.id}
      totalAmount={props.totalAmount}
      tablesData={props.tablesData}
      idTable={props.idTable}
      guest={props.guest}
      countCoffee={count}
    />
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const resultOrders = db.collection("orders");

  const ordersData = await resultOrders.find().toArray();

  const resultUsers = db.collection("users");

  const usersData = await resultUsers.find().toArray();

  const resultTables = db.collection("tables");

  const tablesData = await resultTables.find().toArray();

  const resultGuests = db.collection("guests");

  const guestsData = await resultGuests.find().toArray();

  return {
    props: {
      guest: guestsData.map((guest) => guest.guests),
      idTable: tablesData[0]._id.toString(),
      tablesData: tablesData.map((table) => table.table),
      totalAmount: ordersData.map((data) => ({
        totalAmount: data.totalAmount,
      })),
      id: ordersData.map((data) => ({ id: data._id.toString() })),
      ordersData: ordersData.map((data) => ({
        data: data.data,
        user: data.user,
        vip: data.vip,
      })),
      usersData: usersData.map((data) => ({
        email: data.email,
        count: data.count,
      })),
    },
  };
}

export default Pay;
