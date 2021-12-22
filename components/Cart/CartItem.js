import classes from "./CartItem.module.css";
import { useRouter } from "next/router";

const CartItem = (props) => {
  const router = useRouter();
  const price = props.price;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      {router.pathname !== "/Baristas" &&<div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>}
    </li>
  );
};

export default CartItem;
