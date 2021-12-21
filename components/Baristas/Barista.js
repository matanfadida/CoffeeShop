import Card from "../UI/Card";
import ShowOrder from "./show-order";
import Link from 'next/link';

const Barista = (props) => {
  // console.log(props.ordersData[0].vip)

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
              {`VIP: ${props.ordersData[index].vip}`}
              <br/>
              <Link href={`/Baristas/${props._id[index].id}`}>Change the Order</Link>
            </Card>
          ))}
        </ul>
      }
    </div>
  );
};

export default Barista;
