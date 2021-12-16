import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import AuthContext from "../state/auth-context";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import Table from "../Clients/Table";

const Cart = (props) => {
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [sendReq, setSendReq] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [sit, setSit] = useState("");
  const [enteredTable, setEnteredTable] = useState(0);
  const [enteredChair, setEnteredChair] = useState(0);
  const table = props.tablesData;
  const current = new Date();
  let outsideAvailability = false;
  if(current.getDay() !== 1){
    outsideAvailability = true;
  }

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cartIteamAddHandler = (item) => {};
  const cartIteamRemoveHandler = (id) => {};

  const BackBuyHandler = () => {
    router.push("/Menu");
  };

  const enteredTableHandler = (event) => {
    setEnteredTable(event.target.value);
  };
  const enteredChairHandler = (event) => {
    setEnteredChair(event.target.value);
  };

  const selectSitHandler = (event) => {
    setSit(event.target.value);
  };

  let ShowTable;
  
  if(sit === "inside"){
    ShowTable = (
      <p>
        {table[0].inside.map((chair, index) => (
          <Table key={index} id={index} chair={chair} />
        ))}
      </p>
    )}
  else if(sit === "outside"){
    ShowTable = (
      <p>
        {table[0].outside.map((chair, index) => (
          <Table key={index} id={index} chair={chair} />
        ))}
      </p>
    )
  }

  const OrderHandler = async () => {
    if ((sit === "inside" && table[0].inside[enteredTable-1][enteredChair - 1] === 0) || (sit === "outside" && table[0].inside[enteredTable-1][enteredChair - 1] === 0)) {
      console.log("the chair occupied try other");
      return;
    }
    setSendReq(true);
      if(sit === "inside"){
        table[0].inside[enteredTable-1][enteredChair-1] = 0;
      }
      else{
        table[0].outside[enteredTable-1][enteredChair-1] = 0;
      }
      await fetch("/api/items/table-data", {
      method: "PUT",
      body: JSON.stringify({
        id:props.idTable,
        table:{inside: table[0].inside, outside: table[0].outside},
      }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await fetch("/api/items/order-data", {
      method: "POST",
      body: JSON.stringify({
        totalAmount: totalAmount,
        data: ctx.dynamicItems,
      }),
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
        <br />
        <label>Where Sit?</label>
        <select name="sit" id="sit" onChange={selectSitHandler}>
          <option value="all">All</option>
          <option value="inside">inside</option>
          {outsideAvailability && <option value="outside">outside</option>}
        </select>
          {!outsideAvailability && <><br/><label>Sitting outside not available</label></>}
        <br />
        <label>open to sit</label>
        {ShowTable}

        <br />
        <span>choose a table</span>
        <input type="number" onChange={enteredTableHandler} />
        <br />
        <span>choose a Chair</span>
        <input type="number" onChange={enteredChairHandler} />
      </div>
    </Card>
  );
};

export default Cart;