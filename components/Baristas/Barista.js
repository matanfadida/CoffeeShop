import { Fragment } from "react";
import ShowOrder from "./show-order";

const Barista = (props) => {
  console.log(props._id);
  return (
    <div>
      {
        <ul>
          {props.ordersData.map((data,index) => (
            <Fragment>
              <ShowOrder key={props._id[index]} ordersData={data.data} />
              {props.totalAmount[index].totalAmount}
              {/* {props._id[index].totalAmount} */}
            </Fragment>
          ))}
        </ul>
      }
    </div>
  );
};

export default Barista;
