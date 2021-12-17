import MenuAdmin from "../../components/Admin/MenuAdmin";
import { MongoClient } from "mongodb";

const MenuPage = (props) => {
    return <MenuAdmin items={props.itemsData}/>
}


export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
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
  

export default MenuPage;