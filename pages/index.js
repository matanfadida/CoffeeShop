import { MongoClient } from "mongodb";
import Welcome from "../components/Welcome";

const WelcomePage = (props) => {
  return <Welcome guest={props.guest}/>
};

export default WelcomePage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();
  
  const resultGuests = db.collection("guests");

  const guestsData = await resultGuests.find().toArray();
  return {props: {
    guest:guestsData.map(guest => guest.guests),
  }}
}
