import { useContext, useState } from "react";
import Link from 'next/link';
import ShowItems from "./ShowItems";
import AuthContext from "../state/auth-context";

const Menu = () => {
  const ctx = useContext(AuthContext);

  return (
    <ul>
      {ctx.items.map((item) => (
        <ShowItems
          key={item.id}
          id={item.id}
          name={item.name}
          title={item.title}
          price={item.price}
          cup={item.cup}
        />
      ))}
      <Link href="/additems">add</Link>
    </ul>
  );
};

export default Menu;
