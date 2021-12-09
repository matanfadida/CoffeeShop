import { useContext } from "react";
import AuthContext from "../state/auth-context";
import CartItem from "../Cart/CartItem";


const Barista = () => {
    const ctx = useContext(AuthContext);
    return <div>{<ul>
        {ctx.dynamicItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            // onRemove={cartIteamRemoveHandler.bind(null,item.id)}
            // onAdd={cartIteamAddHandler.bind(null, item)}
          />
        ))}
      </ul>}</div>
}

export default Barista;