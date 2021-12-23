import { useContext, useRef } from "react";
import Link from "next/link";
import Card from "../UI/Card";
import AuthContext from "../state/auth-context";

const Admin = () => {
  const ctx = useContext(AuthContext);
  const enterNumSitRef = useRef();
  const enterTableInsideRef = useRef();
  const enterTableOutsideRef = useRef();
  const table = { inside: [], outside: [] };

  const changeSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredNumSit = +enterNumSitRef.current.value;
    const enteredTableInside = +enterTableInsideRef.current.value;
    const enteredTableOutside = +enterTableOutsideRef.current.value;

    for (const x of Array(enteredTableInside).keys()) {
      table.inside.push([]);
      for (const i of Array(enteredNumSit).keys()) {
        table.inside[x].push(i + 1);
      }
    }

    for (const x of Array(enteredTableOutside).keys()) {
      table.outside.push([]);
      for (const i of Array(enteredNumSit).keys()) {
        table.outside[x].push(i + 1);
      }
    }

    const result = await fetch("/api/items/table-data", {
      method: "PUT",
      body: JSON.stringify({
        id: "61bb1f78b76fab1874448000",
        table: { inside: table.inside, outside: table.outside },
      }),
      headers: { "Content-Type": "application/json" },
    });
    if(!result.ok){
      throw new Error("error");
    }else{
      console.log("ok");
    }
  };

  return (
    <Card>
      <form onSubmit={changeSubmitHandler}>
        <h1>Option Admin</h1>
        <h2>{`Welcome ${ctx.getAdminName}`}</h2>
        <label>sitting table inside</label>
        <br/>
        <input type="number" ref={enterTableInsideRef} />
        <br/>
        <label>sitting table outside</label>
        <br/>
        <input type="number" ref={enterTableOutsideRef} />
        <br/>
        <label>number of seats in each table</label>
        <input type="number" ref={enterNumSitRef} />
        <br/>
        <button>Change</button>
      </form>
      <Link href="/additems">to add items</Link>
    </Card>
  );
};

export default Admin;
