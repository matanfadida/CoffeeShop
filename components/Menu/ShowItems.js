import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../state/auth-context";

const ShowItems = (props) => {
    const router = useRouter();
    const ctx = useContext(AuthContext);
    
    const removeItems = () => {
        ctx.removeItem(props.id);
    }
    const chengedPriceHandler = () => {
        ctx.chengedPrice(props.id, 5);
        router.push('/Menu');
    }
  return (
    <div>
      <ul>
        <li>{props.name}</li>
        <li>{props.title}</li>
        <li>{props.price}</li>
        <li>{props.cup}</li>
      </ul>
      <button onClick={chengedPriceHandler}>Edit Price</button>
      {/* <input /> */}
      <button onClick={removeItems}>Remove</button>
    </div>
  );
};

export default ShowItems;
