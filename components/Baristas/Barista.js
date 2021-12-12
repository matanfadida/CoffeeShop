import { Fragment } from "react";
import Card from "../UI/Card";
import ShowOrder from "./show-order";

const Barista = (props) => {
  console.log(props._id);
  return (
    <div>
      {
        <ul>
          {props.ordersData.map((data,index) => (
            <Card>
              <ShowOrder key={props._id[index]} ordersData={data.data} />
              <label>total Amount: </label>
              {props.totalAmount[index].totalAmount}
              <br/>
              <button>confirm the order</button>
            </Card>
          ))}
        </ul>
      }
    </div>
  );
};

export default Barista;
