import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import MenuClient from "../../components/Clients/MenuClient";
import AuthContext from "../../components/state/auth-context";

const OrderedId = (props) => {
  const router = useRouter();
  const ctx = useContext(AuthContext);
  useEffect(() => {
    if (ctx.dynamicItems.length === 0) {
      ctx.setOrderId(props.ordersData.map((data) => data.id));
      ctx.setUser(router.query.guestId);
      ctx.collectionChair(props.ordersData.map((data) => data.chair));
      ctx.changeBaristasHandler();
      ctx.cleanItemHandler();
      props.ordersData.map((order) => ({
        order: order.data.map((items) =>
          ctx.addItemToCartHandler({
            id: items.id,
            name: items.name,
            price: items.price,
            amount: items.amount,
            category: items.category,
          })
        ),
      }));
    }
  }, []);

  return <MenuClient items={props.itemsData} />;
};

export default OrderedId;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("guests");

  const guestsIdData = await result.find().toArray();

  return {
    fallback: false,
    paths: guestsIdData.map((order) => ({
      params: { guestId: order.guests.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.guestId;
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const resultOrder = db.collection("orders");

  const ordersData = await resultOrder.find().toArray();

  const order = ordersData.filter((data) => data.user.toString() === id);

  const resultItem = db.collection("items");

  const itemsData = await resultItem.find().toArray();

  return {
    props: {
      ordersData: order.map((data) => ({
        data: data.data,
        id: data._id.toString(),
        totalAmount: data.totalAmount,
        chair: data.chair,
        user: data.user,
      })),
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
        count: item.count,
      })),
    },
  };
}
