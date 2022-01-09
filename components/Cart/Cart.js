import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../state/auth-context";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import Table from "../Clients/Table";
import { getSession } from "next-auth/react";
import ChooesTable from "../Clients/choos-table";
import Link from "next/link";

const Cart = (props) => {
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [sendReq, setSendReq] = useState(false);
  const [sit, setSit] = useState("");
  const [vip, setVip] = useState("");
  const [enteredTable, setEnteredTable] = useState(0);
  const [enteredChair, setEnteredChair] = useState(0);
  const [error, setError] = useState(null);
  const table = props.tablesData;
  const current = new Date();
  console.log(props.countCoffee);

  let tenCoffee = false;
  let place = null;
  let emailUser = props.guest[0].toString();
  let outsideAvailability = false;
  if (current.getDay() !== 1) {
    outsideAvailability = true;
  }
  console.log(emailUser);

  getSession().then(async (session) => {
    if (session) {
      emailUser = session.user.email;
    }
  });

  let totalAmount = `$${ctx.totalAmount.toFixed(2)}`;


    if (
      +props.countCoffee <= 10 &&
      ctx.dynamicItems.map((item) => item.category).includes("coffee")
    ) {
      const coffee = ctx.dynamicItems.filter(
        (item) => item.category === "coffee"
      );
      totalAmount = +ctx.totalAmount - +coffee[0].price;
      totalAmount = `$${totalAmount.toFixed(2)}`;
      tenCoffee = true;
    } else {
      totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    }

  const cartIteamAddHandler = (item) => {
    ctx.addItemToCartHandler({...item,amount:1})
  };
  const cartIteamRemoveHandler = (id) => {
    ctx.removeItemFromCartHandler(id);
  };

  const BackBuyHandler = () => {
    router.push("/Menu");
  };

  const enteredTableHandler = (event) => {
    setEnteredTable(event.target.value);
  };
  const enteredChairHandler = (event) => {
    setEnteredChair(event.target.value);
  };
  const selectVipHandler = (event) => {
    setVip(event.target.value);
  };

  const selectSitHandler = (event) => {
    setSit(event.target.value);
  };

  let ShowTable;

  if (sit === "inside") {
    ShowTable = (
      <p>
        {table[0].inside.map((chair, index) => (
          <Table key={index} id={index} chair={chair} />
        ))}
      </p>
    );
  } else if (sit === "outside") {
    ShowTable = (
      <p>
        {table[0].outside.map((chair, index) => (
          <Table key={index} id={index} chair={chair} />
        ))}
      </p>
    );
  }

  const OrderHandler = async () => {
    if(enteredChair === 0 && enteredTable === 0){
      setError("input chair and table")
      return;
    }
    if (
      (sit === "inside" &&
        table[0].inside[enteredTable - 1][enteredChair - 1] === 0) ||
      (sit === "outside" &&
        table[0].outside[enteredTable - 1][enteredChair - 1] === 0)
    ) {
      setError("the chair occupied try other");
      return;
    }
    setSendReq(true);
    if (sit === "inside") {
      table[0].inside[enteredTable - 1][enteredChair - 1] = 0;
      place = {
        sit: "inside",
        table: enteredTable - 1,
        chair: enteredChair - 1,
      };
    } else {
      table[0].outside[enteredTable - 1][enteredChair - 1] = 0;
      place = {
        sit: "outside",
        table: enteredTable - 1,
        chair: enteredChair - 1,
      };
    }
    await fetch("/api/items/table-data", {
      method: "PUT",
      body: JSON.stringify({
        id: props.idTable,
        table: { inside: table[0].inside, outside: table[0].outside },
      }),
      headers: { "Content-Type": "application/json" },
    });
    await fetch("/api/items/order-data", {
      method: "POST",
      body: JSON.stringify({
        chair: {
          sit: sit,
          table: [enteredTable - 1],
          chair: [enteredChair - 1],
        },
        totalAmount: totalAmount,
        data: ctx.dynamicItems,
        user: emailUser,
        vip: vip,
      }),
      headers: { "Content-Type": "application/json" },
    });
    ctx.dynamicItems.map(
      async (item) =>
        await fetch("/api/items/data", {
          method: "PUT",
          body: JSON.stringify({
            id: item.id,
            count: 1,
          }),
          headers: { "Content-Type": "application/json" },
        })
    );

    if(tenCoffee){
      await fetch("/api/items/ordered-data", {
        method: "DELETE",
        body: JSON.stringify({
          email: emailUser,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }

    setSendReq(false);
    ctx.changeOrdersHandler();
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
        {!ctx.baristaChange && <button onClick={BackBuyHandler}>Back Menu</button>}
        {ctx.baristaChange && (
          <ChooesTable
            ordersData={ctx.dynamicItems}
            totalAmount={totalAmount}
            id={ctx.getOrderId}
            tablesData={props.tablesData}
            idTable={props.idTable}
            place={ctx.place}
          />
        )}
        {!ctx.baristaChange && (
          <Fragment>
            {ctx.ordered ? (
              <Link href={`yourOrdered/${emailUser.toString()}`}>
                change order
              </Link>
            ) : (
              <button onClick={OrderHandler}>Order</button>
            )}
            <br />
            {!ctx.ordered && (
              <Fragment>
                <label>Where Sit?</label>
                <select name="sit" id="sit" onChange={selectSitHandler}>
                  <option value="all">All</option>
                  <option value="inside">inside</option>
                  {outsideAvailability && (
                    <option value="outside">outside</option>
                  )}
                </select>
                {!outsideAvailability && (
                  <>
                    <br />
                    <label>Sitting outside not available</label>
                  </>
                )}
                <br />
                <label>open to sit</label>
                {ShowTable}

                <br />
                <span>choose a table</span>
                <input type="number" onChange={enteredTableHandler} />
                <br />
                <span>choose a Chair</span>
                <input type="number" onChange={enteredChairHandler} />
                <br />
                {error && <p>{error}</p>}
                {ctx.isLoggedIn && (
                  <>
                    <label>Vip?</label>
                    <select name="vip" id="vip" onChange={selectVipHandler}>
                      <option value="">Chooes</option>
                      <option value="no">No</option>
                      <option value="yes">yes</option>
                    </select>
                  </>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Card>
  );
};

export default Cart;
