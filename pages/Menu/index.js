import { MongoClient } from "mongodb";
import { useContext } from "react";
import MenuClient from "../../components/Clients/MenuClient";
import AuthContext from "../../components/state/auth-context";

const Menu = (props) => {
  const ctx = useContext(AuthContext);

  return <MenuClient items={props.itemsData} />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("items");

  const itemsData = await result.find().toArray();

  client.close();
  return { props: {itemsData: itemsData.map(item => ({
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      oldPrice: item.oldPrice,
      availability: item.availability,
      table: item.table,
      category: item.category,
      id: item._id.toString(),

  }))} };
}

export default Menu;
