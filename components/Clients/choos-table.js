import { Fragment, useContext, useState } from "react";
import AuthContext from "../state/auth-context";
import Table from "./Table";
// import Link from "next/link";
import { useRouter } from "next/router";

const ChooesTable = (props) => {
  const router = useRouter();
  const table = props.tablesData;
  const ctx = useContext(AuthContext);
  const [enteredTable, setEnteredTable] = useState(0);
  const [enteredChair, setEnteredChair] = useState(0);
  const [cardDetail, setCardDetail] = useState(false);
  const [error, setError] = useState(null);
  const [vip, setVip] = useState("");
  const [sit, setSit] = useState("");
  const current = new Date();
  let outsideAvailability = false;
  if (current.getDay() !== 1) {
    outsideAvailability = true;
  }

  const {
    sit: chooesSit,
    table: chooesTable,
    chair: chooseChair,
  } = props.place[0];

  const numTable = +chooesTable;
  const numChair = +chooseChair;

  const enteredTableHandler = (event) => {
    setEnteredTable(event.target.value);
  };
  const enteredChairHandler = (event) => {
    setEnteredChair(event.target.value);
  };
  const selectVipHandler = (event) => {
    setVip(event.target.value);
  };

  const cardDetailHandler = () => {
    setCardDetail((pre => !cardDetail));
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

  const confrimHandler = async () => {
    if (sit === "inside") {
      table[0].inside[numTable][numChair] = numChair + 1;
    } else {
      table[0].outside[numTable][numChair] = numChair + 1;
    }
    await fetch("/api/items/table-data", {
      method: "PUT",
      body: JSON.stringify({
        id: props.idTable,
        table: { inside: table[0].inside, outside: table[0].outside },
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await fetch("/api/items/ordered-data", {
      method: "POST",
      body: JSON.stringify({
        chair: {
          sit: chooesSit,
          table: chooesTable,
          chair: chooseChair,
        },
        totalAmount: props.totalAmount,
        data: props.ordersData,
        id: ctx.getOrderId,
        user: ctx.getUser,
        vip: vip,
      }),
      headers: { "Content-Type": "application/json" },
    });
    await fetch("/api/items/order-data", {
      method: "DELETE",
      body: JSON.stringify({
        id: ctx.getOrderId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    router.push('/Baristas');
  };

  const ChangeSitHandler = async () => {
    if (enteredChair === 0 && enteredTable === 0) {
      setError("input chair and table");
      return;
    }
    if (enteredChair !== 0 && enteredTable !== 0) {
      if (
        (sit === "inside" &&
          table[0].inside[enteredTable - 1][enteredChair - 1] === 0) ||
        (sit === "outside" &&
          table[0].outside[enteredTable - 1][enteredChair - 1] === 0)
      ) {
        setError("the chair occupied try other");
        return;
      }
      if (sit === "inside") {
        table[0].inside[enteredTable - 1][enteredChair - 1] = 0;
        table[0].inside[numTable][numChair] = numChair + 1;
      } else {
        table[0].outside[enteredTable - 1][enteredChair - 1] = 0;
        table[0].outside[numTable][numChair] = numChair + 1;
      }
      await fetch("/api/items/table-data", {
        method: "PUT",
        body: JSON.stringify({
          id: props.idTable,
          table: { inside: table[0].inside, outside: table[0].outside },
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
    const response = await fetch("/api/items/order-data", {
      method: "PUT",
      body: JSON.stringify({
        chair: {
          sit: chooesSit,
          table: chooesTable,
          chair: chooseChair,
        },
        totalAmount: props.totalAmount,
        data: props.ordersData,
        id: ctx.getOrderId,
        user: ctx.getUser,
        vip: vip,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Fragment>
      <p>place:{chooesSit}</p>
      <p>table:{numTable + 1}</p>
      <p>chair:{numChair + 1}</p>
      <br />
      {!ctx.ordered && (
        <Fragment>
          <label>Where Sit?</label>
          <select name="sit" id="sit" onChange={selectSitHandler}>
            <option value="all">All</option>
            <option value="inside">inside</option>
            {outsideAvailability && <option value="outside">outside</option>}
          </select>
          {!outsideAvailability && (
            <>
              <br />
              <label>Sitting outside not available</label>
            </>
          )}
          <br />
          <label>open to sit</label>
          <br />
          {ShowTable}
        </Fragment>
      )}
      <span>choose a table</span>
      <input type="number" onChange={enteredTableHandler} />
      <br />
      <span>choose a Chair</span>
      <input type="number" onChange={enteredChairHandler} />
      <br />
      {/* <Link href="/Menu"> */}
        <button onClick={() => {router.back()}}>Menu</button>
      {ctx.baristaLogin && <button onClick={cardDetailHandler}>Add Card Detail</button>}
      {(ctx.baristaLogin && cardDetail) && (
        <form>
          <div>
            <h4>Credit card detail</h4>
          </div>

          <div>
            {/* <!-- Card Number --> */}
            <input
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
            />

            {/* <!-- Date Field --> */}
            <div>
              <div>
                <select name="Month">
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
              <div>
                <select name="Year">
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            <div>
              <div>
                <input type="text" placeholder="CVV" />
              </div>
              <div>
                <p>
                  3 or 4 digits usually found <br /> on the signature strip
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
      {(ctx.baristaLogin && cardDetail) ? (
        <button onClick={confrimHandler}>confirm the order</button>
      ) : (
        <button onClick={ChangeSitHandler}>change</button>
      )}
      {ctx.baristaLogin && (
        <>
          <br />
          <label>Vip?</label>
          <select name="vip" id="vip" onChange={selectVipHandler}>
            <option value="">Chooes</option>
            <option value="no">No</option>
            <option value="yes">yes</option>
          </select>
        </>
      )}
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default ChooesTable;
