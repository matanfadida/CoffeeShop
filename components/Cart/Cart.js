import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../state/auth-context";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(AuthContext);
  const router = useRouter();

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cartIteamAddHandler = (item) => {};
  const cartIteamRemoveHandler = (id) => {};

  const BackBuyHandler = () => {
    router.push("/Menu");
  };

  const cartItems = (
    <ul>
      {ctx.dynamicItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartIteamRemoveHandler.bind(null,item.id)}
          onAdd={cartIteamAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Card>
      {cartItems}
      <div>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        <button onClick={BackBuyHandler}>Close</button>
        <button>Order</button>
      </div>
    </Card>
  );
};

export default Cart;
