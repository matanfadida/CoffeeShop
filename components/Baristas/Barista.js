import ChooesTable from "../Clients/choos-table";
import Card from "../UI/Card";
import ShowOrder from "./show-order";
import Link from 'next/link';

const Barista = (props) => {
  // console.log(props._id[0].id);

  return (
    <div>
      {
        <ul>
          {props.ordersData.map((data, index) => (
            <Card key={props._id[index].id}>
              <ShowOrder key={props._id[index].id} ordersData={data.data} />
              <label>total Amount: </label>
              {props.totalAmount[index].totalAmount}
              <br />
              <Link href={`/Baristas/${props._id[index].id}`}>Change the Order</Link>
            </Card>
          ))}
        </ul>
      }
    </div>
  );
};

export default Barista;
