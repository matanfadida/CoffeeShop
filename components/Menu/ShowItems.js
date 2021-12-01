import { useContext, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../state/auth-context";

import styles from "./ShowItems.module.css";

const ShowItems = (props) => {
    const newPriceInputRef = useRef();
    const router = useRouter();
    const ctx = useContext(AuthContext);
    const AdminLogin = router.pathname === '/adminlogin/Menu';
    
    const removeItems = () => {
        ctx.removeItem(props.id);
    }
    const chengedPriceHandler = () => {
        const enteredNewPrice = newPriceInputRef.current.value;
        ctx.chengedPrice(props.id, enteredNewPrice);
        router.push('/adminlogin/Menu');
    }
  return (
    <div className={styles.div}>
      <ul>
        <img src={props.image} alt="coffee" />
        <br/>
        <label>Description</label>
        <li>{props.description}</li>
        <label>Price</label>
        <li>{props.price}</li>
        <label>Availability</label>
        <li>{props.availability}</li>
      </ul>
      {AdminLogin && <div>
      <button onClick={chengedPriceHandler}>Edit Price</button>
      <input type="number" ref={newPriceInputRef} />
      <button onClick={removeItems}>Remove</button></div>}
    </div>
  );
};

export default ShowItems;