import { Fragment, useContext, useState } from "react";
import AuthContext from "../state/auth-context";
import Table from "./Table";

const ChooesTable = (props) => {
  const table = props.tablesData;
  const ctx = useContext(AuthContext);
  const [enteredTable, setEnteredTable] = useState(0);
  const [enteredChair, setEnteredChair] = useState(0);
  const [vip, setVip] = useState('');
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

  const ChangeSitHandler = async () => {
    if (enteredChair !== "" && enteredTable !== "") {
      if (enteredChair !== 0 && enteredTable !== 0) {
        if (
          (sit === "inside" &&
            table[0].inside[enteredTable - 1][enteredChair - 1] === 0) ||
          (sit === "outside" &&
            table[0].outside[enteredTable - 1][enteredChair - 1] === 0)
        ) {
          console.log("the chair occupied try other");
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
    }
    console.log(ctx.getOrderId);
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
        vip:vip,
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
          {ShowTable}
        </Fragment>
      )}
      <br />
      <br />
      <span>choose a table</span>
      <input type="number" onChange={enteredTableHandler} />
      <br />
      <span>choose a Chair</span>
      <input type="number" onChange={enteredChairHandler} />
      <button onClick={ChangeSitHandler}>confirm the order</button>
      <>
        <label>Vip?</label>
        <select name="vip" id="vip" onChange={selectVipHandler}>
          <option value="">Chooes</option>
          <option value="no">No</option>
          <option value="yes">yes</option>
        </select>
      </>
    </Fragment>
  );
};

export default ChooesTable;