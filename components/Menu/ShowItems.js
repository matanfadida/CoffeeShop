import { useContext, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../state/auth-context";

import styles from "./ShowItems.module.css";
import ItemsFrom from "./ItemsFrom";

const ShowItems = (props) => {
  const newPriceInputRef = useRef();
  const router = useRouter();
  const ctx = useContext(AuthContext);
  const AdminLogin = router.pathname === "/adminlogin/Menu";

  const availability = props.availability === 'yes';
  const oldPrice = false;

  if (props.oldPrice !== ''){
    const oldPriceNumber = +props.oldPrice;
    const newPriceNumber = +props.price;
    oldPrice = oldPriceNumber > newPriceNumber;
  }

  const removeItems = () => {
    ctx.removeItem(props.id);
  };
  const chengedPriceHandler = () => {
    const enteredNewPrice = newPriceInputRef.current.value;
    ctx.chengedPrice(props.id, enteredNewPrice);
    router.push("/adminlogin/Menu");
  };

  const addToCartHandler = (amount) => {
    ctx.addItemToCartHandler({ id: props.id, price: props.price, amount: amount, name:props.name });
  };

  return (
    <div className={styles.div}>
      <ul>
        <img src={props.image} alt={props.name} />
        <br />
        <label>Description</label>
        <li>{props.description}</li>
        <label>Price</label>
        <li>{oldPrice ? <p>{'old Price: ' + props.oldPrice + ' ' + 'new Price: ' + props.price}</p> : props.price}</li>
        <label>Availability</label>
        <li>{props.availability}</li>
      </ul>
      {AdminLogin && (
        <div>
          <button onClick={chengedPriceHandler}>Edit Price</button>
          <input type="number" ref={newPriceInputRef} />
          <button onClick={removeItems}>Remove</button>
        </div>
      )}
      {availability && <ItemsFrom id={props.id} onAddToCart={addToCartHandler} />}
      {/* <button onClick={}>Add to Cart</button> */}
    </div>
  );
};

export default ShowItems;
