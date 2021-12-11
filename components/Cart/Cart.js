import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../state/auth-context";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const Cart = () => {
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [sendReq, setSendReq] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [guest, setGuest] = useState(0);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cartIteamAddHandler = (item) => {};
  const cartIteamRemoveHandler = (id) => {};

  const BackBuyHandler = () => {
    router.push("/Menu");
  };

  // useEffect(()=>{
  //   const initialStroage = localStorage.getItem('guest');

    

  //   if(initialStroage){

  //   }
  // },[])

  const OrderHandler = async () => {
    setSendReq(true);
    const response = await fetch("/api/items/order-data", {
      method: "POST",
      body: JSON.stringify({ totalAmount: totalAmount,data: ctx.dynamicItems }),
      headers: { "Content-Type": "application/json" },
    });
    setSendReq(false);
    setOrdered(true);
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
          onRemove={cartIteamRemoveHandler.bind(null, item.id)}
          onAdd={cartIteamAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  if (sendReq) {
    return (
      <Card>
        {sendReq && (
          <Fragment>
            <FontAwesomeIcon icon={faSpinner} size="2x" spin={true} />
            <br />
            <br />
            <label>Sending Order To Baristas..</label>
          </Fragment>
        )}
      </Card>
    );
  }
  return (
    <Card>
      {cartItems}
      <div>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        <button onClick={BackBuyHandler}>Close</button>
        {ordered ? (
          <button onClick={OrderHandler}>chenge Order</button>
        ) : (
          <button onClick={OrderHandler}>Order</button>
        )}
        <span>choose a table and Chair</span>
        <input type="number" />
        <input type="number" />
      </div>
    </Card>
  );
};

export default Cart;
