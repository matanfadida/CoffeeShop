import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import { useContext } from "react";
import MenuClient from "../../components/Clients/MenuClient";
import AuthContext from "../../components/state/auth-context";

const Menu = (props) => {
  // let count = 0;
  // const ctx = useContext(AuthContext);
  // if (ctx.isLoggedIn) {
  //   getSession().then((session) => ctx.setUser(session.user.email));
  //   const allOrderedOfUser = props.countCoffee.filter(
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

  return <MenuClient items={props.itemsData} />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  //"mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"

  const db = client.db();

  const result = db.collection("items");

  const itemsData = await result.find().toArray();

  // const countCoffee = await db.collection("orders").find().toArray();

  client.close();
  return {
    revalidate: 1,
    props: {
      itemsData: itemsData.map((item) => ({
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        oldPrice: item.oldPrice,
        availability: item.availability,
        table: item.table,
        category: item.category,
        party: item.party,
        thursday: item.thursday,
        id: item._id.toString(),
        count:item.count,
      })),
    },
  };
}

export default Menu;
