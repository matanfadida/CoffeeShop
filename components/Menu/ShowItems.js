import { useContext, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../state/auth-context";

const ShowItems = (props) => {
    const newPriceInputRef = useRef();
    const router = useRouter();
    const ctx = useContext(AuthContext);
    
    const removeItems = () => {
        ctx.removeItem(props.id);
    }
    const chengedPriceHandler = () => {
        const enteredNewPrice = newPriceInputRef.current.value;
        ctx.chengedPrice(props.id, enteredNewPrice);
        router.push('/adminlogin/Menu');
    }
  return (
    <div>
      <ul>
        <li>{props.description}</li>
        <li>{props.image}</li>
        <li>{props.price}</li>
        <li>{props.availability}</li>
      </ul>
      <button onClick={chengedPriceHandler}>Edit Price</button>
      <input type="number" ref={newPriceInputRef} />
      <button onClick={removeItems}>Remove</button>
    </div>
  );
};

export default ShowItems;